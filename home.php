<?php 
    include('init.php');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>LINO MAKER</title>
    <link href="https://fonts.googleapis.com/css?family=Share+Tech+Mono" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="Style-Sheets/JS_game.css">
    <link rel="stylesheet" type="text/css" href="Style-Sheets/InstructionsModal.css">
    <link rel="stylesheet" type="text/css" href="Style-Sheets/GameOverModal.css">
    <link rel="stylesheet" type="text/css" href="Style-Sheets/GameCompleteModal.css">
    <link rel="stylesheet" href="home.css">
    <link href="https://fonts.googleapis.com/css?family=Share+Tech+Mono" rel="stylesheet">

    <!--Main game script-->
    <script type="text/javascript" src="Game.js"></script>
</head>
<body class="body">
    
    <?php
        if(isset($_SESSION['membre'])){
    ?>  
    <div style="display:flex; position:absolute; top: 0px; left:1007px;">
    <h1 class="user"><?php echo $_SESSION ['membre']['prenom']. ' '. $_SESSION ['membre']['nom'] ;?></h1>
        <a class="btn" href="?action=deconnexion">Déconnexion</a> 
        <!-- <a class="btn" href="statistiques.php">Mes statistique</a> -->
    </div> 
    
    <?php

        }
        else {
    ?>

    <?php
    }
   ?>

    <!--Appel de chargement de page showInstructions, méthode-->

<body onload="showInstructions()" onkeydown="KeyDown(event)" onkeyup="KeyUp(event)" ondragend="onMouseUp()">

<!-- Banner -->
<img id="banner" src="Pictures/banner.png">
<!--Audio elements-->
<audio id="bgm" style="display: none" controls>
    <source src="Audio/bgnd_mus.flac" type="audio/flac">
    Votre navigateur ne prend pas en charge l’élément audio.
</audio>

<audio id="jump" style="display: none" controls>
    <source src="Audio/jump_04.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>

<audio id="coinpickup" style="display: none" controls>
    <source src="Audio/coin_pickup.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>

<audio id="gameover" style="display: none" controls>
    <source src="Audio/gameover.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>

<audio id="gamewon" style="display: none" controls>
    <source src="Audio/win_sound.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>

<audio id="enemykilled" style="display: none" controls>
    <source src="Audio/enemy_killed.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>



<!--Restart button on game page-->
<canvas id="canvas" width=300 height=300></canvas>

<!--button id="restartButtonNearScore" class="button" onClick="restartGame()">
    <img class="buttonImages" src="Pictures/restart.png" alt="RestartButton" />
</button-->


<div id="instructionsModal" class="modal">

    <div class="modal-content">

        <h3>Instructions</h3>

        <p>Comment jouer:</p>
        <ul>
            <li>Terminez chaque niveau en évitant les personnages ennemis</li>
            <li>Tuez les ennemis en leur sautant dessus</li>
            <li>Tuer un ennemi vous accorde un score bonus</li>
        </ul>

        <p>Controls:</p>
        <ul>
            <li>Boutons à l’écran</li>
            <li>Flèches du clavier et WASD: Déplacez-vous vers la gauche et la droite, sautez et canardez</li>
            <li>Appuyez sur 'p' pour mettre le jeu en pause</li>
            <li>Appuyez sur 'm' pour basculer la musique</li>
            <li>Appuyez sur Espace pour redémarrer le jeu</li>
        </ul>

        <!--Play button-->
        <div class="startButton">
            <img class="buttonImages" src="Pictures/play.png" width="100%" onClick="initialize_game()" alt="PlayButton" />
        </div>

    </div>
</div>

<div id="gameOverModal" class="modal">
    <div class="modal-content">

        <img class="gameOverLabel" src="Pictures/game_over.png" alt="GAME OVER">
        <p class="gameOverDesc">Appuyez sur le bouton REDÉMARRER ou sur Espace pour redémarrer le jeu.</p>

        <div class="restartButton">
            <img class="buttonImages" src="Pictures/restart.png" width="100%" onClick="initialize_game()" alt="RestartButton" />
        </div>
    </div>
</div>

<div id="gameCompleteModal" class="modal">
    <div class="modal-content">
        <img class="gameOverLabel" src="Pictures/victory.png" alt="VICTORY">
        <p class="gameOverDesc">Vous avez terminé le jeu! Travail génial!</p>
        <div class="restartButton">
            <img src="Pictures/restart.png" width="100%" onClick="initialize_game()" alt="RestartButton" />
        </div>
    </div>
</div>

<div id="gamePauseModal" class="modal">
    <p class="gamePause">Vous avez mis le jeu en pause !</p>
    <p class="gamePlayPause">Appuyez sur p pour jouer</p>
    <div class="resumeButton">
        <img class="button" src="Pictures/resume.png" width="100%" onClick="pauseGame()" alt="ResumeGame" />
    </div>
</div>

