

<?php 
    include('init.php');
    // si le form a été posté (rendre fonctionnelle les champs crées)
    if ($_POST){
        // je verifie si je récupère bien les valeurs des champs
        //print_r($_POST);

        //je defini une variable pour afficher les erreurs
        $erreur='';

        //Si le prénom n'est pas trop court ou trop long
        if(strlen($_POST['prenom']) <3 || strlen($_POST['prenom']) > 20){
        $erreur .= '<p> Taille de prénom invalide.</p>';
       }
        //Si les caractères utilisées dans le champs prénoms sont valides  [regex]
        if(!preg_match('#^[a-zA-Z0-9._-]+$#', $_POST['prenom'])){
            $erreur .='<p> Format de prénom invalide</p>';
        }

        //je verifie si l'email n'est pas deja present dans la base
        $r =$pdo -> query ("SELECT * FROM membre WHERE email = '$_POST[email]' ");

         // s'il y a un ou plusieurs resultats
       if($r->rowCount() >= 1 ) {
            $erreur .= '<p>Email déjà utilisé.</p>';
        }
       

        // Je gère les problèmes d'apostrophes pour chaque champs grâce à une boucle
        foreach ($_POST as $indice => $valeur) {
            $_POST[$indice] = addslashes($valeur);
        }

        //je hash le mot de passe
        $_POST['mdp'] = password_hash($_POST['mdp'], PASSWORD_DEFAULT);

        // si $erreur est vide (fonction empty() verifie si une variable est vide):
            if(empty($erreur)){
                //j'envoie les infos dans la table en bdd
                $pdo->exec("INSERT INTO membre (nom, prenom, email, mdp) VALUES 
                ('$_POST[nom]','$_POST[prenom]', '$_POST[email]','$_POST[mdp]')");
                //j'ajoute un message de validation
                $content='<p>Inscription validée.</p>';
            }
         //j'ajoute le contenu de $erreur a l'interieur de $content:
         $content=$erreur;
    }
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <link rel="shortcut icon" href="img/LINO MAKER.png" type="image/x-icon">
    <link rel="stylesheet" href="inscription.css">
    <link href="https://fonts.googleapis.com/css?family=Share+Tech+Mono" rel="stylesheet">
</head>

<body>
    <main>
        <div id="box">
            <div id="logo">
                <img src='img/LINO MAKER.png' border='0' alt='logo2' id="logo">
            </div>
            <form id="login" class="input-group" method="post">
                <div style="position:absolute; top:-150px">
                    <label for="nom">Nom</label>
                    <input type="text" name="nom" id="nom" class="input-field" required>
                    <br><br>
                    <label for="">Prénom</label>
                    <input type="text" name="prenom" id="prenom" minlenght="3" maxlenght="20" class="input-field" required>
                    <br><br>
                    <label for="email">Adresse mail</label>
                    <input type="email" name="email" id="email" class="input-field" required>
                    <br><br>
                    <label for="mdp">Mot de passe</label>
                    <input type="password" name="mdp" id="mdp" class="input-field" required>
                    <br><br>
                    <input type="submit" class="btn" value="S'inscrire">
                 </div>
            </form>
             <a style=" color:rgb(247, 115, 33); position:absolute; top:430px; left:183px" href="login.php">Connexion</a>
             <!--J'affiche la variable contente pour faire afficher les messages d'erreur -->
                <?php
                    echo $content;
                ?>
        </div>
    </main>
</body>

</html>