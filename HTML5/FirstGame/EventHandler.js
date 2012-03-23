/*
 * Template for creating objects of EventHandler
 * Author: monish.gupta1@gmail.com
 */
function EventHandler() {
	//function to handle keyDownEvent
	this.keyCheck = function(event){
		//alert("Event triggered");
		var keyID = event.keyCode;
		switch(keyID){
			case Keys.ARROW_LEFT:
				//alert("arrow left pressed");
				if(global.snake.direction != "Left")
					global.snake.setDirection("Left");
				break;
			case Keys.ARROW_UP:
				//alert("arrow up pressed");
				if(global.snake.direction != "Up")
					global.snake.setDirection("Up");
				break;
			case Keys.ARROW_RIGHT:
				//alert("arrow right pressed");
				if(global.snake.direction != "Right")
					global.snake.setDirection("Right");
				break;
			case Keys.ARROW_DOWN:
				//alert("arrow down pressed");
				if(global.snake.direction != "Down")
					global.snake.setDirection("Down");
				break;
		}
	}	
}
