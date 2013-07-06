/*
 * Author: monish.gupta1@gmail.com
 * File: Maze.js
 */
/*
 * Template for creating objects of Maze
 */
function Maze() {

	//Data: Brick image starting co-ordinates in sprite image
	this.xBrickSprite = 25;
	this.yBrickSprite = 25*3;
	
	var self = this;
	var mazes = new Array();
	mazes[0] = new Object();
	mazes[0].xBricks = new Array(8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
								 9,10,11,12,13,14,15,16,
								17,17,17,17,17,17,17,17,17,17);//32 *24
	mazes[0].yBricks = new Array(7, 8, 9,10,11,12,13,14,15,16,
								16,16,16,16,16,16,16,16,
								16,15,14,13,12,11,10, 9, 8, 7);

	/*
	 * draw(buffer, gameStage) draws the maze for given gameStage to the buffer
	 */
	this.draw = function (buffer, gameStage){
		for(var brick=0; brick<mazes[gameStage].xBricks.length; brick++)
			buffer.drawImage(global.imageSprite, global.mazes.xBrickSprite, global.mazes.yBrickSprite, 25, 25, mazes[gameStage].xBricks[brick] * 25, mazes[gameStage].yBricks[brick] * 25, 25,25);
	}

	/*
	 * function checks whether snake head is overlapping with maze bricks and updates isPlaying flag
	 */
	this.checkCollision = function(){
		var xBricks = mazes[global.gameStage].xBricks;
		var yBricks = mazes[global.gameStage].yBricks;
		var xSnakeHead = global.snake.xSnakeHeadCanvas;
		var ySnakeHead = global.snake.ySnakeHeadCanvas;
		
		for(var index=0; index<xBricks.length; index++){
			var xBrick = xBricks[index]*25;
			var yBrick = yBricks[index]*25;
			if(xSnakeHead == xBrick && ySnakeHead == yBrick){
				global.gameManager.isPlaying = false;
				break;
			}
		}
	}
	
}
