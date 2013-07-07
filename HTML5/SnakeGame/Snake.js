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
	this.foodPosition = null;
	
	//Data: This is food queue in process of digestion and will contribute in length increase when reached at tail.
	this.xFoodCanavas = null;
	this.yFoodCanavas = null;

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
		self.xSnakeHeadSprite = global.gameManager.tileWidth * 3;
		self.ySnakeHeadSprite = global.gameManager.tileHeight * 0;
		self.xSnakeBodySprite = global.gameManager.tileWidth * 2;
		self.ySnakeBodySprite = global.gameManager.tileHeight * 1;
		self.foodPosition = new Array(false, false, false);
		self.setDirection(global.Direction.LEFT);
	}
	
	this.draw = function(buffer){
		buffer.drawImage(
			global.imageSprite, 
			self.xSnakeHeadSprite, self.ySnakeHeadSprite, 
			global.gameManager.tileWidth,global.gameManager.tileHeight, 
			self.xSnakeBodyCanvas[0], self.ySnakeBodyCanvas[0], 
			global.gameManager.tileWidth,global.gameManager.tileHeight
		);
		for(var bodyPart = 1; bodyPart<self.xSnakeBodyCanvas.length; bodyPart++){
			buffer.drawImage(
				global.imageSprite, 
				self.xSnakeBodySprite, self.ySnakeBodySprite, 
				global.gameManager.tileWidth,global.gameManager.tileHeight, 
				self.xSnakeBodyCanvas[bodyPart], self.ySnakeBodyCanvas[bodyPart], 
				global.gameManager.tileWidth,global.gameManager.tileHeight
			);
		}
	}
	
	//function checks whether snake head is overlapping with snake body and updates gameState flag
	this.isCollision = function(){
		return false;
	}

	this.eatFood = function(x,y){
		self.foodPosition[0] = true;
	}
	
	//function to update move of snake in data structure
	this.update = function() {
		if(global.gameManager.gameState != global.GameState.RUNNING)
			return;
		var isFoodAtTail = self.foodPosition[self.foodPosition.length-1];
		//required if above flag is true
		var xTailPart = self.xSnakeBodyCanvas[self.xSnakeBodyCanvas.length-1];
		var yTailPart = self.ySnakeBodyCanvas[self.ySnakeBodyCanvas.length-1];

		for(var bodyPart = self.xSnakeBodyCanvas.length-1; bodyPart>0; bodyPart--){
			self.xSnakeBodyCanvas[bodyPart] = self.xSnakeBodyCanvas[bodyPart-1];
			self.ySnakeBodyCanvas[bodyPart] = self.ySnakeBodyCanvas[bodyPart-1];
			self.foodPosition[bodyPart] = self.foodPosition[bodyPart-1];
		}
		if(isFoodAtTail){
			self.foodPosition[self.foodPosition.length] = false;
			self.xSnakeBodyCanvas[self.xSnakeBodyCanvas.length] = xTailPart;
			self.ySnakeBodyCanvas[self.ySnakeBodyCanvas.length] = yTailPart;
		}
		
		self.foodPosition[0] = false;
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
