/*
 * Author: monish.gupta1@gmail.com
 * File: Food.js
 */

function Food(){
	var self = this;
	this.xFoodCanvas = null;//global.gameManager.xNumTiles * global.gameManager.tileWidth * Math.random();
	this.yFoodCanvas = null;//global.gameManager.yNumTiles * global.gameManager.tileHeight * Math.random();

	this.Init = function(){
		this.xFoodCanvas = parseInt(global.gameManager.xNumTiles * Math.random()) * global.gameManager.tileWidth;
		this.yFoodCanvas = parseInt(global.gameManager.yNumTiles * Math.random()) * global.gameManager.tileHeight;
	}

	this.update = function(){
		var x = self.xFoodCanvas;
		var y = self.yFoodCanvas;
		while(self.isCollidingSnake(x, y) || self.isCollidingMaze(x, y)){
			x = parseInt(global.gameManager.xNumTiles * Math.random()) * global.gameManager.tileWidth;
			y = parseInt(global.gameManager.yNumTiles * Math.random()) * global.gameManager.tileHeight;
		}
		self.xFoodCanvas = x;
		self.yFoodCanvas = y;
	}
	
	this.draw = function(buffer){
		gameManager.spriteManager.draw(buffer, gameManager.spriteManager.ImageId.FOOD, self.xFoodCanvas, self.yFoodCanvas);
	}

	this.isCollidingMaze = function(x, y){
		var maze = global.gameManager.mazes.mazes[global.gameManager.gameStage];
		for(var brick=0; brick<maze.xBricks.length; brick++){
			if(x==maze.xBricks[brick] * global.gameManager.tileWidth && y==maze.yBricks[brick] * global.gameManager.tileHeight)
				return true;
		}
		return false;
	}

	this.isCollidingSnake = function(x, y){
		if(global.gameManager.snake.xSnakeBodyCanvas[0]==x && global.gameManager.snake.ySnakeBodyCanvas[0]==y){
			global.gameManager.snake.eatFood();
			return true;
		}
		return false;
	}
}