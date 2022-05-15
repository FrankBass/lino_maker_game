const userKeys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    SPACE: 32,
    P: 80,
    M: 77,
    C: 67
};

const specialKeys = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause/break',
    20: 'Caps lock',
    27: 'Escape',
    32: 'Space',
    33: 'Page up',
    34: 'Page down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    45: 'Insert',
    46: 'Delete',
    91: 'LeftwinKey',
    92: 'RightwinKey',
    106: 'Multiply',
    107: 'Add',
    111: 'Divide',
    187: 'Equal',
    188: 'Comma',
    189: 'Dash',
    190: 'Period',
    191: 'Slash',
    192: 'GraveAccent',
    219: 'OpenBracket',
    220: 'BackSlash',
    221: 'CloseBraket',
    222: 'SingleQuote'
};

//La variable y2 dicte à quelle hauteur l'unité démarre
const LEVEL_ENEMIES = [

    //enmemies level 1
    [{
        name: 'FloatingFish',
        width: 64,
        height: 56,
        y2: 405 //gerer la hauteur du personnage par rapoort au sol
    }, {
        name: 'zombie',
        width: 50,
        height: 45,
        y2: 400 //gerer la hauteur du personnage par rapoort au sol
    }],



    //enmemies level 2
    [{
        name: 'FloatingFish',
        width: 84,
        height: 76,
        y2: 400
    }, {
        name: 'BlackBlob',
        width: 60,
        height: 53,
        y2: 370
    }, {
        name: 'SpinningSword',
        width: 80,
        height: 14,
        y2: 170
    }],



    //enmemies level 3
    [{
        name: 'FloatingFish',
        width: 64,
        height: 56,
        y2: 400
    }, {
        name: 'SpinningSword',
        width: 80,
        height: 14,
        y2: 170
    }, {
        name: 'SlidingSkull',
        width: 60,
        height: 50,
        y2: 400
    }],


    //enmemies level 4
    [{
        name: 'FloatingFish',
        width: 284,
        height: 206,
        y2: 250
    }, {
        name: 'CyclopsCrab',
        width: 60,
        height: 37,
        y2: 400
    }],


    //enmemies level 5
    [{
        name: 'FloatingFish',
        width: 64,
        height: 56,
        y2: 200
    }, {
        name: 'CyclopsCrab',
        width: 60,
        height: 37,
        y2: 400
    }, {
        name: 'SpinningSword',
        width: 80,
        height: 14,
        y2: 170
    }, {
        name: 'ScarletStabber',
        width: 70,
        height: 60,
        y2: 400
    }]
];



const LEVEL_PLAYER_CHARACTERS = [{
    name: 'good_guy',
    x2: 200,
    y2: 220
}, {
    name: 'good_girl',
    x2: 100,
    y2: 120
}, {
    name: 'good_girl',
    x2: 100,
    y2: 120
}, {
    name: 'good_guy',
    x2: 100,
    y2: 120
}, {
    name: 'ninja',
    x2: 390, //Idéalement, cela ferait appel à la largeur du canevas pour placer le personnage au centre - cependant, canvas.width n'est créé que plus tard.
    y2: 120
}];

const LEVEL_CLOUDS = [{
    name: 'cloud',
    width: 60,
    height: 34
}, {
    name: 'cloud2',
    width: 65,
    height: 50
}, {
    name: 'cloud3',
    width: 60,
    height: 40
}, {
    name: 'cloud3',
    width: 60,
    height: 40
}, {
    name: 'cloud3',
    width: 60,
    height: 40
}];

//END CONFIG

const font = 'Share Tech Mono';
const totalLevels = 5; //Cette constante est très importante: elle indique au jeu le nombre de niveaux dont il dispose.
const coinWidth = 40;
const LEVEL_COMPLETION_TIME = 1500; //gerer le temps de jeu part niveaux
const MAX_VARIABLES = Math.floor(LEVEL_COMPLETION_TIME / 50); //Chacun de nos tableaux doit pouvoir contenir au maximum 2 objets/seconde.
const FLYING = 0; //Ce type de mouvement monte et descend au fur et à mesure qu'il se déplace, allant de droite à gauche.
const WALKING = 1; //Ce type de mouvement va en ligne droite de droite à gauche ou, dans certains cas, ne bouge pas.
const ROTATING = 2; //Ce type de mouvement tourne en deux dimensions, se déplaçant de droite à gauche.
const REVERSED = 3; //Ce type de mouvement se déplace de gauche à droite.

//flyUp indique si les ennemis VOLANTS volent vers le haut ou vers le bas - vers le haut si vrai, vers le bas si faux.
//flyCounter définit l'intervalle auquel flyUp change.
var flyUp = false;
var flyCounter = 0;

var audio; //Ici, nous ne faisons que prédéfinir nos variables audio
var coinpickup;
var gameover;
var gamewon;
var jump;
var enemykilled;

