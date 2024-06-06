<?php
// En-têtes pour autoriser les requêtes CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$directory = __DIR__ . '/csvFiles';

if (!file_exists($directory)) {
    mkdir($directory, 0777, true);
}

$fileName = 'PreInscription.csv';
$filePath = $directory . '/' . $fileName;

$csvFile = fopen($filePath, 'a');

if ($csvFile === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not open file for writing']);
    exit();
}

$headers = ['Nom', 'Prénom', 'Téléphone', 'Email', 'Formation', 'interessé par', "j'ai connu l'ipssi grâce", 'Date JPO'];
if (filesize($filePath) === 0) {
    fputcsv($csvFile, $headers);
}

$dataRow = [
    $data['nom'],
    $data['prenom'],
    $data['telephone'],
    $data['email'],
    $data['formation'],
    implode('|', $data['options1']),
    implode('|', $data['options2']),
    date('Y-m-d') // Ajout de la date de la JPO
];

fputcsv($csvFile, $dataRow);
fclose($csvFile);

http_response_code(200);
echo json_encode(['success' => 'Data saved successfully']);
?>
