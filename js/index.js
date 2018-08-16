var isGameStarted = false;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d')

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var score = 0;
var lives = 200;
var explosions = [];
var gameInterval;
var deathScreenInterval;
var startScreenInterval;
var musicInt;
var updateCounter = 0
var music = new Audio();
music.src = "sounds/music.mp3";
music.loop = true;
music.volume = 0.0;

window.onload = function () {
  startScreenInterval = setInterval(startScreen, 1000 / 50)
}


function startScreen() {
  drawStartScreen();
  drawStartButtons();
}

function restartGame() {
  deathScreenInterval = setInterval(deathScreen, 1000 / 50)
}

function deathScreen() {
  drawDeathScreen();
  drawRestartButton();
}

function gameplay() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //globalAlpha for testing - please remove before final
  // ctx.globalAlpha = 0.2
  drawBackgrounds();
  createPlatform();
  drawPlatforms();
  createPlatform();
  updateExplosions();
  drawExplosions();
  moveBullets();
  player.draw();
  createEnemy();
  playerMovement();
  moveEnemies();
  playerCollision();
  checkIfHit();
  checkIfHitWall();
  clearEnemies();
  removePlatforms();
  clearArr();
  drawScore();
  updateCounter++;
}

function startGame() {
  if (isGameStarted == false) {
    music.play();
    isGameStarted = true
    musicInt = setInterval(setVolume("up"), 100);
    gameInterval = setInterval(gameplay, 1000 / 50)
  }
}


function setVolume(upOrDown) {
  if (upOrDown == "up") {
    if (music.volume < 0.25) {
      music.volume += 0.01;
    } else
      clearInterval(musicInt)
  }
  if (upOrDown == "down") {
    if (music.volume < 0) {
      music.volume -= 0.01;
    } else
      clearInterval(musicInt)
  }
}

function drawScore() {
  ctx.font = "30px Helvetica";
  ctx.fillText("Score:" + score, 10, 50);
  ctx.fillText("Lives:" + lives, 750, 50)
}

function updateExplosions() {
  for (var i = 0; i < explosions.length; i++) {
    explosions[i].ttl--;
  }
  explosions = explosions.filter(function (e) {
    return e.ttl > 0
  })
}

canvas.onclick = function (e) {
  var rect = canvas.getBoundingClientRect();
  x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  if (isGameStarted) {
    if (isItClickedRestart(x, y)) {
      restartClick();
    }
  } else if (isItClicked(x, y)) {
    startClick();
  }
}