/*
 * Author: monish.gupta1@gmail.com
 * Scope of SNAKE VERSION 1.0 (pathBricks and SnakeHead added)
 *	1. There is only snakeHead, no snakeTail is present. SnakeHead is extensible to facilitate addition of tail feature of given length in the later versions.
 *  2. There are only pathBricks present.
 *  3. Depending on the user input which is given via arrowKeys, the snakeHead changes position on the canvas. 
 *     It can go through the walls to comeup from the other side.
 *	4. Depending on the location of the last pathBrick the snakeHead has traversed(NWES), it's head would be shown as directed to the corresponding direction.
 *  
 * Scope of SNAKE VERSION 1.1 (1 Maze added)
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

var _canvas = null;
var _buffer = null;
var canvas = null;
var buffer = null;
var Keys = {
	ARROW_LEFT: 37,
	ARROW_UP: 38,
	ARROW_RIGHT: 39,
	ARROW_DOWN: 40
};

function Snake() {
	var self = this;
	//Data: snakeHead sprite
	this.snakeHeadSprite = null;	
	//Data: snakeHead's position on canvas
	this.xSnakeHeadCanvas = 0;
	this.ySnakeHeadCanvas = 0;

	//Data: snakeHead's Prev position on canvas, used for finding direction of movement.
	this.direction = null;
	this.xSnakeHeadSprite = null;
	this.ySnakeHeadSprite = null;
	
	//function to update direction and sprite
	this.setDirection = function(str) {
		switch(str){
			case "Left":
				self.direction = "Left";
				self.xSnakeHeadSprite = 75;
				break;
			case "Right":
				self.direction = "Right";
				self.xSnakeHeadSprite = 25;
				break;
			case "Up":
				self.direction = "Up";
				self.xSnakeHeadSprite = 0;
				break;
			case "Down":
				self.direction = "Down";
				self.xSnakeHeadSprite = 50;
				break;
		}
	}
	
	//function init for snake
	this.Init = function(){
		self.xSnakeHeadCanvas = 50;
		self.ySnakeHeadCanvas = 50;
		self.ySnakeHeadSprite = 0;
		self.setDirection("Right");
	}
	
	//function to handle keyDownEvent
	this.keyCheck = function(event){
		//alert("Event triggered");
		var keyID = event.keyCode;
		switch(keyID){
			case Keys.ARROW_LEFT:
				alert("arrow left pressed");
				self.xSnakeHeadCanvas -= 25;
				if(self.xSnakeHeadCanvas < 0)
					self.xSnakeHeadCanvas += _canvas.width;
				if(self.direction != "Left")
					self.setDirection("Left");
				break;
			case Keys.ARROW_UP:
				alert("arrow up pressed");
				self.ySnakeHeadCanvas -= 25;
				if(self.ySnakeHeadCanvas < 0)
					self.ySnakeHeadCanvas += _canvas.height;
				if(self.direction != "Up")
					self.setDirection("Up");
				break;
			case Keys.ARROW_RIGHT:
				alert("arrow right pressed");
				self.xSnakeHeadCanvas += 25;
				if(self.xSnakeHeadCanvas >= _canvas.width)
					self.xSnakeHeadCanvas -= _canvas.width;
				if(self.direction != "Right")
					self.setDirection("Right");
				break;
			case Keys.ARROW_DOWN:
				alert("arrow down pressed");
				self.ySnakeHeadCanvas += 25;
				if(self.ySnakeHeadCanvas > _canvas.height)
					self.ySnakeHeadCanvas -= _canvas.height;
				if(self.direction != "Down")
					self.setDirection("Down");
				break;
		}
	}
	//function to update move of snake in data structure
	this.move = function() {
	}
}

function Game() {
	var isPlaying = false;
	var requestAnimFrame = 	window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.msRequestAnimationFrame ||
							window.oRequestAnimationFrame;
	debugger;
	var self = this;
	var snake = null;
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
			
			self.snake = new Snake();

			window.addEventListener('keydown', self.snake.keyCheck, true);
			//_canvas.addEventListener('click', self.snake.keyCheck, false);
			
			self.snake.snakeHeadSprite = new Image();
			self.snake.snakeHeadSprite.src = 'SnakeHead.png';
			self.snake.snakeHeadSprite.addEventListener('load', self.snake.Init, false); 

		}
	}
	
	this.startLoop = function() {	
		self.isPlaying = true;
		self.Loop();
			
	}
	this.stopLoop = function() {
		self.isPlaying = false;
	}
	
	this.Update = function() {
		// Update Objects
	}
	
	this.Draw = function() {
		buffer.clearRect(0, 0, _buffer.width, _buffer.height);
		canvas.clearRect(0, 0, _canvas.width, _canvas.height);
		
		//Draw Code
		buffer.drawImage(self.snake.snakeHeadSprite, self.snake.xSnakeHeadSprite, self.snake.ySnakeHeadSprite, 25,25, self.snake.xSnakeHeadCanvas, self.snake.ySnakeHeadCanvas, 25,25);
		
		canvas.drawImage(_buffer, 0, 0);

	}
	
	this.Loop = function() {
		if(self.isPlaying){
			self.Update();
			self.Draw();
			self.requestAnimFrame(self.Loop);
		}
	}
}