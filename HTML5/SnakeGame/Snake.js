/*
 * Author: monish.gupta1@gmail.com
 * File: Snake.js
 */
/*
 * Template for creating objects of Snake
 */
function Snake(speedArg) {
	var self = this;
	
	this.speed = speedArg;
	this.speedCounter = 0;

	//Data: snake body x and y co-ordinates. 0 index is head
	this.xSnakeBodyCanvas = null
	this.ySnakeBodyCanvas = null

	//Data: snakeHead's Prev position on canvas, used for finding direction of movement.
	this.direction = global.Direction.RIGHT;

	this.foodPosition = new Array(false, false, false);//bool to find if the bodyPart has food in it or not.
	
	//Data: This is food queue in process of digestion and will contribute in length increase when reached at tail.
	this.xFoodCanavas = null;
	this.yFoodCanavas = null;

	//function init for snake
	this.xSnakeBodyCanvas = new Array(4,3,2);
	this.ySnakeBodyCanvas = new Array(2,2,2);
	
	//function to update direction and sprite
	this.setDirection = function(str) {
		switch(str){
			case global.Direction.LEFT:
				self.direction = global.Direction.LEFT;
				break;
			case global.Direction.RIGHT:
				self.direction = global.Direction.RIGHT;
				break;
			case global.Direction.UP:
				self.direction = global.Direction.UP;
				break;
			case global.Direction.DOWN:
				self.direction = global.Direction.DOWN;
				break;
		}
	}
	
	//function to set speed
	this.setSpeed = function  (num) {
		self.speed = num;
	}
	
	this.draw = function(buffer){
		for(var bodyPart = 1; bodyPart<self.xSnakeBodyCanvas.length; bodyPart++){
			gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.SNAKE_BODY, 
				self.xSnakeBodyCanvas[bodyPart], self.ySnakeBodyCanvas[bodyPart]
			);
		}
		gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.SNAKE_HEAD, 
			self.xSnakeBodyCanvas[0], self.ySnakeBodyCanvas[0]
		);
	}
	
	//function checks whether snake head is overlapping with snake body and the caller must updates gameState flag
	this.isCollision = function(){
		return false;//TODO
	}

	this.eatFood = function(x,y){
		self.foodPosition[0] = true;
	}
	
	//function to update move of snake in data structure
	this.update = function() {
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
				self.xSnakeBodyCanvas[0] -= 1;
				if(self.xSnakeBodyCanvas[0] < 0)
					self.xSnakeBodyCanvas[0] += global.gameManager.xNumTiles;
				break;
			case global.Direction.RIGHT:
				self.xSnakeBodyCanvas[0] += 1;
				if(self.xSnakeBodyCanvas[0] >= global.gameManager.xNumTiles)
					self.xSnakeBodyCanvas[0] -= global.gameManager.xNumTiles;
				break;
			case global.Direction.UP:
				self.ySnakeBodyCanvas[0] -= 1;
				if(self.ySnakeBodyCanvas[0] < 0)
					self.ySnakeBodyCanvas[0] += global.gameManager.yNumTiles;
				break;
			case global.Direction.DOWN:
				self.ySnakeBodyCanvas[0] += 1;
				if(self.ySnakeBodyCanvas[0] >= global.gameManager.yNumTiles)
					self.ySnakeBodyCanvas[0] -= global.gameManager.yNumTiles;
				break;
		}
	}
	
}
