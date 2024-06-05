<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire d'inscription</title>
    <link rel="stylesheet" href="./styles/styles.css">
</head>
<body>
    <table>
<tr>
    
    <h1>Liste des Fichiers CSV</h1>
    <?php
    $dossier = scandir("./backend/csvFiles");
    foreach($dossier as $fichier){
    	echo "<a href='./backend/csvFiles/$fichier'csv' download >$fichier<br></a>";
    }
    ?>
</tr>

</table>
   
    
</body>
</html>



