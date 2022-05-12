<?php
    include('init.php');
    // Si la session membre exixte, alors je redirige vers l'acceuil:
    if(isset($_SESSION['membre'])){
        header('location:home.php');
    }

    // Si le formulaire est posté:
    if ($_POST){
        //je verifie si je recupère bien les infos
        // var_dump($_POST);
        //Je recupère les infos correspondants à l'email dans la table:
        $r = $pdo -> query ("SELECT * FROM membre WHERE email= '$_POST[email]' ");

        //Si le nombre de resultat est plus grand ou égal à 1, alors le compte existe:
        if ($r->rowCount()>= 1){
            //Je stock toutes les infos sous forme d'array
            $membre =$r -> fetch(PDO::FETCH_ASSOC);
            //je verifie si j'ai bien toutes les infos dans l'array:
                //print_r($membre);
            // Si le mot de passe posté correspond à celui présent dans $membre:
            if(password_verify($_POST['mdp'], $membre ['mdp'])) {
                // je test si le mdp fonctionne
                $content.='<p>email+MDP: OK </p>';

                //j'enregistre les infos dans la session
                $_SESSION['membre']['nom']=$membre ['nom'];
                $_SESSION['membre']['prenom']=$membre ['prenom'];
                $_SESSION['membre']['email']=$membre ['email'];

                //Je redirige l'utilisateur vers la page d'acceuil:
                header('location:home.php');
            }
            else{
                //le mot de passe est incorrect:
                $content .='<p>Mots de passe incorrect</p>';
            }
        }
        else {
            $content .= '<p> Compte inexistant</p>';
        }
    }
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="shortcut icon" href="img/LINO MAKER.png" type="image/x-icon">
    <link rel="stylesheet" href="login.css">
    <link href="https://fonts.googleapis.com/css?family=Share+Tech+Mono" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>

<body>
    <main>
        <div id="login-button">
            <img src="https://dqcgrsy5v35b9.cloudfront.net/cruiseplanner/assets/img/icons/login-w-icon.png">
        </img>
        </div>
        <div id="logo">
            <img src='img/LINO MAKER.png' border='0' alt='logo2' id="logo">
        </div>
        <div id="container">
        <h1>Log In</h1>
        <span class="close-btn">
            <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"></img>
        </span>

        <form method="post">
            <input type="email" name="email" placeholder="Votre email">
            <input type="password" name="mdp" placeholder="Votre password">
            <input class="inp" type="submit" value="LANCEZ VOUS">
            <input class="inp" type="reset"value="RESET">
            <div id="remember-container">
            <input type="checkbox" id="checkbox-2-1" class="checkbox" checked="checked"/>
            <span id="remember">Remember me</span>
            <span id="forgotten">Forgotten password</span>
            </div>
        </form>
        <a class="inp" href="inscription.php">Créer un compte</a>
        </div>

        <!-- Forgotten Password Container -->
        <div id="forgotten-container">
        <h1>Forgotten</h1>
        <span class="close-btn">
            <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"></img>
        </span>

        <form>
            <input type="email" name="email" placeholder="Votre email">
            <input type="reset" class="orange-btn" value="Get new password">
        </form>

    </main>
    <script src="login.js"></script>
</body>

</html>