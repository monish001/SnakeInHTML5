/*
 * Author: monish.gupta1@gmail.com
 * File: GameManager.js
 */
/* Current Version: working on version 1.2
 * Scope of SNAKE VERSION 1.0 (pathBricks and SnakeHead added)
 *	1. There is only snakeHead, no snakeTail is present.
 *  2. There are only pathBricks present.
 *  3. Depending on the user input which is given via arrowKeys, the snakeHead changes position on the canvas. 
 *     It can go through the walls to comeup from the other side.
 *	4. Depending on the location of the last pathBrick the snakeHead has traversed(NWES), it's head would be shown as directed to the corresponding direction.
 *  
 * Scope of SNAKE VERSION 1.1 (Snake running automatically and 1 Maze added)
 *	1. There will be only one particular maze.
 *     It must be written in an extensible fashion so that later(in next versions) on upgrading the stages, different mazes could be used.
 *	2. There is only snakeHead, no snakeTail is present. SnakeHead is extensible to facilitate addition of tail feature of given length in the later versions.
 *	3. There are two type of bricks pathBricks and mazeBricks.
 *	4. Depending on the location of the last pathBrick the snakeHead has traversed(NWES), it's head would be shown as directed to the corresponding direction.
 *	5. BUG FIX: SnakeHead should NOT be allowed to moved in back direction.
 *  
 * Scope for SNAKE VERSION 1.2 (Random Generated Food and snakeHead able to consume it) & make variable of TileWidth and TileHeight & use int for snake's directions instead of string
 * Scope for SNAKE VERSION 1.3 (Snake Tail added)
 * Scope for SNAKE VERSION 1.4 (Snake Tail can now grow on eating food)
 * Scope for SNAKE VERSION 1.5 (mazeBricks dynamic variation feature added)
 * Scope for SNAKE VERSION 1.6 (power food pluggable feature.)
 *  For example, BrickBreaker food can allow snake to destroy and pass through walls for say 10 secs.
 *  For example, MazeFreezer food freezes the dynamic movement of bricks for say 10 secs.
 *  For example, SnakeShortener shortens the snake by 2 units if length of snake is sufficient 
 * Scope for SNAKE VERSION 1.7 (front welcome screen added. Single player game complete i guess)
 * Scope for SNAKE VERSION 1.8 (now 1 or even 2 players can play from same machine)
 * Scope for SNAKE VERSION 1.9 (second player can play from remote machine also)
 *  
 */

/*
 * Global variables
 */
var _canvas = null;
var _buffer = null;
var canvas = null;
var buffer = null;

var gameManager = null;
var global = this;
var imageSprite = null;
var Direction = {
	NOT_DEFINED:0,
	RIGHT:1,
	LEFT:2,
	UP:3,
	DOWN:4
};

/*
 * Thanks to http://stackoverflow.com/questions/5605588/how-to-use-requestanimationframe for this function
 */
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

/*
 * Template for creating objects of GameManager
 */
function GameManager() {
	this.isPlaying = false;
	var self = this;
	global.gameManager = self;
	var snake = null;
	var mazes = null;
	var eventHandler = null;
	var gameStage = null;	
	var tileHeight = null;
	var tileWidth = null;
	var xNumTiles = null;
	var yNumTiles = null;
	var food = null;

	//gets reset to true just after drawing of a frame buffer.
	var waiting = true;

	this.Init = function() {
		_canvas = document.getElementById('canvas');
		if (_canvas && _canvas.getContext) {
			global.imageSprite = new Image();
			global.imageSprite.src = 'sprite.png';
			_canvas.style.backgroundImage=imageSprite;
			canvas = _canvas.getContext('2d');
			
			_buffer = document.createElement('canvas');
			_buffer.width = _canvas.width;
			_buffer.height = _canvas.height;
			buffer = _buffer.getContext('2d');
			
			buffer.strokeStyle = "rgb(255, 255, 255)";
			buffer.fillStyle = "rgb(255, 255, 255)";
			buffer.font = "bold 25px sans-serif";
			
			global.imageSprite.addEventListener('load', function () {
				global.gameManager.gameStage = 0;
				global.gameManager.tileWidth = 25;
				global.gameManager.tileHeight = 25;
				global.gameManager.xNumTiles = _canvas.width/global.gameManager.tileWidth;
				global.gameManager.yNumTiles = _canvas.height/global.gameManager.tileHeight;
				global.gameManager.food = new Food();
				global.gameManager.food.Init();
				global.gameManager.snake = new Snake();
				global.gameManager.snake.Init();
				global.gameManager.snake.setSpeed(5);//higher the value lesser is the speed >= 0
				global.gameManager.eventHandler = new EventHandler();
				global.gameManager.mazes = new Maze();
				global.gameManager.waiting = true;
			}, false);
		}
	}
	
	this.startLoop = function() {	
		if(!(self.isPlaying)){
			self.isPlaying = true;
			self.Loop();
		}
	}
	this.stopLoop = function() {
		self.isPlaying = false;
	}
	
	this.Update = function() {
		//update snake position
		global.gameManager.food.update();
		global.gameManager.snake.checkCollision();
		global.gameManager.mazes.checkCollision();
		global.gameManager.snake.move();
	}
	
	this.Draw = function() {
		buffer.clearRect(0, 0, _buffer.width, _buffer.height);
		canvas.clearRect(0, 0, _canvas.width, _canvas.height);
		
		//Draw SnakeHead
		buffer.drawImage(
			global.imageSprite, 
			global.gameManager.snake.xSnakeHeadSprite, global.gameManager.snake.ySnakeHeadSprite, 
			global.gameManager.tileWidth,global.gameManager.tileHeight, 
			global.gameManager.snake.xSnakeHeadCanvas, global.gameManager.snake.ySnakeHeadCanvas, 
			global.gameManager.tileWidth,global.gameManager.tileHeight
		);
		
		//Draw Maze: mazes draw the maze corresponding to the gameStage
		global.gameManager.mazes.draw(buffer, global.gameManager.gameStage);
		global.gameManager.food.draw(buffer);
		canvas.drawImage(_buffer, 0, 0);

	}
	
	this.Loop = function() {
		if(self.isPlaying){
			if(global.gameManager.snake.speedCounter==0) {
				self.Update();
				self.Draw();
				global.gameManager.waiting = true;
			}
			++(global.gameManager.snake.speedCounter);
			if(global.gameManager.snake.speedCounter >= global.gameManager.snake.speed)
				global.gameManager.snake.speedCounter = 0;
			window.requestAnimFrame(self.Loop);
		}
	}


}