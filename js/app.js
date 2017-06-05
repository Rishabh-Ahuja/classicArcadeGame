// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 75;
    this.height = 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.collisionDetection = function () {
    if (player.x <= this.x + this.width && player.x + player.width >= this.x && player.y <= this.y + this.height && player.height + player.y >= this.y) {
        console.log('collided');
        //check if lives are equal to 0 on detection
        if(+$('.lives-number').text() === 0) {
            player.resetPlayer();
            +$('.lives-number').text(5);
            +$('.score-number').text(0);
        }
        else {
            playerReset();
            +$('.lives-number').text(+$('.lives-number').text()-1);

        }

    }

};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    //check if enemy reaches end then reset it to start
    if (this.x >= 505) {
        this.x = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //increase the speed for difficulty
    this.speed += 0.01;
    //call collision function
    this.collisionDetection();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.resetPlayer = function () {
    player.x = 202.5;
    player.y = 383;
};
Player.prototype.update = function () {


};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};
Player.prototype.handleInput = function (keyPress) {
    //handle keypress

    if (keyPress === 'left') {
        this.x -= this.speed;

    }
    if (keyPress === 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress === 'right') {
        this.x += this.speed;

    }
    if (keyPress === 'down') {
        this.y += this.speed - 20;
    }
    //make sure player cannot cross canvas
    if (this.y > 383) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5
    }
    //make sure player when wins resets its position
    if (this.y <= -17) {
        this.resetPlayer();
        console.log('you won');
        // update the score

        +$('.score-number').text(+$('.score-number').text() + 100);



    }


};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 50, 70), new Enemy(0, 50, 70), new Enemy(0, 130, 70), new Enemy(0, 220, 80), new Enemy(5, 120, 90)];

var player = new Player(202.5, 383, 100);

