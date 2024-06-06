<?php
$directory = __DIR__ . '/csvFiles';
$files = array_diff(scandir($directory), array('..', '.'));

header('Content-Type: application/json');
echo json_encode(array_values($files));
?>
