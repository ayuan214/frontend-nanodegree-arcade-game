// Enemies our player must avoid
var game_state = 'char_select';
var allEnemies;
var allKeys;
var heart; 
var player; 
var star; 

var Key = function() {
    this.x = this.x_position();
    this.y = this.y_position();
    this.sprite = 'images/Key.png';
    return this;
}

Key.prototype.x_position = function() {
    var del_x = Math.floor(Math.random()*10);
    var init_x = 0;
    if (del_x <=1) {
        init_x;
    }
    else if (del_x >= 2 && del_x <=3) {
        init_x += 100;   
    }
    else if (del_x >= 4 && del_x <=5) {
        init_x += 200;   
    }
    else if (del_x >= 6 && del_x <=7) {
        init_x += 300;   
    }
    else if (del_x >= 8 && del_x <=9) {
        init_x += 400;   
    }
    return init_x; 
       
}

Key.prototype.y_position = function() {
    var del_y = Math.floor(Math.random()*10);
    
    var init_y = 60;  
    //var y_loc = 0; 

    if (del_y <= 3) {
        init_y; 
    }
    else if (del_y > 3 && del_y <7){
        init_y += init_y+25;
    }

    else if (del_y >= 7) {
         init_y += (init_y + 110); 
    }

    return  init_y;   
}