var currentLevel;
var collectedCoins = 0;
var currentCoins = 0;
var timeLeft; //Indique combien de temps il reste dans le niveau - sera calculé sur la base de LEVEL_COMPLETION_TIME plus ta
var score = 0;
var currentScore = 0;
var playerCharacter;
var background;
var background2;
var backgroundDx = 0;
var xPos = -5;
var coinRotationValue = 0;
var scoreBoard;
var coinScoreBoard;
var coinScoreBoardImg;
var coinScoreBoardSupImg;
var highscoreBoard;

var startArrow1;
var startArrow2;
var startArrow3;
var switchArrow = 0;

var timeBoard;
var timeBoardImg;
var levelDisplay;
var enemyCharacters = [];
var coins = [];
var clouds = [];
var keysPressed = {
    LEFT: false,
    UP: false,
    RIGHT: false,
    DOWN: false,
    P: false,
    M: false,
    W: false,
    S: false,
    A: false,
    D: false
};
var gamePaused = false;
var displayOptionsModal = false;
var optionId = '';
let musicMuted = false;
let musicToggled = false; //c'est juste pour couper la musique lorsque le jeu est en pause
let dir; //Dans quel sens le personnage fait face. 1 est à droite, -1 est à gauche
var highscore = 0;


function KeyDown(event) {
    var key;
    key = event.which;
    keysPressed[key] = true;

    //Eviter l'événement keydown répété automatiquement
    if (event.repeat)
        return;
    if (!displayOptionsModal) {
        if ((keysPressed[userKeys.DOWN] || keysPressed[userKeys.S]) && playerCharacter.duckCooldown === false) {
            duck();
        }
        if ((keysPressed[userKeys.LEFT] || keysPressed[userKeys.A]) && playerCharacter.leftCooldown === false) {
            moveLeft();
            playerCharacter.leftCooldown = true;
        }
        if ((keysPressed[userKeys.RIGHT] || keysPressed[userKeys.D]) && playerCharacter.rightCooldown === false) {
            moveRight();
            playerCharacter.rightCooldown = true;
        }
        if ((keysPressed[userKeys.UP] || keysPressed[userKeys.W]) && playerCharacter.hitGround && playerCharacter.duckCooldown === false) {
            if (playerCharacter.jumpCooldown === false) {
                moveUp();
            }
        }
        if (keysPressed[userKeys.SPACE]) {
            restartGame();
        }
        if (keysPressed[userKeys.P]) {
            keysPressed[userKeys.P] = false;
            pauseGame();
        }
        if (keysPressed[userKeys.M]) {
            keysPressed[userKeys.M] = false;
            muteMusic();
        }
        if (keysPressed[userKeys.C]) {
            keysPressed[userKeys.C] = false;
            resumeGame();
        }
    } else {
        changeOption(key);
    }
}

//Basculer la musique en appuyant sur la touche 'M'

function muteMusic() {
    musicMuted = !musicMuted;
    var imgButton = document.getElementById('audioButton');
    if (musicMuted) {
        imgButton.src = 'Pictures/audioOff.png';
        if (!gamePaused && !displayOptionsModal) { //Si le jeu est en cours d'exécution, éteignez simplement le son
            audio.pause();
        } else { // Sinon,  nous devons changer notre variable musicToggled,  afin que l 'audio reprenne correctement avec le jeu
            musicToggled = false;
        }
    } else {
        imgButton.src = 'Pictures/audioOn.png';
        if (!gamePaused && !displayOptionsModal) {
            audio.load();
        } else {
            musicToggled = true;
        }
    }
    updateSoundPng(); //Garantit que le bouton de sourdine de la page d'options reste à jour
}

function pauseGame() {
    gamePaused = !gamePaused;
}

function updateSoundPng() {
    if (musicMuted) {
        document.getElementById('MImg').src = 'Pictures/audioOff.png';
    } else {
        document.getElementById('MImg').src = 'Pictures/audioOn.png';
    }
}

function gameOptions() {
    displayOptionsModal = !displayOptionsModal;
}

function dispMess(id, type) {
    if (type === 'SOUND') {
        muteMusic();
    } else {
        document.getElementById('mess').innerHTML = 'Press the key you want to use for ' + '"' + type + '"';
        optionId = id;
    }
}

function changeOption(key) {
    var chr = String.fromCharCode(key);
    if (optionId !== '' && !Object.values(userKeys).includes(key)) {
        if (48 <= key && key <= 90) {
            document.getElementById(optionId).value = chr;
            userKeys[optionId] = key;
        } else if (key in specialKeys) {
            document.getElementById(optionId).value = specialKeys[key];
            userKeys[optionId] = key;
        }
    } else if (keysPressed[userKeys.M] && optionId !== 'M') {
        dispMess('M', 'SOUND');
    } else {
        document.getElementById('mess').innerHTML = 'You can\'t use this key';
    }
}


function updateBackgroundDx() {
    if (keysPressed[userKeys.LEFT] || keysPressed[userKeys.A]) {
        backgroundDx = -5;
    } else if (keysPressed[userKeys.RIGHT] || keysPressed[userKeys.D]) {
        backgroundDx = 5;
    } else {
        backgroundDx = 0;
    }
}

