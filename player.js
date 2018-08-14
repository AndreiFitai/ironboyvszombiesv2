//CONTROLS
var up = false;
var down = false;
var left = false;
var right = false;
var shoot = false;
var direction = "right"

//PLAYER CHARACTER OBJECT
var player = {
  height: 50,
  width: 20,
  posX: 200,
  posY: 150,
  gravity: 3,
  canJump: true,
  moveLeft: function () {
    direction = "left"
    if (wallCheckLeft())
      this.posX -= 5
  },

  moveRight: function () {
    direction = "right"
    if (this.posX < 450 && wallCheckRight())
      this.posX += 5
    else if (wallCheckRight()) {
      backgrounds.move(5);
      movePlatforms(5);
    }
  },
  moveUp: function () {
    if (this.canJump) {
      this.gravity = -11;
      this.canJump = false;
    }
  },
  moveDown: function () {
    if (this.posY + this.height < calcFloor())
      this.gravity = 8;
  },

  shoot: function () {
    if (this.direction == 'right')
      projectile.pew('right')
    else
      projectile.pew('left')
  },

  draw: function () {
    this.posY += this.gravity
    if (this.gravity < 5) {
      this.gravity += 0.4
    }
    if (this.posY + this.height > calcFloor()) {
      this.posY = calcFloor() - this.height;
      this.gravity = 0
      this.canJump = true
    }
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
  }
}

var currentPlat = 0;
// CALCULATE CURRENT PLATFORM TOP POSITION
function calcFloor() {
  var tempPos = 0;
  for (var x = 0; x < platformArr.length; x++) {
    if ((player.posX > platformArr[x].posX && player.posX < platformArr[x].posX + platformArr[x].width) ||
      (player.posX + player.width > platformArr[x].posX && player.posX + player.width < platformArr[x].posX + platformArr[x].width)) {
      if (platformArr[x].posY > tempPos)
        tempPos = platformArr[x].posY
      currentPlat = x;
    }
  }
  return tempPos
}

// Check if if player is hitting walls

function wallCheckLeft() {
  if (player.posY + player.height > platformArr[currentPlat - 1].posY && player.posX <= platformArr[currentPlat - 1].posX + platformArr[currentPlat - 1].width) {
    console.log('hit wall')
    player.posX = platformArr[currentPlat - 1].posX + platformArr[currentPlat - 1].width
    return false
  }
  return true;
}

function wallCheckRight() {
  console.log("right edge", player.posX + player.width)
  console.log("plat+1 edge", platformArr[currentPlat + 1].posX)
  if (player.posY + player.height > platformArr[currentPlat + 1].posY && player.posX + player.width >= platformArr[currentPlat + 1].posX) {
    console.log('hit wall right')
    player.posX = platformArr[currentPlat + 1].posX - player.width;
    return false;
  }
  return true;
}


var first = 0;

function playerMovement() {
  if (left == true) {
    player.moveLeft();
  }
  if (right == true) {
    player.moveRight();
  }
  if (up == true) {
    player.moveUp();
  }
  if (down == true) {
    player.moveDown();
  }
  if (shoot == true) {
    if (updateCounter % 15 == 0 || first == 0) {
      bulletsArr.push(new Projectile(direction));
      first++;
    }
  }
}

function playerCollision() {
  for (var x = 0; x < enemiesArr.length; x++) {
    if ((enemiesArr[x].posX >= player.posX && enemiesArr[x].posX <= player.posX + player.width) &&
      (enemiesArr[x].posY + enemiesArr[x].height >= player.posY && enemiesArr[x].posY <= player.posY + player.height)) {
      console.log('test')
      clearInterval(gameInterval)
      ctx.font = "30px Arial";
      ctx.fillText("Game Over !" + "\n" + "Final score:" + score, 300, 100);
    }
  }
  if (player.posY + player.height == 500) {
    console.log('test')
    clearInterval(gameInterval)
    ctx.font = "30px Arial";
    ctx.fillText("Game Over !" + "\n" + "Final score:" + score, 300, 100);
  }
}

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      left = true;
      break;
    case 38:
      up = true;
      break;
    case 39:
      right = true;
      break;
    case 40:
      down = true;
      break;
    case 32:
      shoot = true;
      break;
  }
};

document.onkeyup = function (e) {
  switch (e.keyCode) {
    case 37:
      left = false;
      break;
    case 38:
      up = false;
      break;
    case 39:
      right = false;
      break;
    case 40:
      down = false;
      break;
    case 32:
      first = 0;
      shoot = false;
      break;
  }
};