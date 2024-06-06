let player1;
let playerBullets = [];
let ennemies = [];
let killCount = 0;

function setup() {
  createCanvas(400, 500);
  player1 = new Player(200,450, 40);
  
  for (let i = 0; i < 20; i++) {
    ennemies.push(new Ennemy(random(0, 400), random(-2000, 0), 20));
  }
}

function draw() {
  background(0);
  
  //PLAYER
  player1.display();
  
  //BULLETS
  for (let bullet of playerBullets){
    bullet.display();
    bullet.move();
  }
  
  //ENNEMIES
  for (let ennemy of ennemies){
    ennemy.display();
    ennemy.move();
  }  
  
  //COLLISION
  for (let bullet of playerBullets) {
    for (let ennemy of ennemies) {
      if (bullet.collides(ennemy)) {
        playerBullets.splice(playerBullets.indexOf(bullet), 1);
        ennemies.splice(ennemies.indexOf(ennemy), 1);
        killCount++;
        break;
      }
    }
  }
  //KILL COUNT
  fill(255);
  textSize(18);
  text("Kills : " + killCount + "/20", 10, 30);
  
  // Check if all enemies are dead or off-screen
  let allEnemiesDead = true;
  for (let ennemy of ennemies) {
    if (ennemy.posY < height) {
      allEnemiesDead = false;
      break;
    }
  }
  
  if (allEnemiesDead === true) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Finish !\nScore: " + killCount + "/20", 200, 250);
    noLoop();
  }
}

function mouseClicked(){
    playerBullets.push(new Bullet(mouseX, player1.posY, 10));
}


//CLASS PLAYER
class Player {
  constructor(posX, posY, radius, color){
    this.posY = posY;
    this.posX = posX; 
    this.radius = radius;
    this.color = "#fff";
  }
  display(){
    fill(this.color);
    ellipse(mouseX, this.posY, this.radius);
  }
}

//CLASS BULLET
class Bullet {
  constructor(posX, posY, radius, color){
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.color = "#fff"
  }
  display(){
    circle(this.posX, this.posY, this.radius)
  }
  move(){
    this.posY = this.posY -8;
  }
  collides(ennemy) {
    let d = dist(this.posX, this.posY, ennemy.posX + ennemy.radius / 2, ennemy.posY + ennemy.radius / 2);
    return d < this.radius / 2 + ennemy.radius / 2;
  }
}

//CLASS ENNEMY
class Ennemy{
  constructor(posX, posY, radius, color){
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.color="red";
  }
  display(){
    fill(this.color);
    rect(this.posX, this.posY, this.radius, this.radius);
  }
  move(){
    this.posY = this.posY +3;
  }
}