function KeyUp(event) {
    var key;
    key = event.which;
    keysPressed[key] = false;
    switch (key) {
        case userKeys.UP:
        case userKeys.W:
            playerCharacter.speedY += playerCharacter.gravity;
            playerCharacter.jumpCooldown = false;
            break;
        case userKeys.LEFT:
        case userKeys.A:
            if (keysPressed[userKeys.RIGHT] || keysPressed[userKeys.D]) {
                moveRight();
            } else {
                playerCharacter.speedX = 0;
            }
            playerCharacter.leftCooldown = false;
            break;
        case userKeys.RIGHT:
        case userKeys.D:
            if (keysPressed[userKeys.LEFT] || keysPressed[userKeys.A]) {
                moveLeft();
            } else {
                playerCharacter.speedX = 0;
            }
            playerCharacter.rightCooldown = false;
            break;
        case userKeys.DOWN:
        case userKeys.S:
            if (playerCharacter.hitGround && playerCharacter.duckCooldown === true) { //cette instruction if est utilisée pour que la taille du personnage du joueur n'augmente pas lorsque DOWN ou S est enfoncé alors que le personnage est dans les airs
                playerCharacter.height = playerCharacter.height * 2;
                playerCharacter.duckCooldown = false;
            }
    }
    updateBackgroundDx();
}


function showInstructions() {
    gameArea.init();
    //background
    background = new Component();
    background.init(gameArea.canvas.width, gameArea.canvas.height, 'Pictures/background_1.jpg', 0, 0, 'image', WALKING, true);
    var modal = document.getElementById('instructionsModal');
    modal.style.display = 'block';
}

function initialize_game() {
    currentLevel = 1;
    collectedCoins = 0;
    currentCoins = 0;
    score = 0;
    currentScore = 0;

    var coinMessage = document.getElementById('coinMessage');
    var pointsMessage = document.getElementById('pointsMessage');
    if (coinMessage) {
        var levelTransitionModalContent = document.getElementById('levelTransitionModalContent');
        levelTransitionModalContent.removeChild(coinMessage);
        levelTransitionModalContent.removeChild(pointsMessage);
    }

    audio = document.getElementById('bgm');
    audio.autoplay = true;
    audio.loop = true;

    if (!musicMuted) {
        audio.load();
    }

    startLevel();
}

function startLevel() {
    //Synchronise les coordonnées de départ des personnages ennemis
    flyUp = false;
    flyCounter = 0;
    dir = 1; //Commencez face à droite
    xPos = -5;

    //personnage du joueur
    playerCharacter = new Component();
    let char = LEVEL_PLAYER_CHARACTERS[currentLevel - 1];
    playerCharacter.init(60, 70, `Pictures/${char.name}.png`, char.x2, char.y2, 'image', WALKING, undefined, char.name);
    playerCharacter.jumpCooldown = false; //Ces temps de recharge permettent à notre système de savoir si une certaine clé a ré
    playerCharacter.leftCooldown = false; //enfoncé - "false"signifie que la touche n 'est pas en cours de recharge et doit être
    playerCharacter.rightCooldown = false; //reconnu normalement.
    playerCharacter.duckCooldown = false;

    //background / background
    background = new Component();
    background2 = new Component();
    background.init(gameArea.canvas.width, gameArea.canvas.height, `Pictures/background_${currentLevel}.jpg`, -50, 0, 'image', WALKING);
    background2.init(gameArea.canvas.width, gameArea.canvas.height, `Pictures/background_${currentLevel}_reverse.jpg`, 850, 0, 'image', WALKING);

    //score
    scoreBoard = new Component();
    scoreBoard.init('20px', font, 'black', 250, 40, 'text', WALKING);

    //Pièces collectées
    coinScoreBoard = new Component();
    coinScoreBoard.init('20px', font, 'black', 450, 40, 'text', WALKING);
    coinScoreBoardImg = new Component();
    coinScoreBoardImg.init(22, 22, 'Pictures/coin.png', 420, 21, 'image', WALKING);
    coinScoreBoardSupImg = new Component();
    coinScoreBoardSupImg.init(40, 40, 'Pictures/stars.png', 412, 10, 'image', WALKING);

    highscoreBoard = new Component();
    highscoreBoard.init('20px', 'Consolas', 'black', 20, 40, 'text', WALKING);
    highscoreBoard.text = 'HIGHSCORE:' + highscore;

    //lancer les fleche d'indication au debut de chauqe niveaux
    startArrow1 = new Component();
    startArrow2 = new Component();
    startArrow3 = new Component();
    startArrow1.init(90, 70, 'Pictures/blackArrow.png', 60, 125, 'image', 1);
    startArrow2.init(90, 70, 'Pictures/blackArrow.png', 30, 125, 'image', 1);
    startArrow3.init(90, 70, 'Pictures/blackArrow.png', 0, 125, 'image', 1);

    //temps actuel restant dans le niveau donné
    timeBoard = new Component();
    timeBoard.init('20px', font, 'black', 830, 40, 'text', WALKING);
    timeBoardImg = new Component();
    timeBoardImg.init(22, 22, 'Pictures/clock.png', 800, 21, 'image', WALKING);

    //affichage du niveau actuel
    levelDisplay = new Component();
    levelDisplay.init('20px', font, 'black', 670, 40, 'text', WALKING);

    // Boucle pour créer de nouveaux personnages ennemis en définissant une coordonnée x aléatoire pour chacun.Crée un maximum de 2 ennemis / seconde.
    for (let i = 0; i < MAX_VARIABLES; i++) {
        enemyCharacters[i] = new Component();
        var x = Math.floor((Math.random() * (i * (gameArea.canvas.width / 2))) + ((gameArea.canvas.width / 2) * i + (gameArea.canvas.width * 1.25)));

        //moveType décrit le type d 'ennemi : volant (0), marchant (1), tournant (2), entrant par la gauche (3)...
        // lorsque vous souhaitez ajouter un nouveau type d 'ennemi, incrémentez le nombre à l'intérieur du Math.random et
        //insérer dans la bonne case l 'ennemi
        var moveType = Math.floor(Math.random() * (LEVEL_ENEMIES[currentLevel - 1].length));
        let enemy = LEVEL_ENEMIES[currentLevel - 1][moveType];
        if (moveType === REVERSED) {
            // Ces ennemis entrent hors écran par la gauche et ont à peu près l 'inverse de la formule normale.
            x = Math.floor(Math.random() * (-i * (gameArea.canvas.width / 2)));
        }

        enemyCharacters[i].init(enemy.width, enemy.height, `Pictures/${enemy.name}.png`, x, enemy.y2, 'image', moveType);
    }

    //Boucle pour créer de nouveaux nuages ​​en définissant une coordonnée x aléatoire pour chacun. Crée un maximum de 2 nuages/seconde.
    for (let i = 0; i < MAX_VARIABLES; i++) {
        let x = Math.floor((Math.random() * (-600 + i * 450) + 1));
        clouds[i] = new Component();
        let cloud = LEVEL_CLOUDS[currentLevel - 1];
        clouds[i].init(cloud.width, cloud.height, `Pictures/${cloud.name}.png`, x, 40, 'image', WALKING);
    }

    //Génère des nouvelles pièces à des positions aléatoires.Crée un maximum de 2 / seconde.
    for (let i = 0; i < MAX_VARIABLES; i++) {
        let x = Math.floor(((Math.random() + 1) * gameArea.canvas.width) + (i * gameArea.canvas.width / 2));
        var y = Math.floor(Math.random() * 150 + 70); //150 est la hauteur de la toile - ligne de base (150) - hauteur du caractère - 30 (espace en haut)
        coins[i] = new Component();
        coins[i].init(coinWidth, coinWidth, 'Pictures/coin.png', x, y, 'image', WALKING);
    }

    //fonction de démarrage d'appel
    gameArea.init();
    gameArea.start();
}

