var _canvas = null;
var _buffer = null;
var canvas = null;
var buffer = null;
function Snake(){
	//data structure for information of each pixel of snake
	//init function for snake
	
	//function to update move of snake
}
function SnakeBoard(){
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
	var board = new SnakeBoard();
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
			//buffer.drawImage(board.drawMaze());
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