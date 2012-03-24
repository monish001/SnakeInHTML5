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
	this.speedCounter = null;

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
	
	//function to update move of snake in data structure
	this.move = function() {
	}
}
