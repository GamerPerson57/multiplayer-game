// Get the canvas and drawing context
let canvas = document.getElementById("gameCanvas");
let pencil = canvas.getContext("2d");

//grab zombie images
let zombieBack = document.getElementById("zombie_back");
let zombieFront = document.getElementById("zombie_front");
let zombieRight = document.getElementById("zombie_right");
let zombieLeft = document.getElementById("zombie_left");

//grab bush images
let bushBack = document.getElementById("bush_back");
let bushFront = document.getElementById("bush_front");
let bushRight = document.getElementById("bush_right");
let bushLeft = document.getElementById("bush_left");

//item image
let itemSprite = document.getElementById("coin");

// -----------------------------------------------
// Character objects
let zombie = {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    speed: 5,
    upKey: "w",
    downKey: "s",
    leftKey: "a",
    rightKey: "d",
    sprite : zombieBack,
    draw: function() {
        pencil.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    },
    // In the function below, when a key is pressed, the zombie will move in the corresponding direction
    move: function(keysPressed) {
        if(keysPressed[this.upKey]) {
            this.y -= this.speed;
            this.sprite = zombieBack;
        } else if(keysPressed[this.downKey]) {
            this.y += this.speed;
            this.sprite = zombieFront;
        } else if(keysPressed[this.leftKey]) {
            this.x -= this.speed;
            this.sprite = zombieLeft;
        } else if(keysPressed[this.rightKey]) {
            this.x += this.speed;
            this.sprite = zombieRight;
        } 
    }
};

let bush = {
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    speed: 5,
    upKey: "i",
    downKey: "k",
    leftKey: "j",
    rightKey: "l",
    sprite : bushBack,
    draw: function() {
        pencil.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    },
    // In the function below, when a key is pressed, the bush will move in the corresponding direction
    move: function(keysPressed) {
        if(keysPressed[this.upKey]) {
            this.y -= this.speed;
            this.sprite = bushBack;
        } else if(keysPressed[this.downKey]) {
            this.y += this.speed;
            this.sprite = bushFront;
        } else if(keysPressed[this.leftKey]) {
            this.x -= this.speed;
            this.sprite = bushLeft;
        } else if(keysPressed[this.rightKey]) {
            this.x += this.speed;
            this.sprite = bushRight;
        } 
    }
};

let item = {
    x: 400,
    y: 15,
    width: 100,
    height: 100,
    sprite : itemSprite,
    draw: function() {
        pencil.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
};

// -----------------------------------------------
// Track pressed keys
let keysPressed = {};
window.addEventListener("keydown", function(e) {
    keysPressed[e.key] = true;
});
window.addEventListener("keyup", function(e) {
    keysPressed[e.key] = false;
});

// -----------------------------------------------
// Utility function to check distance
function getDistance(a, b) {
    let dx = (a.x + a.width/2) - (b.x + b.width/2);
    let dy = (a.y + a.height/2) - (b.y + b.height/2);
    return Math.sqrt(dx*dx + dy*dy);
}

// -----------------------------------------------
// Game loop
function gameLoop() {
    // Draw background
    pencil.clearRect(0, 0, canvas.width, canvas.height);
    pencil.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Move characters
    zombie.move(keysPressed);
    bush.move(keysPressed);

    // Draw characters
    zombie.draw();
    bush.draw();

    // Draw item
    item.draw();

    //Uses getDistance to randomize the location of the item when it is collected by either character
    if (getDistance(zombie, item) < 50) {
        console.log("Zombie collected the coin!");
        item.x = Math.random() * (canvas.width - item.width);
        item.y = Math.random() * (canvas.height - item.height);
    }

    if (getDistance(bush, item) < 50) {
        console.log("Bush collected the item!");
        item.x = Math.random() * (canvas.width - item.width);
        item.y = Math.random() * (canvas.height - item.height);
    }
}

setInterval(gameLoop, 50);