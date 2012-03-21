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
 * Scope for SNAKE VERSION 1.6 (power food pluggable feature)
 *  
 */

var _canvas = null;
var _buffer = null;
var canvas = null;
var buffer = null;
function Snake(){
	//data structure for information of each pixel of snake
	//ds for direction of snake
	//init function for snake
	
	//function to update move of snake
}
function Maze(){
	//INFO: board is 800X600 pixels
	
	//data structure for maze information
	//function drawMaze() to generate maze and returns a canvas/image
	
	//make a snake object
	
	//function to accept input
		//check if move is possible (that is, not colliding into the maze or out of canvas
		//and reflect move into snake's datastruture
}
function Game(){
	this.gameLoop = null;
	var self = this;
	var maze = new Maze();
	this.Init = function(){
		_canvas = document.getElementById('canvas');
		if (_canvas && _canvas.getContext){
			canvas = _canvas.getContext('2d');
			
			_buffer = document.createElement('canvas');
			_buffer.width = _canvas.width;
			_buffer.height = _canvas.height;
			buffer = _buffer.getContext('2d');
			
			buffer.strokeStyle = "rgb(255, 255, 255)";
			buffer.fillStyle = "rgb(255, 255, 255)";
			buffer.font = "bold 25px sans-serif";
			//buffer.drawImage(maze.drawMaze(), 0, 0);
		}
	}
	
	this.Run = function(){		
		if(canvas != null){
			self.gameLoop = setInterval(self.Loop, 50);
		}
			
	}
	
	this.Update = function(){
		// Update Objects
	}
	
	this.Draw = function(){
		buffer.clearRect(0, 0, _buffer.width, _buffer.height);
		canvas.clearRect(0, 0, _canvas.width, _canvas.height);
		
		//Draw Code
		
		canvas.drawImage(_buffer, 0, 0);

	}
	
	this.Loop = function(){
		//alert(r);
		self.Update();
		self.Draw();	
	}
}