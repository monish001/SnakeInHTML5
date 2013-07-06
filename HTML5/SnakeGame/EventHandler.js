/*
 * Author: monish.gupta1@gmail.com
 * File: EventHandler.js
 */
var Keys = {
	BACKSPACE:8,
	TAB:9,	ENTER:13,
	SHIFT:16,
	CTRL:17,
	ALT:18,
	CAPS_LOCK:20,
	ESCAPE:27,
	PAGE_UP:33,
	SPACE:32,
	PAGE_DOWN:34,
	END:35,
	HOME:36,
	ARROW_LEFT:37,
	ARROW_UP:38,
	ARROW_RIGHT:39,
	ARROW_DOWN:40,
	PRINT_SCREEN:44,
	INSERT:45,
	DELETE:46,
	NUM_0:48,
	NUM_1:49,
	NUM_2:50,
	NUM_3:51,
	NUM_4:52,
	NUM_5:53,
	NUM_6:54,
	NUM_7:55,
	NUM_8:56,
	NUM_9:57,
	A:65,
	B:66,
	C:67,
	D:68,
	E:69,
	F:70,
	G:71,
	H:72,
	I:73,
	J:74,
	K:75,
	L:76,
	M:77,
	N:78,
	O:79,
	P:80,
	Q:81,
	R:82,
	S:83,
	T:84,
	U:85,
	V:86,
	W:87,
	X:88,
	Y:89,
	Z:90,
	NUMPAD_0:96,
	NUMPAD_1:97,
	NUMPAD_2:98,
	NUMPAD_3:99,
	NUMPAD_4:100,
	NUMPAD_5:101,
	NUMPAD_6:102,
	NUMPAD_7:103,
	NUMPAD_8:104,
	NUMPAD_9:105,
	MULTIPLY:106,
	ADD:107,
	SUBTRACT:109,
	DECIMAL:110,
	DIVIDE:111,
	F1:112,
	F2:113,
	F3:114,
	F4:115,
	F5:116,
	F6:117,
	F7:118,
	F8:119,
	F9:120,
	F10:121,
	F11:122,
	F12:123,
	SEMI_COLON:186,
	EQUAL_SIGN:187,
	COMMA:188,
	DASH:189,
	PERIOD:190,
	FORWARD_SLASH:191,
	OPEN_BRACKET:219,
	BACK_SLASH:220,
	CLOSE_BRAKET:221,
	SINGLE_QUOTE:222
};

/*
 * Template for creating objects of EventHandler
 */
function EventHandler() {
	var self = this;

	//function to handle keyDownEvent
	this.keyCheck = function(event){
		//alert("Event triggered");
		var keyID = event.keyCode;
		if(global.gameManager.isPlaying && global.gameManager.waiting)
		switch(keyID){
			case Keys.ARROW_LEFT:
				//alert("arrow left pressed");
				if(global.gameManager.snake.direction != "Left" && global.gameManager.snake.direction != "Right"){
					global.gameManager.snake.setDirection("Left");
					global.gameManager.waiting = false;
				}
				break;
			case Keys.ARROW_UP:
				//alert("arrow up pressed");
				if(global.gameManager.snake.direction != "Up" && global.gameManager.snake.direction != "Down"){
					global.gameManager.snake.setDirection("Up");
					global.gameManager.waiting = false;
				}
				break;
			case Keys.ARROW_RIGHT:
				//alert("arrow right pressed");
				if(global.gameManager.snake.direction != "Right" && global.gameManager.snake.direction != "Left"){
					global.gameManager.snake.setDirection("Right");
					global.gameManager.waiting = false;
				}
				break;	
			case Keys.ARROW_DOWN:
				//alert("arrow down pressed");
				if(global.gameManager.snake.direction != "Down" && global.gameManager.snake.direction != "Up"){
					global.gameManager.snake.setDirection("Down");
					global.gameManager.waiting = false;
				}
				break;
			case Keys.P:
				self.pause();
				break;
		} else
			global.gameManager.startLoop();
	}

	this.pause = function() {
		if(global.gameManager.isPlaying)
			global.gameManager.stopLoop();
		else
			global.gameManager.startLoop();
	}
	window.addEventListener('keydown', self.keyCheck, true);
	//_canvas.addEventListener('click', self.keyCheck, false);
}
