<?php 
    include('init.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Satistique</title>
    <link rel="stylesheet" href="statistiques.css">
</head>
<body>
    <main style="text-align:center;">
        <?php
        
        // On affiche tous les commentaires
        $r=$pdo->query('SELECT * FROM membre');
        //Je fais une boucle pour passer chaque ligne de la table sous forme d'array et les afficher
        while ($user = $r->fetch(PDO::FETCH_ASSOC)) {
        echo " NOM ET PRENOM :" ." ".$user['nom'] .' '. $user['prenom'].'<br>';
        echo " NIVEAU (LEVEL) :" .'<br>';
        echo " HIGHSCORE :";
    }?>
    </main>

</body>
</html>