/**
 * @type {{canvas: Element, start: gameArea.start, clear: gameArea.clear, stop: gameArea.stop}}
 */
var gameArea = {
    init: function() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = 1000; // GERER LA TAILLE DE L'IMAGE DE JEU
        this.canvas.height = 500; // GERER LA TAILLE DE L'IMAGE DE JEU
        this.context = this.canvas.getContext('2d');
        console.log(this.canvas.getContext('2d'));

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.body.insertBefore(document.getElementById('banner'), document.body.childNodes[0])
        this.time = 0;
        this.bonusActiveTime = 1500; //Le nombre réel n 'est pas important, nous voulons juste nous assurer
        this.coinScoreActiveTime = 1500; //que les fonctions flash ne s 'activeront pas immédiatement
        this.coinScoreInterval = null;
    },

    start: function() {
        this.frameNo = 0;
        this.time = 0;
        //  Masquer les modales
        var modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++) {
            var modal = modals[i];
            modal.style.display = 'none';
        }
        //intervalle de mise à jour
        this.interval = setInterval(updateGameArea, 20);
    },

    //fonction utilisée pour actualiser la page
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    //fonction utilisée pour arrêter le jeu
    stop: function() {
        clearInterval(this.interval);
    }
};

function Component() {
    this.init = function(width, height, color, x, y, dataType, moveType, initialShow = false, charName = undefined) {
        this.moveType = moveType; //Cela semble décrire principalement le type de mouvement d 'un ennemi
        this.alive = true;
        this.alive = true;
        this.color = color;
        //Affecte le type de données de la variable(généralement une image).
        this.dataType = dataType;

        this.ctx = gameArea.context;

        if (dataType === 'image') {
            this.image = new Image();
            this.image.src = this.color;
            this.image.width = width;
            this.image.height = height;

            if (charName) {
                this.imageMirror = new Image();
                this.imageMirror.src = `Pictures/${charName}_left.png`;
                this.imageMirror.width = width;
                this.imageMirror.height = height;
            }

            if (initialShow) { //C 'est pour les choses que nous voulons afficher avant le début du jeu - essentiellement l'arrière - plan
                var imgCopy = this.image;
                var ctxCopy = this.ctx;
                this.image.onload = function() {
                    ctxCopy.drawImage(imgCopy, this.x, this.y, this.width, this.height);
                };
            }
        }

        this.width = width;
        this.initHeight = height; // prendre de la hauteur plus tard
        this.alpha = 1; //Cette variable décrète à quel point un objet est "estompé" - 1 est entièrement affiché, 0 est parti.
        this.height = height;

        //changer la position des composants
        this.speedX = 0; //changerla vitesse de deplace du perso
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.orignX = x;
        this.gravity = 0.7; //changer la  hauteur des bons que fait le perso
        //indique si le personnage est au sol ou non
        this.hitGround = true;
        this.doubleJumpAllowed = true;
        //angle
        this.angle = 0;
    };

    //fonction pour décider de ce qu'il faut afficher à l'écran, du texte, de l'image ou de la couleur de remplissage
    this.update = function() {
        if (this.dataType === 'image') {
            this.ctx.globalAlpha = this.alpha;
            if (this.angle !== 0) {
                this.ctx.save();
                this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                this.ctx.rotate(this.angle);
                this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
                this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                this.ctx.restore();
            } else {
                this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        } else if (this.dataType === 'text') {
            this.ctx.font = this.width + ' ' + this.height;
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.text, this.x, this.y);
        } else {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    //Cette fonction gère les fonds de défilement
    this.moveBackgrounds = function(background2) {
        if (0 <= xPos) {
            xPos += backgroundDx;
            this.x -= backgroundDx;
            background2.x -= backgroundDx;
        } else {
            backgroundDx = 0;
        }
        if (this.x <= -900) { this.x = 900; } else if (background2.x <= -900) { background2.x = 900; } else if (900 <= this.x) { this.x = -900; } else if (900 <= background2.x) { background2.x = -900; } else if (900 < Math.abs(this.x) + Math.abs(background2.x)) {
            if (Math.abs(background2.x) < Math.abs(this.x)) {
                this.x += (0 < this.x) ? -5 : 5;
            } else {
                background2.x += (0 < background2.x) ? -5 : 5;
            }
        }
    };

    //fonction de collision de personnage ennemi
    this.crashWith = function(otherobj) {
        var left = this.x;
        var right = this.x + (this.width);
        var top = this.y;
        var bottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((bottom < othertop + 10) ||
            (top > otherbottom - 20) ||
            (right < otherleft + 15) ||
            (left > otherright - 15)) {
            crash = false;
        }
        return crash;
    };

    //Cette fonction nous indique si le personnage du joueur(ou tout autre objet) a sauté sur un autre objet
    this.jumpsOn = function(otherobj) {
        var bottomY = this.y + (this.height);
        var farX = this.x + this.width;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var smoosh = false;
        if ((bottomY > othertop - 5) &&
            (bottomY < (othertop + 20)) &&
            (farX > otherleft) &&
            (this.x < otherright)) {
            smoosh = true;
            // Lorsque le joueur écrase un ennemi, nous l 'envoyons
            moveUp('hit');
        }
        return smoosh;
    };

    //propriété de gravité
    this.newPos = function() {
        this.y += this.speedY; //iincrémenter la position y avec sa vitesse
        this.speedY += this.gravity; // incrémenter la vitesse y avec la gravité
        this.x += this.speedX;
        this.hitBottom();
    };




    // poser le sol sur toile
    this.hitBottom = function() {
        var rockbottom = gameArea.canvas.height - this.height - 50; // gère la hauteur du personnage par rapport au background
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.hitGround = true;
            this.doubleJumpAllowed = true;
        }
    };

    this.setAlive = function(alive) {
        this.alive = alive;
    };
    this.isAlive = function() {
        return this.alive;
    };

    this.setX = function(x) {
        this.x = x;
    };

    this.getX = function() {
        return this.x;
    };

    this.getOrignX = function() {
        return this.orignX;
    };

    this.getImgSrc = function() {
        return this.image.src;
    };

    this.setSrc = function(src) {
        this.image.src = src;
    };

    //Il s 'agit d'une fonction de rotation pour les pièces uniquement, leur permettant de tourner en 3 dimensions
    this.rotation = function() {
        if (coinRotationValue === 0) {
            this.setSrc('Pictures/coin.png');
        } else if (coinRotationValue === 10) {
            this.setSrc('Pictures/coin2.png');
        } else if (coinRotationValue === 20) {
            this.setSrc('Pictures/coin3.png');
        } else if (coinRotationValue === 30) {
            this.setSrc('Pictures/coin4.png');
        }
    };

    //vérifier s'il y a eu un changement de direction dans laquelle le personnage fait face
    // newDir prend soit - 1(déplacement vers la gauche) ou 1(déplacement vers la droite)
    this.changeDir = function(newDir) {
        if (dir !== newDir) {
            [playerCharacter.image, playerCharacter.imageMirror] = [playerCharacter.imageMirror, playerCharacter.image];
            dir = newDir;
        }
    };

    this.coinDisappear = function() {
        this.y += -2;
        this.alpha -= 0.03;
        if (this.alpha < 0) {
            this.alpha = 0;
        }
    };
}



function gameOver() {
    interval && clearInterval(interval);

    //ajouter un score à la liste des meilleurs scores
    if (highscore < score) {
        highscore = score;
    }
    var modal = document.getElementById('gameOverModal');
    modal.style.display = 'block';

    audio = document.getElementById('bgm');
    audio.pause();

    if (!musicMuted) {
        gameover = document.getElementById('gameover');
        gameover.autoplay = true;
        gameover.load();
    }
}

function restartGame() {
    gameArea.stop();
    initialize_game();
}

function gameComplete() {
    var modal = document.getElementById('gameCompleteModal');
    modal.style.display = 'block';
    gameArea.stop();
    if (highscore < score) {
        highscore = score;
    }

    if (!musicMuted) {
        audio = document.getElementById('bgm');
        audio.pause();
        gamewon = document.getElementById('gamewon');
        gamewon.autoplay = true;
        gamewon.load();
    }
}



//Ajuster le caractère à une position valide s'il sort de la bordure

function correctCharacterPos() {
    if (playerCharacter.y < 0) {
        playerCharacter.speedY = 0;
        playerCharacter.y = 0;
    }
    if (playerCharacter.x < 0) {
        playerCharacter.speedX = 0;
        playerCharacter.x = 0;
    }
    if (playerCharacter.x > gameArea.canvas.width - playerCharacter.width) {
        playerCharacter.speedX = 0;
        playerCharacter.x = gameArea.canvas.width - playerCharacter.width;
    }
    if (playerCharacter.y > gameArea.canvas.height - playerCharacter.height) {
        playerCharacter.speedY = 0;
        playerCharacter.y = gameArea.canvas.height - playerCharacter.height;
    }
}

function flashScore() {
    if (scoreBoard.color === 'black') {
        scoreBoard.color = 'white';
    } else {
        scoreBoard.color = 'black';
    }

    if (gameArea.bonusActiveTime > 1200) {
        scoreBoard.color = 'black';
        clearInterval(gameArea.bonusInterval);
    }
    gameArea.bonusActiveTime += 150;
}

function flashCoinScore() {
    coinScoreBoardSupImg.update();
    if (coinScoreBoard.color === 'black') {
        coinScoreBoard.color = 'white';
        coinScoreBoardSupImg.alpha = 1;
    } else {
        coinScoreBoard.color = 'black';
        coinScoreBoardSupImg.alpha = 0;
    }

    if (gameArea.coinScoreActiveTime > 1200) {
        coinScoreBoard.color = 'black';
        coinScoreBoardSupImg.alpha = 0;
        clearInterval(gameArea.coinScoreInterval);
    }
    gameArea.coinScoreActiveTime += 150;
}



/*animation fleche d'indication de depart */
function flashStartArrow() {
    switchArrow++;
    if (switchArrow < 60) {
        startArrow3.setSrc('Pictures/goldArrow.png');
        startArrow2.setSrc('Pictures/goldArrow.png');
        startArrow1.setSrc('Pictures/blackArrow.png');
    } else if (switchArrow < 60) {
        startArrow3.setSrc('Pictures/blackArrow.png');
        startArrow2.setSrc('Pictures/goldArrow.png');
    } else if (switchArrow < 90) {
        startArrow2.setSrc('Pictures/blackArrow.png');
        startArrow1.setSrc('Pictures/goldArrow.png');
    } else {
        switchArrow = 3;
    }
    startArrow1.setX(startArrow1.getOrignX() - xPos);
    startArrow2.setX(startArrow2.getOrignX() - xPos);
    startArrow3.setX(startArrow3.getOrignX() - xPos);
}




//Mettre à jour la zone de jeu pour une période définie dans la fonction de zone de jeu, le 20e de milliseconde actuel(50 fois par seconde)

function updateGameArea() {
    let pausemodal = document.getElementById('gamePauseModal');
    let optionsModal = document.getElementById('optionsModal');
    if (gamePaused) {
        pausemodal.style.display = 'block';
        if (!musicMuted) { //Ensuite, coupez le son de la musique et gardez la musique activée pour que nous sachions qu'elle n'est pas vraiment coupée
            audio.pause();
            musicToggled = true;
        }
        return;
    } else if (displayOptionsModal) {
        optionsModal.style.display = 'block';
        if (!musicMuted) {
            audio.pause();
            musicToggled = true;
        }
        return;
    } else {
        pausemodal.style.display = 'none';
        optionsModal.style.display = 'none';
        if (musicToggled) { //Ensuite, réactivez la musique et annulez musicToggled afin que cela ne se déclenche pas à nouveau
            audio.load();
            musicToggled = false;
        }
    }
    //lorsque le numéro de trame atteint 3000 (point auquel les obstacles se terminent) niveau de fin
    //vérifier le niveau actuel, s'il y en a plus de 5 (parce qu'il y a actuellement cinq niveaux), afficher le jeu complet modal
    if (gameArea.time >= LEVEL_COMPLETION_TIME) {
        gameArea.stop();
        if (currentLevel === totalLevels) gameComplete();
        else {
            currentLevel++;
            var levelTransitionModal = document.getElementById('levelTransitionModal');
            levelTransitionModal.style.display = 'block';
            var levelTransitionModalContent = document.getElementById('levelTransitionModalContent');
            levelTransitionModalContent.innerHTML += `<p id="coinMessage" class="levelTransitionMessage">Coins earned: ${currentCoins}</p>`;
            levelTransitionModalContent.innerHTML += `<p id="pointsMessage" class="levelTransitionMessage">Points earned: ${currentScore}</p>`;
        }
    }

    for (let i = 0; i < enemyCharacters.length; i++) {
        if (enemyCharacters[i].isAlive()) {
            if (playerCharacter.jumpsOn(enemyCharacters[i])) {
                enemyCharacters[i].setAlive(false);
                incrementScore(100 * currentLevel);
                gameArea.bonusActiveTime = 0;
                gameArea.bonusInterval = setInterval(flashScore, 150);
                if (!musicMuted) {
                    enemykilled = document.getElementById('enemykilled');
                    enemykilled.autoplay = true;
                    enemykilled.load();
                }
            } else if (playerCharacter.crashWith(enemyCharacters[i])) {
                backgroundDx = 0;
                gameArea.stop();
                gameOver();
            }
        }
    }

    coinRotationValue++; //Nous mettons à jour la valeur de rotation des pièces avant de mettre à jour les pièces
    if (coinRotationValue >= 40) {
        coinRotationValue = 0;
    }




    //boucle pour la collision des pièces
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].isAlive()) {
            if (playerCharacter.crashWith(coins[i])) {
                coins[i].setSrc('Pictures/stars.png');
                //increase collected coins counter
                collectedCoins++;
                currentCoins++;
                incrementScore(50 * currentLevel);
                coins[i].setAlive(false);
                //animate coin score board
                gameArea.coinScoreActiveTime = 0;
                gameArea.coinScoreInterval = setInterval(flashCoinScore, 150);
                if (!musicMuted) {
                    coinpickup = document.getElementById('coinpickup');
                    coinpickup.autoplay = true;
                    coinpickup.load();
                }
            } else {
                coins[i].rotation();
            }
        }
    }

    //Toile claire avant chaque mise à jour
    gameArea.clear();

    //mise a jour background
    background.moveBackgrounds(background2);
    background.update();
    background2.update();

    //Mise à jour cloud : ne s'affiche pas au niveau 5, qui est à l'intérieur
    if (currentLevel !== 5) {
        for (let i = 0; i < clouds.length; i++) {
            clouds[i].x += 0.5 - backgroundDx;
            clouds[i].update();
        }
    }

    //mise à jour du code
    scoreBoard.text = 'SCORE: ' + score;
    scoreBoard.update();

    //collected coins update
    coinScoreBoard.text = collectedCoins;
    coinScoreBoard.update();
    coinScoreBoardImg.update();
    highscoreBoard.update();

    //debut des fleches
    flashStartArrow();
    startArrow1.update();
    startArrow2.update();
    startArrow3.update();


    // mise a jou du timer
    timeBoard.text = Math.ceil(timeLeft);
    timeBoard.update();
    timeBoardImg.update();

    //incrémenter le numéro d'image pour la minuterie
    incrementFrameNumber(2);
    incrementTime(2);

    //Mise à jour de l'affichage de niveau
    levelDisplay.text = 'Level ' + currentLevel;
    levelDisplay.update();

    //enemy update
    for (let i = 0; i < enemyCharacters.length; i++) {
        enemyCharacters[i].update();
    }

    //coins update
    for (let i = 0; i < coins.length; i++) {
        coins[i].update();
    }

    //mise a jour des jouer a chaque niveux
    playerCharacter.newPos();
    correctCharacterPos();
    playerCharacter.update();

    //Toutes les 35 itérations, flyUp retourne, de sorte que les ennemis VOLANTS commencent à se déplacer dans la direction opposée.
    if (flyCounter === 35) {
        flyUp = !flyUp;
        flyCounter = 0;
    }

    //flyCounter augmente à chaque itération
    flyCounter++;

    //boucle pour régler la vitesse des personnages ennemis
    for (let i = 0; i < enemyCharacters.length; i++) {
        if (enemyCharacters[i].isAlive()) {
            //vérifier si le niveau est de 3 ou plus
            //faire varier la vitesse des personnages ennemis si le niveau est supérieur ou égal à 3
            if (currentLevel >= 3 && enemyCharacters[i].moveType !== FLYING) {
                if (currentLevel === 5 && enemyCharacters[i].moveType === REVERSED) {
                    enemyCharacters[i].x -= (-4 + backgroundDx); //Ces ennemis entrent par la gauche
                } else {
                    enemyCharacters[i].x += (-4 - backgroundDx);
                }
            } else {
                enemyCharacters[i].x += (-2 - backgroundDx);


            }


            //Cela indique aux oiseaux ennemis s'ils doivent monter ou descendre
            if (enemyCharacters[i].moveType === FLYING) {
                if (flyUp === true) {
                    enemyCharacters[i].y += 3;
                } else {
                    enemyCharacters[i].y += -3;
                }
            }
            // Cela fait pivoter les ennemis de type 2 - actuellement uniquement les ennemis de l'épée au niveau 5
            if (enemyCharacters[i].moveType === ROTATING) {
                enemyCharacters[i].angle += 10 * Math.PI / 180;
            }
        } else { // si mort ; l'ennemi sera "pressé", tombera au sol et disparaitra.
            enemyCharacters[i].height = enemyCharacters[i].initHeight / 3;
            enemyCharacters[i].x -= backgroundDx;
            enemyCharacters[i].y += 10;
            enemyCharacters[i].alpha += -0.01;
            if (enemyCharacters[i].alpha < 0) {
                enemyCharacters[i].alpha = 0;
            }
            enemyCharacters[i].hitBottom();
        }
    }

    // boucle pour définir la vitesse des caractères de pièce
    //si la pièce n'est pas vivante et prise par le joueur, faire disparaître la pièce
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].isAlive()) {
            coins[i].x += -2 - backgroundDx;
        } else {
            coins[i].coinDisappear();
        }
    }
}


