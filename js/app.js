/* __________________________________________________________________________________________________________
Credits:

    - The collision code is based on information from this page: https://github.com/dvampofo/Classic-Arcade/blob/Water-Collision/js/app.js, https://discussions.udacity.com/t/arcade-collision-function-issues/181377/17

    - Tips for figuring out sticky issues came from review of this site by a fellow Udacian: http://slooptb.github.io/ladybugger/

    - Gem collection ideas game from review of this site by a fellow Udacian: https://github.com/dvampofo/Classic-Arcade/blob/Water-Collision/js/app.js
__________________________________________________________________________________________________________*/

// Create global variables
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 630;
var go = true;

// Create global variable for y arrays for enemies and gems
var yArray = [135, 218, 304];

/* __________________________________________________________________________________________________________

ENEMIES

/*  Enemy class constructor definition
    - sets enemy image and image size (for collisions)
    - sets starting x placement for all enemies off the left side of the canvas
    - sets random y axis placment for each enemy
    - sets random speeds for each enemy
*/
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.height = 75;
    this.x = -100;
    this.y = yArray[Math.floor(Math.random() * yArray.length)];
    var speed = Math.floor(Math.random(this.speed) * 100) + 150; //150 is the minimum speed,floor
    this.speed = speed;
};

/*  Update the enemy's position
    - update the x value of the position
    - randomize enemies' y position with each loop
    - randomize enemies' speed with each loop
*/
Enemy.prototype.update = function(dt) {
    this.x +=this.speed * dt;
    if (this.x > 505) {
        this.x = -50;
        this.y = yArray[Math.floor(Math.random() * yArray.length)];
        this.speed = Math.floor(Math.random(this.speed) * 100) + 100; //150 is the minimum speed,floor
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* INSTANTIATE ENEMIES */

/*  Create the enemies
    - Create blank array
    - Push new instances into the blank array
*/
var allEnemies = [];
    for (var i = 0; i <= 2; i++){
       allEnemies.push(new Enemy ());
    }

/* __________________________________________________________________________________________________________

PLAYER

/*  Player class constructor definition
    - set the player image
    - set width and height for collisions
    - set x and y values equal to the passed parameters
*/
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.width = 76;
    this.height = 78;
    this.x = x;
    this.y = y;
    this.stop = false;
    this.score = 0;
};

/*  Player update method
    * Collision:
    - loop through each enemy in the array
    - creates the collision conditions by delineating the 4 corners of each enemy and the character as they move.
    - when there is an overlap, create a collision
    * Win:
    - When the player reaches the water, popup an alert, then reset the player's starting position and send the Enemy back to the update loop when the alert is closed
*/
Player.prototype.update = function(dt) {
    for(var i = 0; i < allEnemies.length; i++) {
        if ((this.x < allEnemies[i].x + 40) &&
            (this.x + 40 > allEnemies[i].x) &&
            (this.y < allEnemies[i].y + 40) &&
            (this.y + 40 > allEnemies[i].y)) {
                alert('Please try again!');
                score.update();
                /*console.log("enemy" + enemyScore);*/
                this.reset();
       }
    }
    //When the player reaches the water
    if (this.y < 55) {
        alert('You won!');
        this.score++;
        console.log(this.score);
        this.reset();
        Enemy.prototype.update();
    }
};

//Player render method -- draw the player
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Render the scoreboard
    Score();
};

//Player handleInput method: assign number values to key movements
Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'space') {
        go = !go;
    }
    if (allowedKeys === 'left' && this.x > 40) {
        this.x -= 40;
    }
    if (allowedKeys === 'right' && this.x < 400) {
        this.x += 40;
    }
    if (allowedKeys === 'up' && this.y > 80) {
        this.y -= 45;
    }
    if (allowedKeys === 'down' && this.y < 500) {
        this.y += 45;
    }
};

/* This resets the game back to the beginning */
Player.prototype.reset = function () {
        this.x = 210;
        this.y = 500;
        for(var i = 0; i < allEnemies.length; i++) {
            Enemy.prototype.update();
        }
    }

// Instantiate the player

// Create new instance of Player and assign it the the value of player
var player = new Player(210, 500);

/* __________________________________________________________________________________________________________

GEMS

/* Define Gem class constructor
    - sets gem image and image size (for collectioin)
    - sets starting x placement for all gems off the left side of the canvas
    - sets random y axis placment for each gem
    - sets random speeds for each gem (a little faster than the enemies to make it more challenging)
*/

var Gem = function(sprite) {
    this.sprite = sprite;
    this.width = 50;
    this.height = 50;
    this.x = -100;
    this.y = yArray[Math.floor(Math.random() * yArray.length)];
    var speed = Math.floor(Math.random(this.speed) * 100) + 200; //150 is the minimum speed,floor
    this.speed = speed;
};

/*  Update the gem's position
    - update the x value of the position
    - randomize gems' y position with each loop
    - randomize gems' speed with each loop
*/

Gem.prototype.update = function(dt) {
    this.x +=this.speed * dt;
    if (this.x > 505) {
        this.x = -50;
        this.y = yArray[Math.floor(Math.random() * yArray.length)];
        this.speed = Math.floor(Math.random(this.speed) * 100) + 150; //150 is the minimum speed,floor
    }
    for(var i = 0; i < allGems.length; i++) {
        if ((player.x < allGems[i].x + 25) &&
            (player.x + 35 > allGems[i].x) &&
            (player.y < allGems[i].y + 25) &&
            (player.y + 35 > allGems[i].y)) {
                alert('You\'ve captured a gem!');
                player.score+=10;
                player.reset();
            // spec out capture of individual gems
            if (allGems[i] === allGems[0]) {
                console.log('blue gem');
            } else if (allGems[i] === allGems[1]) {
                console.log('green gem');
            } else if (allGems[i] === allGems[1]) {
                console.log('orange gem');
            }
       }
    }
};

// Draw the gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*  Create the gems
    - Create the blank array
    - Push new isntances into the blank array
*/
var gemBlue =  new Gem('images/GemBlue.png');
var gemGreen = new Gem('images/GemGreen.png');
var gemOrange = new Gem('images/GemOrange.png');

var allGems = [];
allGems.push(gemBlue, gemGreen, gemOrange);

/* __________________________________________________________________________________________________________

SCORES

/*  Scoreboard class constructor definition
    - create the canvas
    - create text with variable for player score
*/
var Score = function(score){
   //this.score = score;
};

Score.prototype.update = function () {
    ctx.clearRect(1, 600, 505, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 586, 505, 50);
    ctx.fillStyle = 'black';
    ctx.fillText("Player score: "+ player.score, 1, 610);
};

Score.prototype.render = function() {
    ctx.clearRect(1, 600, 505, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 586, 505, 50);
    ctx.fillStyle = 'black';
    ctx.fillText("Player score: "+ player.score, 1, 610);
};

var score = new Score ();

/* __________________________________________________________________________________________________________

EVENT LISTENERS */

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
