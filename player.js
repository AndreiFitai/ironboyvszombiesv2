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
  posY: 300,
  gravity: 3,
  canJump: true,
  moveLeft: function(){
    direction = "left"
    this.posX -= 3
  },

  moveRight: function(){
    direction = "right"
    this.posX += 3
  },
  moveUp: function(){
    if(this.canJump){
      this.gravity = -8;
      this.canJump = false;
    }
  },
  moveDown: function(){
    if ( this.posY+this.height < background.posY )
    this.gravity = 5;
  },

  shoot: function(){
    if (this.direction == 'right')
      projectile.pew('right')
    else
      projectile.pew('left')
  },

  draw: function(){
    this.posY += this.gravity
    if ( this.gravity < 3){
      this.gravity += 0.3
    }
    if ( this.posY+this.height > background.posY){
      this.gravity = 0
      this.canJump = true
    }
    ctx.fillRect(this.posX,this.posY,this.width,this.height)
  }
}

var first = 0;

function playerMovement(){
  if ( left == true){
    player.moveLeft();
  }
  if (right == true){
    player.moveRight();
  }
  if (up == true){
    player.moveUp();
  }
  if (down == true){
    player.moveDown();
  }
  if (shoot == true){
    if ( updateCounter%10 == 0 || first == 0){
      bulletsArr.push(new Projectile(direction));
      first++;
    }
  }
}

document.onkeydown = function(e) {
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

document.onkeyup = function(e) {
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