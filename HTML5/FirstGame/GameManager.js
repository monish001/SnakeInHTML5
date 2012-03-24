/*
 * Author: monish.gupta1@gmail.com
 * File: GameManager.js
 */
/* Current Version: working on version 1.0
 * Scope of SNAKE VERSION 1.0 (pathBricks and SnakeHead added)
 *	1. There is only snakeHead, no snakeTail is present.
 *  2. There are only pathBricks present.
 *  3. Depending on the user input which is given via arrowKeys, the snakeHead changes position on the canvas. 
 *     It can go through the walls to comeup from the other side.
 *	4. Depending on the location of the last pathBrick the snakeHead has traversed(NWES), it's head would be shown as directed to the corresponding direction.
 *  
 * Scope of SNAKE VERSION 1.1 (Snake running automatically and 1 Maze added)
 *	1. There will be only one particular maze. 
 *     It must be written in an extensible fashion so that later(in next versions) on upgrading the stages, differenr mazes could be used.
 *	2. There is only snakeHead, no snakeTail is present. SnakeHead is extensible to facilitate addition of tail feature of given length in the later versions.
 *	3. There are two type of bricks pathBricks and mazeBricks.
 *	4. Depending on the location of the last pathBrick the snakeHead has traversed(NWES), it's head would be shown as directed to the corresponding direction.
 *  
 * Scope for SNAKE VERSION 1.2 (Random Generated Food and snakeHead able to consume it)
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
var global = this;
var snake = null;
var maze = null;
var eventHandler = null;
var gameManager = null;

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

	this.Init = function() {
		_canvas = document.getElementById('canvas');
		if (_canvas && _canvas.getContext) {
			canvas = _canvas.getContext('2d');
			
			_buffer = document.createElement('canvas');
			_buffer.width = _canvas.width;
			_buffer.height = _canvas.height;
			buffer = _buffer.getContext('2d');
			
			buffer.strokeStyle = "rgb(255, 255, 255)";
			buffer.fillStyle = "rgb(255, 255, 255)";
			buffer.font = "bold 25px sans-serif";
			
			global.snake = new Snake();
			global.snake.speedCounter = 0;
			global.snake.speed = 4;//higher the value lesser is the speed
			global.eventHandler = new EventHandler();

			window.addEventListener('keydown', global.eventHandler.keyCheck, true);
			//_canvas.addEventListener('click', global.snake.keyCheck, false);
			
			global.snake.snakeHeadSprite = new Image();
			global.snake.snakeHeadSprite.src = 'SnakeHead.png';
			global.snake.snakeHeadSprite.addEventListener('load', global.snake.Init, false); 

			self.startLoop();
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
		switch(global.snake.direction){
			case "Left":
				global.snake.xSnakeHeadCanvas -= 25;
				if(global.snake.xSnakeHeadCanvas < 0)
					global.snake.xSnakeHeadCanvas += _canvas.width;
				break;
			case "Right":
				global.snake.xSnakeHeadCanvas += 25;
				if(global.snake.xSnakeHeadCanvas >= _canvas.width)
					global.snake.xSnakeHeadCanvas -= _canvas.width;
				break;
			case "Up":
				global.snake.ySnakeHeadCanvas -= 25;
				if(global.snake.ySnakeHeadCanvas < 0)
					global.snake.ySnakeHeadCanvas += _canvas.height;
				break;
			case "Down":
				global.snake.ySnakeHeadCanvas += 25;
				if(global.snake.ySnakeHeadCanvas >= _canvas.height)
					global.snake.ySnakeHeadCanvas -= _canvas.height;
				break;
		}
	}
	
	this.Draw = function() {
		buffer.clearRect(0, 0, _buffer.width, _buffer.height);
		canvas.clearRect(0, 0, _canvas.width, _canvas.height);
		
		//Draw SnakeHead
		buffer.drawImage(global.snake.snakeHeadSprite, global.snake.xSnakeHeadSprite, global.snake.ySnakeHeadSprite, 25,25, global.snake.xSnakeHeadCanvas, global.snake.ySnakeHeadCanvas, 25,25);
		
		//Draw Maze
		//maze.draw(buffer);
		
		canvas.drawImage(_buffer, 0, 0);

	}
	
	this.Loop = function() {
		if(self.isPlaying){
			if(global.snake.speedCounter==0) {
				self.Update();
				self.Draw();
			}
			++(global.snake.speedCounter);
			if(global.snake.speedCounter >= global.snake.speed)
				global.snake.speedCounter = 0;
			window.requestAnimFrame(self.Loop);
		}
	}


}