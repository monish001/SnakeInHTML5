var _canvas = null;
var _buffer = null;
var canvas = null;
var buffer = null;

function Game(){
	this.gameLoop = null;
	var self = this;
	var r=0;
	this.Init = function(){
	//alert("Init called");
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
		}
	}
	
	this.Run = function(){		
		if(canvas != null){
			self.gameLoop = setInterval(self.Loop, 50);
		}
			
	}
	
	this.Update = function(){
		// Update Objects
		r = (r+5);
	}
	
	this.Draw = function(){
		buffer.clearRect(0, 0, _buffer.width, _buffer.height);
		canvas.clearRect(0, 0, _canvas.width, _canvas.height);
		
		//Draw Code
		buffer.fillStyle = "rgb("+r+", 0, 0)";
		debugger;
		buffer.fillRect(5,5,25,25);
		
		canvas.drawImage(_buffer, 0, 0);

	}
	
	this.Loop = function(){
		//alert(r);
		self.Update();
		self.Draw();	
	}
}