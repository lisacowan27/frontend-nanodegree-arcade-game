// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //TODO set the initial location
    this.x = -100;
    // y is above 220 and below 475
    this.y = function getRandomIntInclusive(220, 475) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //TODO enemy speed
    var speed = ;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //TODO update the location
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
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    //TODO set the initial location
    //TODO handle a collision
};


//Player update method
Player.prototype.update = function(dt) {
    //TODO update the location
    //TODO handle a collision
};

//Player render method
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput method
Player.prototype.handleInput function(allowedKeys) {
    //TODO move in the direction of the keys
    //TODO keep within the confines of the canvas (505, 606)
    //TODO reset if the player reaches the water (find pixel # of the beginning of the row)
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
