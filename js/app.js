// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>500){
        allEnemies.shift();
    }
    this.x+=(300*dt);
    if(Math.abs(this.x-player.x)<80){
        if((player.y-this.y == 0)||((player.y-this.y<0 && this.y-player.y<60)||(this.y-player.y<0 && player.y-this.y<80))){
            allEnemies = [];
            player.reset();
        }
    }
    console.log(allEnemies.length);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(step){
    this.sprite = 'images/char-boy.png';
    this.step=step;
    this.x=200;
    this.y=400;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
Player.prototype.handleInput = function(keyCode){
    if(keyCode === 'left'){
        if(this.x-this.step>0){
            this.x -= this.step;
        }
        else{
            this.x=0;
        }
    }
    if(keyCode == 'right'){
        if(this.x+this.step<400){
            this.x += this.step;
        }
        else{
            this.x=400;
        }
    }
    if(keyCode == 'up'){
        if(this.y-this.step>-10){
            this.y -= this.step;
        }
        else{
            this.y=-10;
        }
    }
    if(keyCode == 'down'){
         if(this.y+this.step<430){
             this.y += this.step;
        }
        else{
            this.y=430;
        }
       
    }
    console.log('The water= '+this.y);
};
Player.prototype.update = function(dt){
};
Player.prototype.reset = function(){
    this.x=200;
    this.y=400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(30);
var position = [60,140,220];
var spawnEnemy = function(){
    var bug = new Enemy();
    var yIndex = Math.floor(Math.random()*3+0);
    bug.y=position[yIndex];
    bug.x=-90;
    allEnemies.push(bug);
};
(function startSpawn(){
    var myFunc = function(){
        spawnEnemy();
        setTimeout(myFunc,Math.floor(Math.random()*1000+500));

    };
    myFunc();
})();
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