<div id="optionsModal" class="modal">
    <div class="modal-content">
        <div class="gameOptions">
            <h2>OPTIONS</h2>
        </div>
        <div class="mess">
            <label id="mess"></label>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Up1">En haut</label>
            </div>
            <div class="col-75">
                <input type="text" id="UP" name="up1Key" value="Up" onclick="dispMess('UP','UP')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Down1">En bas</label>
            </div>
            <div class="col-75">
                <input type="text" id="DOWN" name="down1Key" value="Down" onclick="dispMess('DOWN','DOWN')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Left1">Gauche</label>
            </div>
            <div class="col-75">
                <input type="text" id="LEFT" name="left1Key" value="Left" onclick="dispMess('LEFT','LEFT')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Right1">Droite</label>
            </div>
            <div class="col-75">
                <input type="text" id="RIGHT" name="Right1Key" value="Right" onclick="dispMess('RIGHT','RIGHT')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Up2">Haut (Alt.)</label>
            </div>
            <div class="col-75">
                <input type="text" id="W" name="wKey" value="W" onclick="dispMess('W','UP')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Down2">Bas (Alt.)</label>
            </div>
            <div class="col-75">
                <input type="text" id="S" name="sKey" value="S" onclick="dispMess('S','DOWN')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Left2">Gauche (Alt.)</label>
            </div>
            <div class="col-75">
                <input type="text" id="A" name="left2Key" value="A" onclick="dispMess('A','LEFT')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Right2">Droite (Alt.)</label>
            </div>
            <div class="col-75">
                <input type="text" id="D" name="Right2Key" value="D" onclick="dispMess('D','RIGHT')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Restart">Redémarrer</label>
            </div>
            <div class="col-75">
                <input type="text" id="SPACE" name="SpaceKey" value="Space" onclick="dispMess('SPACE','SPACE')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Pause">Pause</label>
            </div>
            <div class="col-75">
                <input type="text" id="P" name="PauseKey" value="P" onclick="dispMess('P','PAUSE')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Sound">Son</label>
            </div>
            <div class="col-75">
                <input type="text" id="M" name="SoundKey" value="M" onclick="dispMess('M','SND')" readonly>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label><img class="Sound" src="Pictures/audioOn.png" alt="OptionGame" onclick="dispMess('M','SOUND')" id="MImg"></label>
            </div>
            <div class="col-75">
                <button class="button" id="buttonOptions" onClick="gameOptions()">
                        <img class="back" src="Pictures/Backbtn.png" alt="OptionGame">
                    </button>
            </div>
        </div>
    </div>
</div>

<div id="levelTransitionModal" class="modal">
    <div id="levelTransitionModalContent" class="modal-content">
        <img class="gameOverLabel" src="Pictures/victory.png" alt="VICTORY">
        <p class="levelTransitionMessage">Level complete!</p>
        <p class="levelTransitionMessage">Appuyez sur c pour continuer</p>
        <div class="resumeButton">
            <img class="button" src="Pictures/resume.png" width="100%" onClick="resumeGame()" alt="ResumeGame" />
        </div>
    </div>
</div>

<!--Game play buttons-->
<div id="buttonWrapper">
    <div id="buttonRestart">
        <button id="restartButtonLeft" class="button" onClick="restartGame()">
            <img class="buttonImages" src="Pictures/restart.png" alt="RestartButton" />
        </button>
    </div>
    <div id="buttonController">
        <button class="button" onmousedown="moveLeftMouse()" onmouseup="onMouseUp()" ontouchstart="moveLeftMouse()" ontouchend="onMouseUp()">
        <img class="buttonImages" src="Pictures/left.png" alt="LEFT">
    </button>
        <button class="button" onmousedown="moveUp()" ontouchstart="moveUp()">
        <img class="buttonImages" src="Pictures/jump.png" alt="JUMP">
    </button>
        <button class="button" onmousedown="duck()" onmouseup="duckMouseUp()" ontouchstart="duck()" ontouchend="duckMouseUp()">
        <img class="buttonImages" src="Pictures/duck.png" alt="DUCK">
    </button>
        <button class="button" onmousedown="moveRightMouse()" onmouseup="onMouseUp()" ontouchstart="moveRightMouse()" ontouchend="onMouseUp()">
        <img class="buttonImages" src="Pictures/right.png" alt="RIGHT">
    </button>
    </div>
    <div id="buttonPauseAudio">
        <button class="button" id="buttonAudio" onClick="muteMusic()">
        <img class="buttonImages" id="audioButton" src="Pictures/audioOn.png" alt="MuteMusic">
    </button>
        <button class="button" id="buttonPause" onClick="pauseGame()">
        <img class="buttonImages" src="Pictures/pause.png" alt="PauseGame">
    </button>
        <button class="button" id="buttonOptions" onClick="gameOptions()">
        <img class="buttonImages" src="Pictures/Settingsbtn.png" alt="OptionGame">
    </button>
    </div>
</div>
</body>
</html>