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
var Game = function () {
	var count = 1;
	var self = this;
	var isPlaying = null;
	this.init = function () {
		self.isPlaying = true;
		self.loop();
	}
	this.loop = function () {
		debugger;
		if(self.isPlaying){
			//draw and update
			count++;
			window.requestAnimFrame(self.loop);
		}
	}
}