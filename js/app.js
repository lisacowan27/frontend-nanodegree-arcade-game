// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.height = 75;
    this.x = 100;
    // y is below 396 and above 130 (water row + 20 padding)
    this.y = y;
    //TODO tinker with enemy speeds
    this.speed = Math.floor(Math.random(this.speed) * 100) + 150; //150 is the minimum speed,floor
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x +=this.speed * dt;
    if (this.x > 505) {
        this.x = -50;
        this.speed = Math.floor(Math.random(this.speed) * 100) + 150;
    }
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
    this.width = 76;
    this.height = 78;
    this.x = x;
    this.y = y;
    //TODO handle a collision

    //player reaches the water -- something needs to happen here!
    if (this.y < 30){
    this.resetPlayer();
  }
};

//Player update method
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
    this.reset = function () {
        this.x = 210;
        this.y = 500;
        for(var i = 0; i < allEnemies.length; i++) {

        }
    }
};

//Player render method
// don't really need dt here
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput method
// don't really need dt here
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

    //TODO reset if the player reaches the water (80)
    if (this.y < 55) {
        alert('You won!');
    }
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// TODO randomize
var allEnemies = [];
allEnemies.push(new Enemy (304, 4),
new Enemy (218, 7),
new Enemy (135, 5)
);

// Place the player object in a variable called player
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
