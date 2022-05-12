<?php
    //je me connect à la base de donnée:
    $pdo = new PDO('mysql:host=localhost; dbname=lino_maker','root','',
     array(PDO :: ATTR_ERRMODE => PDO :: ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

    //je verifie si la base est connectée
    //var_dump($pdo);

    //j'ouvre une session pour y stoker par la suite des informations
    session_start();

    //s'il y a une action dans l'url et si cette action est égale à deconnexion alors je detruit la session.
    if( isset($_GET['action']) && $_GET['action'] == 'deconnexion') {
        session_destroy();
        //Je le redirige vers l'acceuil
        header('location:login.php');
    }

    //je declare une variable qui me permettra d'afficher des messages pour l'utilisateur:
    $content = '';


?>