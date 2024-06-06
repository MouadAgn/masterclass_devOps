<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$directory = __DIR__ . '/csvFiles';
$files = array_diff(scandir($directory), array('..', '.'));

echo json_encode(array_values($files));
?>