function incrementFrameNumber(value) {
    gameArea.frameNo += value;
}

function incrementScore(value) {
    score += value;
    currentScore += value;
}

function incrementTime(value) { //Les deux incrémentent le temps et mettent à jour la valeur de la minuterie à l'écran
    gameArea.time += value;
    timeLeft = (LEVEL_COMPLETION_TIME - gameArea.time) / 100;
}


// Empêche le personnage du joueur de se déplacer constamment après avoir appuyé sur le bouton
function stopMove() {
    playerCharacter.speedX = 0;
    playerCharacter.speedY = 0;
    if (playerCharacter.y < 0) {
        playerCharacter.speedY = 0;
        playerCharacter.y = 0;
    }
    if (playerCharacter.x < 0) {
        playerCharacter.speedX = 0;
        playerCharacter.x = 0;
    }
    if (playerCharacter.x > gameArea.canvas.width - playerCharacter.width) {
        playerCharacter.speedX = 0;
        playerCharacter.x = gameArea.canvas.width - playerCharacter.width;
    }
}

function moveUp(state) {
    if (state === 'hit') {
        if (playerCharacter.speedY >= -3) {
            playerCharacter.speedY = -7;
        } else { // Si le personnage du joueur progresse déjà, nous le faisons simplement se déplacer légèrement plus rapidement
            playerCharacter.speedY -= 4;
        }
        playerCharacter.hitGround = false;
    } else if (playerCharacter.hitGround && playerCharacter.y >= 170) {
        playerCharacter.speedY = -20;
        playerCharacter.hitGround = false;
        playerCharacter.jumpCooldown = true;
        if (!musicMuted) {
            jump = document.getElementById('jump');
            jump.autoplay = true;
            jump.load();
        }
    } else if (playerCharacter.doubleJumpAllowed === true) {

        /* Ne fait actuellement rien, depuis le UP/W initial
         * La logique des touches ne permet pas d'appeler la fonction moveUP. */
        playerCharacter.speedY = -7;
        playerCharacter.doubleJumpAllowed = false;
    }
}

