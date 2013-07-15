/*
 * Author: monish.gupta1@gmail.com
 * File: SpriteManager.js
 */
function SpriteManager(){
	this.self = this;
	
	this.gameSprite = new Image();
	this.gameSprite.src = 'images/sprite.png';

	this.bgGameSprite = new Image();
	this.bgGameSprite.src = 'images/pathBrick.png';
//	this.bgGameSprite.src = 'images/Green.jpg';

	this.welcomeSprite = new Image();
	this.welcomeSprite.src = 'images/Welcome.png';
	//play btn //TODO Create class for this (may be in utility.js)
	this.playBtnX = 15;
	this.playBtnY = 179;
	this.playBtnW = 203;
	this.playBtnH = 50;
	this.playBtnCanvasX = 180;
	this.playBtnCanvasY = 350;
	//play again btn
	this.playAgainBtnX = 8;
	this.playAgainBtnY = 230;
	this.playAgainBtnW = this.playBtnW;
	this.playAgainBtnH = this.playBtnH;
	this.playAgainBtnCanvasX = this.playBtnCanvasX;
	this.playAgainBtnCanvasY = this.playBtnCanvasY;
	//logo
	this.logoX = 8;
	this.logoY = 0;
	this.logoW = 269;
	this.logoH = 176;
	this.logoCanvasX = 130;
	this.logoCanvasY = 140;
	
	this.bgWelcomeSprite = new Image();
	this.bgWelcomeSprite.src = 'images/WelcomeBack.png';
	
	this.ImageId = {
		BG_WELCOME:0,
		PLAY:1,
		PLAY_AGAIN:2,
		LOGO:3
	}
	
	this.isPlayAgainBtn = function(x, y){
		if(x >= this.playBtnCanvasX && x< this.playBtnCanvasX + this.playBtnW && y >= this.playBtnCanvasY && y< this.playBtnCanvasY + this.playBtnH)
			return true;
		return false;
	}
	
	this.isPlayBtn = function(x, y){
		if(x >= this.playBtnCanvasX && x< this.playBtnCanvasX + this.playBtnW && y >= this.playBtnCanvasY && y< this.playBtnCanvasY + this.playBtnH)
			return true;
		return false;
	}
	
	this.draw = function(buffer, imageId){
		switch(imageId){
			case this.ImageId.BG_WELCOME:
				buffer.drawImage(gameManager.spriteManager.bgWelcomeSprite, 0, 0, _buffer.width, _buffer.height);
				break;
			case this.ImageId.PLAY:
				buffer.drawImage(global.gameManager.spriteManager.welcomeSprite, 
					this.playBtnX,this.playBtnY,
					this.playBtnW,this.playBtnH,
					this.playBtnCanvasX, this.playBtnCanvasY,
					this.playBtnW,this.playBtnH
				);
				break;
			case this.ImageId.PLAY_AGAIN:
				buffer.drawImage(global.gameManager.spriteManager.welcomeSprite, 
					this.playAgainBtnX,this.playAgainBtnY,
					this.playAgainBtnW,this.playAgainBtnH,
					this.playAgainBtnCanvasX, this.playAgainBtnCanvasY,
					this.playAgainBtnW,this.playAgainBtnH
				);
				break;
			case this.ImageId.LOGO:
				buffer.drawImage(global.gameManager.spriteManager.welcomeSprite, 
					this.logoX,this.logoY,
					this.logoW,this.logoH,
					this.logoCanvasX, this.logoCanvasY,
					this.logoW,this.logoH
				);
				break;
		}
	}
}