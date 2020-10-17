var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score;
var ground;
var reset1, resetImage;




function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(500, 400);

  ground = createSprite(400, 400, 980, 40);
  ground.x = ground.width / 2;


  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("running", monkey_running);


  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = false;
  monkey.scale = 0.1;




  obstaclesGroup = new Group();
  FoodGroup = new Group();

  score = 0;

}


function draw() {

  background("white");

  monkey.collide(ground);


  if (ground.x < 0) {
    ground.x = ground.width / 2;

  }


  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
  }

  fill(0);
  textSize(18);
  text("Survival Time: " + score, 200, 50);


  if (gameState === PLAY) {



    ground.velocityX = -(4 + 3 * score / 100)
    score = score + Math.round(getFrameRate() / 60);


    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -12;

    }


    monkey.velocityY = monkey.velocityY + 0.8;


    spawnObstacles();
    spawnBanana();

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }

  } else if (gameState === END) {




    if (mousePressedOver(reset1)) {
      reset();
    }

    ground.velocityX = 0;
    monkey.velocityY = 0;


    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);


  }


  drawSprites();


}

function reset() {
  gameState = PLAY;
  score = 0;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);
}

function spawnObstacles() {

  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 365, 10, 40);
    obstacle.velocityX = -(6 + score / 100);
    obstacle.addImage(obstacleImage);

    var rand = Math.round(random(1, 6));

    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

  }
}

function spawnBanana() {

  if (frameCount % 60 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = Math.round(random(80, 300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    banana.lifetime = 200;

    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    FoodGroup.add(banana);
  }
}