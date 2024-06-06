<?php
// Page pour lister les fichiers CSV et afficher leur contenu
$dir = 'backend/csvFiles/'; // Chemin vers le dossier contenant les fichiers CSV
$files = scandir($dir);

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    if (in_array($file, $files)) {
        $filepath = $dir . $file;
        $csv = array_map('str_getcsv', file($filepath));
        echo "<h2>Contenu de $file</h2>";
        echo "<table border='1'>";
        foreach ($csv as $row) {
            echo "<tr>";
            foreach ($row as $cell) {
                echo "<td>" . htmlspecialchars($cell) . "</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "Fichier non trouvé.";
    }
} else {
    echo "<h2>Liste des fichiers CSV</h2>";
    echo "<ul>";
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "<li><a href='?file=" . urlencode($file) . "'>$file</a></li>";
        }
    }
    echo "</ul>";
}
?>
