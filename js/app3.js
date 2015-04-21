// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -50; //set variable to be outside of canvas
    this.y = this.y_position(); 
    this.sprite = 'images/enemy-bug.png';
    this.speed = this.velocity();
    return this; 
}


Enemy.prototype.y_position = function() {
    var del_y = Math.floor(Math.random()*10);
    
    var init_y = 60;  
    //var y_loc = 0; 

    if (del_y <= 3) {
        init_y = 60; 
    }
    else if (del_y > 3 && del_y <9){
        init_y += init_y+25;
    }

    else if (del_y >= 9) {
         init_y += (init_y + 55*2); 
    }

    return  init_y;   
}

Enemy.prototype.velocity = function() {
    var speed = Math.floor(Math.random()*100 + 200);
    return speed; 
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt; 

    if (this.x > 505) {
        this.x = -50;
        this.speed = this.velocity();
        this.y = this.y_position(); 
    }

    // checks for enemy collision 
    if (Math.abs(this.x-player.x) < 50 && Math.abs(this.y-player.y) < 15) {
        player.x = 200;
        player.y = 400;
        //player.col_num++; 
        //allHeart[0].y = 100;
        heart.lives--; 
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x; 
    this.y = y; 
    this.sprite = 'images/char-boy.png';
    this.x_mov = 0;
    this.y_mov = 0; 
    this.col_num = 0;

    return this; 
}

Player.prototype.update = function() {
    this.x += this.x_mov;
    this.y += this.y_mov; 

    if(this.x > 401){
        this.x = 401;
    }
    else if(this.x < 1){
        this.x = 1;
    }
    else if(this.y > 400){
        this.y = 400;
    }
    else if(this.y < 1){
        player.x = 200;
        player.y = 400;
    }

    this.x_mov = 0;
    this.y_mov = 0;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(loc) {
    if(loc === "up"){
        this.y_mov = -83;
    }
    else if(loc === "down"){
        this.y_mov = 83;
    }
    else if(loc === "right"){
        this.x_mov = 100;
    }
    else if(loc === "left"){
        this.x_mov = -100;
    }
}

// creates the heart object to count lives
var Heart = function(lives) {
    this.x = 505;
    this.y = 10;
    this.lives = lives; 
    this.sprite = 'images/heart1.png';
    //this.width = this.sprite.width;
    //this.height = this.sprite.width;
    //this.val = 4; 
    this.a = this.sprite.width;
    
}

/*
Heart.prototype.update = function() {
    if(player.col_num == "1"    ){
        allHeart[0].x = 1000;
    }
    else if(player.col_num == 2){
        allHeart[1].x = 1000;
        allHeart[0].x = 1000;
    }
    else if(player.col_num == 3){
        allHeart[2].x = 1000;
        allHeart[1].x = 1000;
        allHeart[0].x = 1000;
    }
}
*/

Heart.prototype.render = function() {
    for (i=0; i<this.lives; i++)
    ctx.drawImage(Resources.get(this.sprite), (this.x-(i+1)*100), this.y);
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
//var allHeart = [];

for (var bug = 0; bug < 7; bug++) {
    allEnemies.push(new Enemy());
}
/*
for (var heart = 0; heart < 3; heart++) {
    allHeart.push(new Heart(505-(heart+1)*100));
}
*/

var player = new Player(200, 400);

var heart = new Heart(5);



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