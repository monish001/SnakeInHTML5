/*
 * Author: monish.gupta1@gmail.com
 * File: Snake.js
 */
/*
 * Template for creating objects of Snake
 */
function Snake() {
	var self = this;
	
	this.speed = null;
	this.speedCounter = 0;

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
				self.xSnakeHeadSprite = global.gameManager.tileWidth * 3;
				break;
			case "Right":
				self.direction = "Right";
				self.xSnakeHeadSprite = global.gameManager.tileWidth * 1;
				break;
			case "Up":
				self.direction = "Up";
				self.xSnakeHeadSprite = 0;
				break;
			case "Down":
				self.direction = "Down";
				self.xSnakeHeadSprite = global.gameManager.tileWidth * 2;
				break;
		}
	}
	
	//function to set speed
	this.setSpeed = function  (num) {
		self.speed = num;
	}
	
	//function init for snake
	this.Init = function(){
		self.xSnakeHeadCanvas = 50;
		self.ySnakeHeadCanvas = 50;
		self.ySnakeHeadSprite = 0;
		self.setDirection("NOT_DEFINED");
	}
	
	//function checks whether snake head is overlapping with snake body and updates isPlaying flag
	this.checkCollision = function(){
	}
	
	//function to update move of snake in data structure
	this.move = function() {
		if(!global.gameManager.isPlaying)
			return;
		switch(self.direction){
			case "Left":
				self.xSnakeHeadCanvas -= global.gameManager.tileWidth;
				if(self.xSnakeHeadCanvas < 0)
					self.xSnakeHeadCanvas += _canvas.width;
				break;
			case "Right":
				self.xSnakeHeadCanvas += global.gameManager.tileWidth;
				if(self.xSnakeHeadCanvas >= _canvas.width)
					self.xSnakeHeadCanvas -= _canvas.width;
				break;
			case "Up":
				self.ySnakeHeadCanvas -= global.gameManager.tileHeight;
				if(self.ySnakeHeadCanvas < 0)
					self.ySnakeHeadCanvas += _canvas.height;
				break;
			case "Down":
				self.ySnakeHeadCanvas += global.gameManager.tileHeight;
				if(self.ySnakeHeadCanvas >= _canvas.height)
					self.ySnakeHeadCanvas -= _canvas.height;
				break;
		}
	}
	
}
