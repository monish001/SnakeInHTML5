/*
 * Author: monish.gupta1@gmail.com
 * File: Maze.js
 */
/*
 * Template for creating objects of Maze
 */
function Maze() {

	//Data: Brick image starting co-ordinates in sprite image
	this.xBrickSprite = global.gameManager.tileWidth*1;
	this.yBrickSprite = global.gameManager.tileHeight*1;
	
	var self = this;
	this.mazes = new Array();
	this.mazes[0] = new Object();
	this.mazes[0].xBricks = new Array(8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
								 9,10,11,12,13,14,15,16,
								17,17,17,17,17,17,17,17,17,17);//32 *24
	this.mazes[0].yBricks = new Array(7, 8, 9,10,11,12,13,14,15,16,
								16,16,16,16,16,16,16,16,
								16,15,14,13,12,11,10, 9, 8, 7);

	/*
	 * draw(buffer, gameStage) draws the maze for given gameStage to the buffer
	 */
	this.draw = function (buffer, gameStage){
		for(var brick=0; brick<self.mazes[gameStage].xBricks.length; brick++)
			buffer.drawImage(global.imageSprite, 
				self.xBrickSprite, self.yBrickSprite, 
				global.gameManager.tileWidth,global.gameManager.tileHeight, 
				self.mazes[gameStage].xBricks[brick] * global.gameManager.tileWidth, self.mazes[gameStage].yBricks[brick] * global.gameManager.tileHeight, 
				global.gameManager.tileWidth,global.gameManager.tileHeight
			);
	}

	/*
	 * function checks whether snake head is overlapping with maze bricks and updates gameState flag
	 */
	this.isCollision = function(){
		var xBricks = self.mazes[global.gameManager.gameStage].xBricks;
		var yBricks = self.mazes[global.gameManager.gameStage].yBricks;
		var xSnakeHead = global.gameManager.snake.xSnakeBodyCanvas[0];
		var ySnakeHead = global.gameManager.snake.ySnakeBodyCanvas[0];
		
		for(var index=0; index<xBricks.length; index++){
			var xBrick = xBricks[index]*global.gameManager.tileWidth;
			var yBrick = yBricks[index]*global.gameManager.tileHeight;
			if(xSnakeHead == xBrick && ySnakeHead == yBrick){
				return true;
			}
		}
		return false;
	}
	
}
