<?php
if (isset($_GET['file'])) {
    $file = basename($_GET['file']);
    $filePath = __DIR__ . '/csvFiles/' . $file;

    if (file_exists($filePath)) {
        header('Content-Type: text/plain');
        echo file_get_contents($filePath);
    } else {
        http_response_code(404);
        echo 'File not found';
    }
} else {
    http_response_code(400);
    echo 'No file specified';
}
?>
