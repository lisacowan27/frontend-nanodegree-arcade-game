/*  Credits:

    - collision code is based on information from this page: https://github.com/dvampofo/Classic-Arcade/blob/Water-Collision/js/app.js, https://discussions.udacity.com/t/arcade-collision-function-issues/181377/17
*/


// Create y array to randomize the y position for enemies
var yArray = [135, 218, 304];

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
    this.speed = Math.floor(Math.random(this.speed) * 100) + 150; //150 is the minimum speed,floor
};

/*  Update the enemy's position
    - update the x value of the position
    - randomize enemies y position with each loop
    - randomize enemies speed with each loop
*/
Enemy.prototype.update = function(dt) {
    this.x +=this.speed * dt;
    if (this.x > 505) {
        this.x = -50;
        this.y = yArray[Math.floor(Math.random() * yArray.length)];
        this.speed = Math.floor(Math.random(this.speed) * 100) + 150;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
};

/*  Player update method
    * Collision:
    - loop through each enemy in the array
    - creates the collision conditions by delineating the 4 corners of each enemy and the character as they move.
    - when there is an overlap, create a collision
    * Reset:
    - when a collision occurs, popup an alert, then send the player back to the starting point and send the Enemy back to the update loop when the alert is closed
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
            this.reset();
       }
    }
    //When the player reaches the water
    if (this.y < 55) {
        alert('You won!');
        this.reset();
        Enemy.prototype.update();
    }
};

//Player render method -- draw the player
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput method: assign number values to key movements
Player.prototype.handleInput = function(allowedKeys) {
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

// Instantiate the player and enemy objects

/*  Create the enemies
    - Create blank array
    - Push new instances into the blank array
*/
var allEnemies = [];
    for (var i = 0; i <= 2; i++){
       allEnemies.push(new Enemy ());
    }

// Create new instance of Player and assign it the the value of player
var player = new Player(210, 500);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* This resets the game back to the beginning */
Player.prototype.reset = function () {
        this.x = 210;
        this.y = 500;
        for(var i = 0; i < allEnemies.length; i++) {
            Enemy.prototype.update();
        }
    }

