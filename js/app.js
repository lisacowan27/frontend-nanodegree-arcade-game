// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //TODO set the initial location
    this.x = -100;
    // y is below 396 and above 130 (water row + 20 padding)
    this.y = y;
    //TODO enemy speed
    var enemySpeed = this.speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //TODO update the location
    //1) randomize
    //var enemySpeed = Math.floor(Math.random(this.speed) * 100);
    enemySpeed = enemySpeed * 100 * dt;

    //2) keep within the boundaries of x 0 to 505 and y 132 to 387;
    //if ((this.x > -100 && this.x < 505) && (this.y > 132 && this.y < 387)) {
      //  this.speed = enemySpeed * dt;
    //}

    //TODO handle a collision
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player class definition
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    //TODO set the initial location
    this.x = x;
    this.y = y;
    var direction = this.handleInput();
    //TODO handle a collision
};

//Player update method
Player.prototype.update = function(dt) {
    //TODO update the location
    //TODO handle a collision
    //QUESTION: WHY USE PROTOTYPE HERE WHEN WE ARE JUST CREATING 1 PLAYER, AND THERE WILL ONLY EVER BE 1 INSTANCE OF PLAYER?
};

//Player render method
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput method
Player.prototype.handleInput = function(allowedKeys) {
    //TODO move in the direction of the keys
    //TODO keep within the confines of the canvas width (505) and where the player hits water (486)
    if (allowedKeys === 'left' && this.x > 50) {
        this.x -= 100;
    };
    if (allowedKeys === 'right' && this.x < 410) {
        this.x += 100;
    };
    if (allowedKeys === 'up' && this.y > 80) {
        this.y -= 80;
    };
    if (allowedKeys === 'down' && this.y < 420) {
        this.y += 80;
    };

    //TODO reset if the player reaches the water (486)
};
// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy (345, 4),
new Enemy (259, 7),
new Enemy(175, 5));

// Place the player object in a variable called player
var player = new Player(210, 420);


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
