var trex,tc;
var groundimage ;
var treximage ;
var invisibleGround;
var cloud,cloudimage,obstacle,obstacleimage1,obstacleimage2,obstacleimage3,obstacleimage4,obstacleimage5,obstacleimage6;
var obstacleGroup,cloudsGroup;
var PLAY=1;
var END=0
var GameState=PLAY; 
var restart,gameover,restartimage,gameoverimage;
function preload(){
treximage=loadAnimation ("trex1.png","trex3.png","trex4.png");
groundimage=loadImage("ground2.png");
cloudimage=loadImage("cloud.png");
obstacleimage1=loadImage("obstacle1.png");
obstacleimage2=loadImage("obstacle2.png");
obstacleimage3=loadImage("obstacle3.png");
obstacleimage4=loadImage("obstacle4.png");
obstacleimage5=loadImage("obstacle5.png");
obstacleimage6=loadImage("obstacle6.png");
restartimage=loadImage("restart.png");
gameoverimage=loadImage("gameOver.png");
tc=loadAnimation("trex_collided.png");
}





function setup() {
createCanvas(400, 400);
trex=createSprite(200,200,50,40)
trex.addAnimation("samaksh",treximage)
trex.addAnimation("collide",tc)
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
ground = createSprite(200,380,400,20);
ground.addImage("ground2",groundimage);
ground.x = ground.width /2;

//invisible Ground to support Trex
 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;
restart=createSprite(180,200,10,10);
restart.addImage(restartimage);
restart.visible=false
gameover=createSprite(150,140,20,20);
gameover.addImage(gameoverimage);
gameover.visible=false;
cloudsGroup=new Group();
obstacleGroup=new Group();
}

function draw() {
  background("black");
//move the ground
  if(GameState===PLAY) {
  ground.velocityX = -6;
  
  //scoring
 // var count = Math.round(World.frameCount/4);//
 // text("Score: "+ count, 250, 100);//
  
  //console.log(trex.y);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 359){
    trex.velocityY = -10 ;
  }
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  spawnClouds();
  spawnObstacles();
  if(obstacleGroup.isTouching(trex)){
  GameState=END;
  }
  }
 if (GameState===END){
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
   gameover.visible=true;
   restart.visible=true;
   trex.changeAnimation("collide",tc)
 }
  if(mousePressedOver(restart) && GameState===END){
    reset();
  }
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //spawn the clouds
    
  //spawn obstacles
 // spawnObstacles();
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacleimage1);
      break;
    case 2: obstacle.addImage(obstacleimage2);
      break;
    case 3: obstacle.addImage(obstacleimage3);
      break;
    case 4: obstacle.addImage(obstacleimage4);
      break;
    case 5: obstacle.addImage(obstacleimage5);
      break;
    case 6: obstacle.addImage(obstacleimage6);
      break;
      default:break;}
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    obstacleGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
   cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}
  function reset(){
GameState=PLAY;
score=0
obstacleGroup.destroyEach();
cloudsGroup.destroyEach();
gameover.visible=false;
restart.visible=false;
trex.changeAnimation("samaksh",treximage)
}



