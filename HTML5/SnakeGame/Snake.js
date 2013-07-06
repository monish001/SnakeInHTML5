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

	//Data: snake body x and y co-ordinates. 0 index is head
	this.xSnakeBodyCanvas = null
	this.ySnakeBodyCanvas = null

	//Data: snakeHead's Prev position on canvas, used for finding direction of movement.
	this.direction = null;

	this.xSnakeHeadSprite = null;
	this.ySnakeHeadSprite = null;
	this.xSnakeBodySprite = null;
	this.ySnakeBodySprite = null;

	//function to update direction and sprite
	this.setDirection = function(str) {
		switch(str){
			case global.Direction.LEFT:
				self.direction = global.Direction.LEFT;
				self.xSnakeHeadSprite = global.gameManager.tileWidth * 3;
				break;
			case global.Direction.RIGHT:
				self.direction = global.Direction.RIGHT;
				self.xSnakeHeadSprite = global.gameManager.tileWidth * 1;
				break;
			case global.Direction.UP:
				self.direction = global.Direction.UP;
				self.xSnakeHeadSprite = 0;
				break;
			case global.Direction.DOWN:
				self.direction = global.Direction.DOWN;
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
		self.xSnakeBodyCanvas = new Array(50,75,100);
		self.ySnakeBodyCanvas = new Array(50,50, 50);
		//self.xSnakeHeadSprite = 0; NOT DEFINED as it depends on direction
		//self.ySnakeHeadSprite = 0; -same-
		self.xSnakeBodySprite = global.gameManager.tileWidth * 2;
		self.ySnakeBodySprite = global.gameManager.tileHeight * 1;
		self.setDirection(global.Direction.NOT_DEFINED);
	}
	
	this.draw = function(buffer){
		buffer.drawImage(
			global.imageSprite, 
			global.gameManager.snake.xSnakeHeadSprite, global.gameManager.snake.ySnakeHeadSprite, 
			global.gameManager.tileWidth,global.gameManager.tileHeight, 
			global.gameManager.snake.xSnakeBodyCanvas[0], global.gameManager.snake.ySnakeBodyCanvas[0], 
			global.gameManager.tileWidth,global.gameManager.tileHeight
		);
		for(var bodyPart = 1; bodyPart<self.xSnakeBodyCanvas.length; bodyPart++){
			buffer.drawImage(
				global.imageSprite, 
				global.gameManager.snake.xSnakeBodySprite, global.gameManager.snake.ySnakeBodySprite, 
				global.gameManager.tileWidth,global.gameManager.tileHeight, 
				global.gameManager.snake.xSnakeBodyCanvas[bodyPart], global.gameManager.snake.ySnakeBodyCanvas[bodyPart], 
				global.gameManager.tileWidth,global.gameManager.tileHeight
			);
		}
	}
	
	//function checks whether snake head is overlapping with snake body and updates isPlaying flag
	this.checkCollision = function(){
	}

	
	//function to update move of snake in data structure
	this.update = function() {
		if(!global.gameManager.isPlaying)
			return;
		for(var bodyPart = self.xSnakeBodyCanvas.length-1; bodyPart>0; bodyPart--){
			self.xSnakeBodyCanvas[bodyPart] = self.xSnakeBodyCanvas[bodyPart-1];
			self.ySnakeBodyCanvas[bodyPart] = self.ySnakeBodyCanvas[bodyPart-1];
		}
		switch(self.direction){
			case global.Direction.LEFT:
				self.xSnakeBodyCanvas[0] -= global.gameManager.tileWidth;
				if(self.xSnakeBodyCanvas[0] < 0)
					self.xSnakeBodyCanvas[0] += _canvas.width;
				break;
			case global.Direction.RIGHT:
				self.xSnakeBodyCanvas[0] += global.gameManager.tileWidth;
				if(self.xSnakeBodyCanvas[0] >= _canvas.width)
					self.xSnakeBodyCanvas[0] -= _canvas.width;
				break;
			case global.Direction.UP:
				self.ySnakeBodyCanvas[0] -= global.gameManager.tileHeight;
				if(self.ySnakeBodyCanvas[0] < 0)
					self.ySnakeBodyCanvas[0] += _canvas.height;
				break;
			case global.Direction.DOWN:
				self.ySnakeBodyCanvas[0] += global.gameManager.tileHeight;
				if(self.ySnakeBodyCanvas[0] >= _canvas.height)
					self.ySnakeBodyCanvas[0] -= _canvas.height;
				break;
		}
	}
	
}