Key.prototype.update = function() {
    if (allKeys.length > 1) {
        if (allKeys[0].x === allKeys[1].x && allKeys[0].y === allKeys[1].y) {
            if(allKeys[0].y <225) {
                allKeys[1].y += 85;
            } 
            else {
                allKeys[1].y -=85; 
            }
        }   
    }
}

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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
        init_y; 
    }
    else if (del_y > 3 && del_y <7){
        init_y += init_y+25;
    }

    else if (del_y >= 7) {
         init_y += (init_y + 105); 
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
}    


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(char_img,x,y) {
    this.x = x; 
    this.y = y; 
    this.sprite = char_img;
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
    else if(this.y < -20){
        player.y = -15;
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


Heart.prototype.render = function() {
    ctx.fillStyle = "black";
    ctx.font = "bold 25px sans-serif";
    ctx.fillText('Lives:', 340, this.y+30);
    for (i=0; i<this.lives; i++)
    ctx.drawImage(Resources.get(this.sprite), (this.x-(i+1)*25), this.y);
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Star = function() {
    this.x = this.x_position();
    this.y = -10;
    this.sprite = 'images/Star.png';
}

Star.prototype.x_position = function() {
    var del_x = Math.floor(Math.random()*10);
    var init_x = 0;
    if (del_x <=1) {
        init_x;
    }
    else if (del_x >= 2 && del_x <=3) {
        init_x += 100;   
    }
    else if (del_x >= 4 && del_x <=5) {
        init_x += 200;   
    }
    else if (del_x >= 6 && del_x <=7) {
        init_x += 300;   
    }
    else if (del_x >= 8 && del_x <=9) {
        init_x += 400;   
    }
    return init_x; 
}

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var GameOver = function() {
    this.x = 0;
    this.y = 100;
}

GameOver.prototype.render = function() {
    if (game_state == 'end') {
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = "bold 48px sans-serif";
        ctx.fillText('GAME OVER', ctx.canvas.width/2, ctx.canvas.height/6);
        ctx.font = "15px sans-serif";
        ctx.fillText('Press the up arrow to try again', ctx.canvas.width/2, ctx.canvas.height/4.9);
    }
}

GameOver.prototype.handleInput = function(loc) {
    if(loc === "up"){
        game_state = 'char_select';
    }
}


var selectChar = function() {
    y_char = 225;

    this.char_arr = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

    this.char_arr_x =[];
    this.char_arr_y = [];
    for (i = 0; i<this.char_arr.length; i++) {
        this.char_arr_x[i] = i*100; 
    }

    for (i = 0; i<this.char_arr.length; i++) {
        this.char_arr_y[i] = y_char; 
    }


    this.sprite = 'images/Selector.png';
    this.x = 0;
    this.y = 210;
    this.x_mov = 0;
    this.y_mov = 0; 

    return this; 
 }


selectChar.prototype.render = function() {
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText('Select a Character', ctx.canvas.width/2, ctx.canvas.height/6);
    ctx.font = "15px sans-serif";
    ctx.fillText('Press the up arrow once you have selected a character', ctx.canvas.width/2, ctx.canvas.height/4.9);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    for (i = 0; i < this.char_arr.length; i++ ) {
        ctx.drawImage(Resources.get(this.char_arr[i]), this.char_arr_x[i], this.char_arr_y[i]);
    }
 }

 selectChar.prototype.update = function() {
    this.x += this.x_mov;

    if(this.x > 400){
        this.x = 400;
    }
    else if(this.x < 0){
        this.x = 0;
    }

    this.x_mov = 0;
 }

 selectChar.prototype.handleInput = function(loc) {
    if(loc === "up"){
        for (i=0; i<this.char_arr.length; i++) {
            if(this.x === this.char_arr_x[i]) {
                this.index_val = this.char_arr_x.indexOf(this.char_arr_x[i]);
                this.char_sprite = this.char_arr[this.index_val];
                //var player = new Player(this.selectChar_fin, 200, 415);
            }
        }
        game_state = "game_start";
    }

    else if(loc === "right"){
        this.x_mov = 100;
    }
    else if(loc === "left"){
        this.x_mov = -100;
    }
}

//Check for collision function

var Collision_Check = function() {
    for (enemy in allEnemies) {
        if (Math.abs(allEnemies[enemy].x-player.x) < 50 && Math.abs(allEnemies[enemy].y-player.y) < 15) {
            player.x = 200;
            player.y = 400;
            //player.col_num++; 
            //allHeart[0].y = 100;
            heart.lives--; 
        }
    }

    for (key in allKeys) {
        if (Math.abs(allKeys[key].x-player.x) < 50 && Math.abs(allKeys[key].y-player.y) < 15) {
           var key_index =  allKeys.indexOf(allKeys[key]);
           if (key_index > -1) {
                allKeys.splice(key_index,1);
           }
        }
    }

    if (game_state === 'keys_collect') {
        if (Math.abs(star.x-player.x) < 50 && Math.abs(star.y-player.y) < 15) {
            star = [];
            player.x = 200;
            player.y = 400;
            game_state = 'playing';
            for (var i = 0; i < 2; i++) { // orig value bug = 3
                allKeys.push(new Key());
            }
        }  
    }
    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var gameStart = function() {
    game_state = 'char_select';
    return game_state; 
}

var lives_check = function() {
    if (heart.lives < 1) {
        game_state = 'end';
        return game_state;
    }
    //return game_state; 
}

var key_check = function() {
    if (allKeys.length == 0) {
        game_state = 'keys_collect';
        star = new Star();
    }
}

var gamePlay = function(bug_count, lives, player_x, player_y) {
    allEnemies = [];
    allKeys = [];

    for (var i = 0; i < 2; i++) { // orig value bug = 3
        allKeys.push(new Key());
    }

    for (var bug = 0; bug < bug_count; bug++) { // orig value bug = 3
        allEnemies.push(new Enemy());
    }

    player = new Player(selectChar.char_sprite, player_x, player_y); // orig value Player(200,415)

    heart = new Heart(lives); // orig value Heart(5)
    game_state = 'playing'; 
}

    var selectChar = new selectChar();
    //var gamePlay = new gamePlay(); 
    var gameOver = new GameOver();
     



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (game_state === 'playing' || game_state === 'keys_collect') {
        player.handleInput(allowedKeys[e.keyCode]);  
    }
    else if (game_state === 'char_select') {
        selectChar.handleInput(allowedKeys[e.keyCode]);  
    }

    else if (game_state === 'end') {
        gameOver.handleInput(allowedKeys[e.keyCode]);
    }
});