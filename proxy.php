<?php

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'N5TMs5iR}>45');
define('DB_NAME', 'lysticle_leads');

// Initialize database connection
function connectDB() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit;
    }
}

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
        case 'get_onboardings':
        try {
            $conn = connectDB();

            // Get pagination parameters from payload, with defaults
            $page = isset($payload['page']) ? max(1, intval($payload['page'])) : 1;
            $limit = isset($payload['limit']) ? max(1, intval($payload['limit'])) : 10;
            $offset = ($page - 1) * $limit;

            // Get total count
            $countResult = $conn->query("SELECT COUNT(*) as total FROM onboardings");
            $total = $countResult ? intval($countResult->fetch_assoc()['total']) : 0;

            // Build the WHERE clause for UTM filters
            $whereClause = "";
            $filterParams = [];
            $filterTypes = "";
            
            if (!empty($payload['filters'])) {
                $conditions = [];
                if (!empty($payload['filters']['utm_source'])) {
                    $conditions[] = "utm_source LIKE ?";
                    $filterParams[] = "%" . $payload['filters']['utm_source'] . "%";
                    $filterTypes .= "s";
                }
                if (!empty($payload['filters']['utm_medium'])) {
                    $conditions[] = "utm_medium LIKE ?";
                    $filterParams[] = "%" . $payload['filters']['utm_medium'] . "%";
                    $filterTypes .= "s";
                }
                if (!empty($payload['filters']['utm_campaign'])) {
                    $conditions[] = "utm_campaign LIKE ?";
                    $filterParams[] = "%" . $payload['filters']['utm_campaign'] . "%";
                    $filterTypes .= "s";
                }
                
                if (!empty($conditions)) {
                    $whereClause = " WHERE " . implode(" AND ", $conditions);
                }
            }
            
            // Fetch paginated results with filters
            $query = "SELECT * FROM onboardings" . $whereClause . " ORDER BY id DESC LIMIT ? OFFSET ?";
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            // Bind all parameters
            if (!empty($filterParams)) {
                $allParams = array_merge($filterParams, [$limit, $offset]);
                $stmt->bind_param($filterTypes . "ii", ...$allParams);
            } else {
                $stmt->bind_param("ii", $limit, $offset);
            }
            if (!$stmt->execute()) {
                throw new Exception("Execute failed: " . $stmt->error);
            }
            $result = $stmt->get_result();
            $onboardings = [];
            while ($row = $result->fetch_assoc()) {
                $onboardings[] = $row;
            }

            $response = [
                'success' => true,
                'data' => $onboardings,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => $limit > 0 ? ceil($total / $limit) : 0
                ]
            ];
            echo json_encode($response);

            $stmt->close();
            $conn->close();
            exit;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            exit;
        }
        break;

    case 'onboarding':
        try {
            $conn = connectDB();
            
            // Prepare the SQL statement
            $sql = "INSERT INTO onboardings (
                company_name, industry, company_size, company_website,
                first_name, last_name, email, phone, job_title,
                domain, utm_source, utm_medium, utm_campaign, utm_term, utm_content
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            // Extract and prepare all parameters
            $companyName = $payload['companyName'];
            $industry = $payload['industry'];
            $companySize = $payload['companySize'];
            $companyWebsite = $payload['companyWebsite'];
            $firstName = $payload['firstName'];
            $lastName = $payload['lastName'];
            $email = $payload['email'];
            $phoneNumber = $payload['phoneNumber'];
            $jobTitle = $payload['jobTitle'];
            $customDomain = $payload['customDomain'];
            
            // UTM parameters with default empty string if not set
            $utmSource = isset($payload['utm_source']) ? $payload['utm_source'] : '';
            $utmMedium = isset($payload['utm_medium']) ? $payload['utm_medium'] : '';
            $utmCampaign = isset($payload['utm_campaign']) ? $payload['utm_campaign'] : '';
            $utmTerm = isset($payload['utm_term']) ? $payload['utm_term'] : '';
            $utmContent = isset($payload['utm_content']) ? $payload['utm_content'] : '';

            // Bind parameters
            // 'sssssssssssssss' represents the types of the 15 parameters (all strings)
            $stmt->bind_param(
                'sssssssssssssss',
                $companyName,
                $industry,
                $companySize,
                $companyWebsite,
                $firstName,
                $lastName,
                $email,
                $phoneNumber,
                $jobTitle,
                $customDomain,
                $utmSource,
                $utmMedium,
                $utmCampaign,
                $utmTerm,
                $utmContent
            );
            
            // Execute the statement
            if (!$stmt->execute()) {
                throw new Exception("Execute failed: " . $stmt->error);
            }
            
            $insertId = $stmt->insert_id;
            $response = [
                'success' => true, 
                'message' => 'Data saved successfully',
                'id' => $insertId
            ];

            echo json_encode($response);
            $stmt->close();
            $conn->close();
            exit;
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            exit;
        }
        break;

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
    
    case 'contact':
        try {
            $conn = connectDB();
            
            // Prepare the SQL statement for contact form submissions
            $sql = "INSERT INTO contact_forms (
                name, email, phone, message,
                utm_source, utm_medium, utm_campaign, utm_term, utm_content,
                source, submitted_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            // Extract data from payload
            $name = $payload['name'];
            $email = $payload['email'];
            $phone = $payload['phone'];
            $message = $payload['message'];
            $utmSource = $payload['utm_source'] ?? '';
            $utmMedium = $payload['utm_medium'] ?? '';
            $utmCampaign = $payload['utm_campaign'] ?? '';
            $utmTerm = $payload['utm_term'] ?? '';
            $utmContent = $payload['utm_content'] ?? '';
            $source = $payload['source'] ?? '';
            $submittedAt = $payload['submitted_at'];
            
            // Bind parameters
            $stmt->bind_param(
                'sssssssssss',
                $name,
                $email,
                $phone,
                $message,
                $utmSource,
                $utmMedium,
                $utmCampaign,
                $utmTerm,
                $utmContent,
                $source,
                $submittedAt
            );
            
            // Execute the statement
            if (!$stmt->execute()) {
                throw new Exception("Execute failed: " . $stmt->error);
            }
            
            $insertId = $stmt->insert_id;
            $response = [
                'success' => true,
                'message' => 'Contact form submitted successfully',
                'id' => $insertId
            ];
            
            echo json_encode($response);
            $stmt->close();
            $conn->close();
            exit;
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            exit;
        }
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

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unknown service']);
        exit;
}

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
?>
