/*
 * Author: monish.gupta1@gmail.com
 * File: GameManager.js
 */
/* Current Version: working on version 1.3.5
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
 * Scope for SNAKE VERSION 1.3.1 (Snake Tail added)
 * Scope for SNAKE VERSION 1.3.2 (Snake Tail can now grow on eating food)
 * Scope for SNAKE VERSION 1.3.3 (Game start screen added - Logo, PlayBtn, Instruction, Controls) + BUG FIX: brick image co-ordinates were wrong
 * Scope for SNAKE VERSION 1.3.4 Create SpriteManager
 * Scope for SNAKE VERSION 1.3.4.1 Move all sprite drawing in SpriteManager
 * Scope for SNAKE VERSION 1.3.4.2 Make the game window size aware
 * Scope for SNAKE VERSION 1.3.5 Change the working to be based on time removing dependency on FPS (thanks to http://viget.com/extend/time-based-animation)
 * Scope for SNAKE VERSION 1.3.6 Game End animation added + Move drawing of snake body images to sprite manager + fix click of empty space on sides of play btn
 * Scope for SNAKE VERSION 1.3.7 Keep logo and btns in center irrespective of canvas width + BUG FIX: Food on snake body + Snake can cross itself
 * Scope for SNAKE VERSION 1.3.8 (Game start screen stuff added - Controls)
 * Scope for SNAKE VERSION 1.4   (Game end screen added)
 * Scope for SNAKE VERSION 1.5 (mazeBricks dynamic variation feature added)
 * Scope for SNAKE VERSION 1.6 (power food pluggable feature.)
 *  For example, BrickBreaker food can allow snake to destroy and pass through walls for say 10 secs.
 *  For example, MazeFreezer food freezes the dynamic movement of bricks for say 10 secs.
 *  For example, SnakeShortener shortens the snake by 2 units if length of snake is sufficient 
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
var snakeSpeed = 5;

var Direction = {
	NOT_DEFINED:0,
	RIGHT:1,
	LEFT:2,
	UP:3,
	DOWN:4
};
var GameState = {
	WELCOME:0,
	RUNNING:1,
	PAUSED:2,
	STOPPED:3
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
	var self = this;
	global.gameManager = self;
	
	//Data: objects
	var snake = null;
	var mazes = null;
	var eventHandler = null;
	this.spriteManager = new SpriteManager();
	var food = null;
	
	//Data: data members
	var gameState = null;
	var gameStage = null;	
	var tileHeight = null;
	var tileWidth = null;
	var xNumTiles = null;
	var yNumTiles = null;
	
	var windowHeight = window.innerWidth;
	var windowWidth = window.innerHeight;
	
	//data: required in draw() for STOPPED state
	var gameStoppedSince = -1;

	//gets reset to true just after drawing of a frame buffer.
	var waitingForInput = null;

	//window.addEventListener('resize', this.Update, false);
	//window.addEventListener('orientationchange', this.resizeGame, false);

	_canvas = document.getElementById('gameCanvas');
	if (_canvas && _canvas.getContext) {
		canvas = _canvas.getContext('2d');
		
		_buffer = document.createElement('canvas');
		_buffer.width = _canvas.width;
		_buffer.height = _canvas.height;
		buffer = _buffer.getContext('2d');
		
		buffer.strokeStyle = "rgb(255, 255, 255)";
		buffer.fillStyle = "rgb(255, 255, 255)";
		buffer.font = "bold 25px sans-serif";
		
		gameManager.spriteManager.gameSprite.addEventListener('load', function () {
			global.gameManager.gameStage = 0;
			global.gameManager.xNumTiles = 23;//_canvas.width/global.gameManager.tileWidth;
			global.gameManager.yNumTiles = 24;//_canvas.height/global.gameManager.tileHeight;
			global.gameManager.tileWidth = _canvas.width/global.gameManager.xNumTiles;
			global.gameManager.tileHeight = _canvas.height/global.gameManager.yNumTiles;
			global.gameManager.food = new Food();
			global.gameManager.food.Init();
			global.gameManager.snake = new Snake(global.snakeSpeed);
			global.gameManager.eventHandler = new EventHandler();
			global.gameManager.mazes = new Maze();
			global.gameManager.waitingForInput = true;
			
			global.gameManager.gameState = global.GameState.WELCOME;
			global.gameManager.startLoop();
		}, false);
	}
	
	this.resizeGame = function() {
		var gameArea = document.getElementById('gameArea');
		var widthToHeight = 4 / 3;
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;
		var newWidthToHeight = newWidth / newHeight;
		
		if (newWidthToHeight > widthToHeight) {
			newWidth = newHeight * widthToHeight;
			gameArea.style.height = newHeight + 'px';
			gameArea.style.width = newWidth + 'px';
		} else {
			newHeight = newWidth / widthToHeight;
			gameArea.style.width = newWidth + 'px';
			gameArea.style.height = newHeight + 'px';
		}
		
		gameArea.style.marginTop = (-newHeight / 2) + 'px';
		gameArea.style.marginLeft = (-newWidth / 2) + 'px';
		
		var gameCanvas = document.getElementById('gameCanvas');
		gameCanvas.width = newWidth;
		gameCanvas.height = newHeight;

		global.gameManager.tileWidth = gameCanvas.width/global.gameManager.xNumTiles;
		global.gameManager.tileHeight = gameCanvas.height/global.gameManager.yNumTiles;
		
	}

	this.Update = function() {
		if(global.gameManager.windowHeight != window.innerWidth || global.gameManager.windowWidth != window.innerHeight){
			global.gameManager.windowHeight = window.innerHeight;
			global.gameManager.windowWidth = window.innerWidth;
		
			this.resizeGame();
			var gameCanvas = document.getElementById('gameCanvas');
			_buffer.width = gameCanvas.width;
			_buffer.height = gameCanvas.height;
		}

		switch(global.gameManager.gameState){
			case global.GameState.RUNNING:
				global.gameManager.food.update();
				global.gameManager.snake.update();
				if(global.gameManager.snake.isCollision() || global.gameManager.mazes.isCollision())
					global.gameManager.stopLoop();
				break;
			case global.GameState.WELCOME:
				break;
		}
	}
	
	this.Draw = function() {
		buffer.clearRect(0, 0, _buffer.width, _buffer.height);
		canvas.clearRect(0, 0, _buffer.width, _buffer.height);

		buffer.drawImage(gameManager.spriteManager.bgGameSprite, 0, 0, _buffer.width, _buffer.height);

		switch(global.gameManager.gameState){
			case global.GameState.RUNNING:
			case global.GameState.PAUSED:
				//Draw SnakeHead
				global.gameManager.snake.draw(buffer);				
				//Draw Maze: mazes draw the maze corresponding to the gameStage
				global.gameManager.mazes.draw(buffer, global.gameManager.gameStage);
				global.gameManager.food.draw(buffer);
				break;
			case global.GameState.STOPPED:
				//TODO: if(gameStoppedSince < animationTimeDuration){
					//TODO: draw game over animation
					//break;
				//}
				//welcome screen background image
				gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.BG_WELCOME);
				//logo
				gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.LOGO);
				//play again btn
				gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.PLAY_AGAIN);
				break;
			case global.GameState.WELCOME: //8 0 to 277 176
				//welcome screen background image
				gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.BG_WELCOME);
				//logo
				gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.LOGO);
				//play btn
				gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.PLAY);
				break;
		}
		canvas.drawImage(_buffer, 0, 0);

	}
	
	this.Loop = function() {
		if(self.gameState == global.GameState.RUNNING){
			if(global.gameManager.snake.speedCounter==0) {
				self.Update();
				self.Draw();
				global.gameManager.waitingForInput = true;
			}
			++(global.gameManager.snake.speedCounter);
			if(global.gameManager.snake.speedCounter >= global.gameManager.snake.speed)
				global.gameManager.snake.speedCounter = 0;
		}else if(self.gameState == global.GameState.WELCOME){
			self.Update();
			self.Draw();
			global.gameManager.waitingForInput = true;
		}
		window.requestAnimFrame(self.Loop);
	}

	this.pauseToggle = function() {
		if(global.gameManager.gameState == global.GameState.RUNNING)
			self.gameState = global.GameState.PAUSED;
		else if(global.gameManager.gameState == global.GameState.PAUSED)
			self.gameState = global.GameState.RUNNING;
	}

	this.startLoop = function() {	
		if(self.gameState == global.GameState.STOPPED){
			self.gameState = global.GameState.RUNNING;
			self.Loop();
		}
		else if(self.gameState == global.GameState.WELCOME)
			self.Loop();
	}
	this.stopLoop = function() {
		self.gameState = global.GameState.STOPPED;
	}
	
}