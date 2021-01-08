var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var particle = null;
var plinkos = [];
var divisions = [];
var divisionsPositions = [];

var divisionHeight=200;
var score =0;
var turn = 0;

var gameState = "start";

function setup() {
  createCanvas(480, 600);
  engine = Engine.create();
  world = engine.world;
  ground = new GROUND(width/2,height,width,80);
  border1 = new Border(5, 300, 15, 600);
  border2 = new Border(240, 5, 480, 15);
  border3 = new Border(475, 300, 15, 600);
  border4 = new Border(240, 595, 480, 15);

    for (var j = 65; j <=width - 50; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 40; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,125));
    }

    for (var j = 65; j <=width - 50; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

    for (var j = 40; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,225));
    }

    for (var k = 17.5; k <= width; k = k + 74.25) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight, ));
      divisionsPositions.push(k);
    }
     
    for (var j = 65; j <=width - 50; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }
 
    for (var j = 40; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,325));
     }
}

function mouseClicked() {
  if (gameState === "start") {
    turn++;
    particle = new Particle(mouseX, 7,7);
    gameState = "launched";
  }
}

function draw() {
  background("black");
  textSize(30)
  fill("white");
  text("Score: " + score,15,40);

  textSize(30)
  fill("white");
  text("Turns: " + turn,355,40);

  for (var i = 28; i < 150; i = i + 75) {
    textSize(30)
    fill("white");
    text("500", i, 425)
  }

  for (var i = 178; i < 300; i = i + 75) {
    textSize(30)
    fill("white");
    text("200", i, 425)
  }

  for (var i = 327.5; i < 450; i = i + 75) {
    textSize(30)
    fill("white");
    text("100", i, 425)
  }

  console.log(divisionsPositions[1])

  if (particle !== null) {
    particle.display();
    if (particle.body.position.y > 530) {
      gameState = "start";
      console.log(particle.body.position.x)
      if (turn >= 5){
        gameState = "end";
      }
      if (particle.body.position.x > divisionsPositions[0] && particle.body.position.x < divisionsPositions[2]) {
        score = score + 500;
        particle = null;
      } else if (particle.body.position.x > divisionsPositions[2] && particle.body.position.x < divisionsPositions[4]) {
        score = score + 200;
        particle = null;
      } else if (particle.body.position.x > divisionsPositions[4] && particle.body.position.x < divisionsPositions[6]) {
        score = score + 100;
        particle = null;
      }
    }
  }

  Engine.update(engine);

  ground.display();

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  border1.display();
  border2.display();
  border3.display();
  border4.display();

   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }

   if (gameState === "end") {
    push();
    textSize(70);
    textAlign(CENTER);
    textStyle(BOLD);
    fill("gold");
    text("Game Over", width/2, height/2);
    pop();
  }
}