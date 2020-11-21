// various constants for the physics engine
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
// multiple arrays declared
var plinkos = [],
    particles = [],
    divisions = [];

// loading images for the bulb 
function preload() {
    bulbImg = loadAnimation("Assets/bulb1.png", "Assets/bulb2.png");
    bg = loadImage("Assets/bg.jpg");
    bgs = loadSound("Assets/bg.mp3");
}

function setup() {
    createCanvas(490, 800);
    engine = Engine.create();
    world = engine.world;

    // Bg sound
    bgs.play();

    // adding plinkos using arrays
    for (var j = 1; j <= 5; j++) {
        for (var i = 15; i <= width; i += 40) {
            plinkos.push(new Plinko(i, 75 * j));
        }
        j++;
        for (var i = 35; i <= width; i += 40) {
            plinkos.push(new Plinko(i, 75 * j));
        }
    }

    // creating a base
    base = new Fixed(width / 2, 775, width, 50);
    bulb = createSprite(width / 2, 775);
    bulb.addAnimation("bulbImg", bulbImg);

    // creating edges
    leftEdge = new Fixed(2.5, height / 2, 5, height, loadImage("Assets/edge.jpg"));
    rightEdge = new Fixed(width - 2.5, height / 2, 5, height, loadImage("Assets/edge.jpg"));

    // creating divisions
    for (var i = 10; i <= width; i += 80) {
        divisions.push(div = new Divisions(i));
    }

    Engine.run(engine);
}

function draw() {
    Engine.update(engine);
    background(bg);

    // creating particles 
    if (frameCount % 90 == 0) {
        var particle = new Particle(random(width), -10);
        Body.setStatic(particle.plinko, false);
        particles.push(particle);
    }

    // displaying elements of an array using a function
    show(plinkos);
    show(divisions);
    show(particles);

    // displaying the borders
    leftEdge.show();
    rightEdge.show();

    // displaying the divisions
    div.show();

    drawSprites();
}

// separate function to display the elements of an array
function show(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].show();
    }
}