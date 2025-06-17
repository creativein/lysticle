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
