window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var _canvas = null;
var _buffer = null;
var canvas = null;
var buffer = null;

var LoadingAnim = function() {
	var self = this;
	var loadingImage = null;
	
	this.update = function() {
		if(loadingImage == null)
			loadingImage = new Image();
			//loadingImage.src = 'loading.gif';
			loadingImage.src = 'loading.png';
			//loadingImage.src = 'loading.jpg';
	}
	this.draw = function(buffer) {
	debugger;
		var millisecs = new Date().getTime();
		buffer.save();
		buffer.translate(26,26);
		buffer.rotate(parseInt((millisecs/10)%360) * Math.PI/180);
		buffer.translate(-26,-26);
		buffer.drawImage(loadingImage, 10, 10);//, 32, 32, 0, 0, 32, 32);
		buffer.restore();
	}
}

var Game = function () {
	var self = this;
	var isPlaying = null;
	var frame = null;
	var loadingAnim = null;
	this.init = function() {
		_canvas = document.getElementById('bgCanvas');
		if (_canvas && _canvas.getContext) {
			_canvas.style.backgroundColor= "#008888";
			canvas = _canvas.getContext('2d');
			
			_buffer = document.createElement('canvas');
			_buffer.width = _canvas.width;
			_buffer.height = _canvas.height;
			buffer = _buffer.getContext('2d');
			
			//buffer.strokeStyle = "rgb(255, 255, 255)";
			buffer.fillStyle = "rgb(255, 255, 255)";
			//buffer.font = "bold 25px sans-serif";

			self.loadingAnim = new LoadingAnim();
			self.isPlaying = true;
			self.loop();
		}
	}
	this.update = function() {
		self.loadingAnim.update();
	}
	this.draw = function() {
		buffer.clearRect(0, 0, _buffer.width, _buffer.height);
		canvas.clearRect(0, 0, _canvas.width, _canvas.height);
		
		//Draw loading animation
		self.loadingAnim.draw(buffer);

		canvas.drawImage(_buffer, 0, 0);	
	}
	this.loop = function () {
		//debugger;
		if(self.isPlaying){
			self.update();
			self.draw();
			window.requestAnimFrame(self.loop);
		}
	}
}