function moveLeft() {
    playerCharacter.changeDir(-1);
    //playerCharacter.speedX = -5;
    backgroundDx = -5;
}

function moveRight() {
    playerCharacter.changeDir(1);
    //playerCharacter.speedX = 5;
    if (xPos <= -5) {
        xPos = 0;
        background.setX(-50);
        background2.setX(850);
    }
    backgroundDx = 5;
}

function duck() {
    if (playerCharacter.hitGround) {
        playerCharacter.height = playerCharacter.height / 2;
        playerCharacter.duckCooldown = true;
    }
}

var interval;

function moveLeftMouse() {
    interval = setInterval(moveLeft, 1);
    backgroundDx = -5;
}

function moveRightMouse() {
    interval = setInterval(moveRight, 1);
    if (xPos <= -5) {
        xPos = 0;
        background.setX(-50);
        background2.setX(850);
    }
    backgroundDx = 5;
}

function onMouseUp() {
    clearInterval(interval);
    stopMove();
    backgroundDx = 0;
}

function duckMouseUp() {
    if (playerCharacter.hitGround && playerCharacter.duckCooldown === true) { //cette instruction if est utilisée pour que la taille du personnage du joueur n'augmente pas lorsque DOWN ou S est pressé alors que le personnage est en l'air
        playerCharacter.height = playerCharacter.height * 2;
        playerCharacter.duckCooldown = false;
    }
}

function resumeGame() {
    var levelTransitionModal = document.getElementById('levelTransitionModal');
    var levelTransitionModalContent = document.getElementById('levelTransitionModalContent');
    if (levelTransitionModal.style.display === 'block') {
        var coinMessage = document.getElementById('coinMessage');
        var pointsMessage = document.getElementById('pointsMessage');
        levelTransitionModalContent.removeChild(coinMessage);
        levelTransitionModalContent.removeChild(pointsMessage);
        levelTransitionModal.style.display = 'none';
        currentCoins = 0;
        currentScore = 0;
        startLevel();
    }
}

let ajax = document.querySelector('.ajax');
ajax.addEventListener('click', () => {
    let highscore = highscoreBoard.text;
    var linoMaker = {
        highscore: highscoreBoard.text,
    }

    // console.log('Billy');
    var http = new XMLHttpRequest();
    http.open("POST", "traitement.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let result = this.responseText;
            console.table(result);
        };
    };
    http.send(JSON.stringify(linoMaker));

});