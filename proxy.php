<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(200);
    exit;
}

$requestBody = file_get_contents('php://input');
$requestData = json_decode($requestBody, true);

if (!isset($requestData['service']) || !isset($requestData['payload'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$service = $requestData['service'];
$payload = $requestData['payload'];

switch ($service) {
    case 'siterelic':
        $url = 'https://api.siterelic.com/dnsrecord';
        $headers = [
            'x-api-key: bf17809d-96ff-450f-b8dd-5473dbe8b77f',
            'Content-Type: application/json',
        ];
        $payload = json_encode($payload);
        break;

    case 'ansible':
        $url = 'http://66.94.124.95:8080/job/Run-Ansible-Playbook/buildWithParameters';
        $headers = [
            'Authorization: Basic ' . base64_encode('markytekadmin:110f3a5400acf2abe4e9f6c533aa682ec6'),
            'Content-Type: application/x-www-form-urlencoded',
        ];
        $payload = http_build_query($payload);
        break;
    
    case 'googledns':
        if (!isset($payload['name']) || !isset($payload['type'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid payload for Google DNS API']);
            exit;
        }

        $url = 'https://dns.google/resolve?name=' . urlencode($payload['name']) . '&type=' . urlencode($payload['type']);
        $headers = []; // No special headers required for Google DNS API
        $payload = null; // No POST payload required for Google DNS API
        break;
        
    case 'utm':
        // Handle UTM tracking data
        try {
            if (!isset($payload['userData']) || !isset($payload['utmData'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Missing required UTM data']);
                exit;
            }
            
            // Database configuration - update these with your actual credentials
            $dbConfig = [
                'host' => getenv('DB_HOST') ?: 'localhost',
                'username' => getenv('DB_USERNAME') ?: 'root',
                'password' => getenv('DB_PASSWORD') ?: '',
                'database' => getenv('DB_DATABASE') ?: 'lysticle',
            ];
            
            // Connect to MySQL database
            $pdo = new PDO(
                "mysql:host={$dbConfig['host']};dbname={$dbConfig['database']};charset=utf8mb4",
                $dbConfig['username'],
                $dbConfig['password'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
            
            // Extract user data
            $userData = $payload['userData'];
            $firstName = $userData['firstName'] ?? '';
            $lastName = $userData['lastName'] ?? '';
            $email = $userData['email'] ?? '';
            $phoneNumber = $userData['phoneNumber'] ?? '';
            $companyName = $userData['companyName'] ?? '';
            $industry = $userData['industry'] ?? '';
            $domain = $userData['domain'] ?? '';
            
            // Extract UTM data
            $utmData = $payload['utmData'];
            $utmSource = $utmData['utm_source'] ?? '';
            $utmMedium = $utmData['utm_medium'] ?? '';
            $utmCampaign = $utmData['utm_campaign'] ?? '';
            $utmContent = $utmData['utm_content'] ?? '';
            $utmTerm = $utmData['utm_term'] ?? '';
            $firstVisit = $utmData['first_visit'] ?? date('Y-m-d H:i:s');
            $referrer = $utmData['referrer'] ?? '';
            
            // Extract conversion data
            $conversionType = $payload['conversionType'] ?? 'unknown';
            $timestamp = $payload['timestamp'] ?? date('Y-m-d H:i:s');
            
            // Prepare SQL statement for insertion
            $sql = "INSERT INTO conversions (
                        first_name, last_name, email, phone_number, company_name, industry, domain,
                        utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                        first_visit, referrer, conversion_type, timestamp
                    ) VALUES (
                        :firstName, :lastName, :email, :phoneNumber, :companyName, :industry, :domain,
                        :utmSource, :utmMedium, :utmCampaign, :utmContent, :utmTerm,
                        :firstVisit, :referrer, :conversionType, :timestamp
                    )";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':firstName' => $firstName,
                ':lastName' => $lastName,
                ':email' => $email,
                ':phoneNumber' => $phoneNumber,
                ':companyName' => $companyName,
                ':industry' => $industry,
                ':domain' => $domain,
                ':utmSource' => $utmSource,
                ':utmMedium' => $utmMedium,
                ':utmCampaign' => $utmCampaign,
                ':utmContent' => $utmContent,
                ':utmTerm' => $utmTerm,
                ':firstVisit' => $firstVisit,
                ':referrer' => $referrer,
                ':conversionType' => $conversionType,
                ':timestamp' => $timestamp,
            ]);
            
            // Return success response directly, no need for cURL
            echo json_encode([
                'success' => true,
                'message' => 'UTM data saved successfully',
                'id' => $pdo->lastInsertId(),
            ]);
            exit;
        } catch (PDOException $e) {
            // Log error but don't expose details
            error_log('Database error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Database error occurred. Please try again later.'
            ]);
            exit;
        } catch (Exception $e) {
            error_log('General error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'An error occurred while processing UTM data.'
            ]);
            exit;
        }
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unknown service']);
        exit;
}

// Only execute cURL for non-UTM services (which were handled directly)
if ($service !== 'utm') {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        http_response_code(500);
        echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
    } else {
        http_response_code($httpCode);
        echo $response;
    }

    curl_close($ch);
}
?>
