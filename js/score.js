
var Score = function() {
	this.score = new Number(0);
	this.posX = 40;
	this.posY = 40;
	this.multiplier = 13;
	this.multiplierBuildup = 0;
	this.lives = 5;
	this.image = gamejs.image.load('img/lives.png');
}


Score.prototype.update = function( elapsed ) {
	this.multiplierBuildup -= elapsed/10;
	if ( this.multiplierBuildup < 0 ) {
		this.multiplierBuildup = 0;
		if ( this.multiplier > 1 ) {
			this.multiplierBuildup = 100;
			this.multiplier -= Math.ceil( this.multiplier/5 );
			this.multiplierBuildup = 900;
		}
	}
};



Score.prototype.loseLife = function() {
	this.lives --;
};

Score.prototype.continuePlaying = function() {
	if  ( this.lives > 0 ) {
		return true;
	}
	
	return false;
};

Score.prototype.addScore = function( points ) {
	this.score += points*this.multiplier;
	this.multiplierBuildup += points;
	if( this.multiplierBuildup > 1000 ) {
		this.multiplier ++;
		this.multiplierBuildup = 100;
	}
};

Score.prototype.draw = function(display) {
	var scoreString = '';
	scoreString = "x " + this.multiplier.toString();
	draw.circle(display, '#ff0000', [this.posX+35,this.posY+20],1+ 29*(this.multiplierBuildup/1000), 0);
	draw.circle(display, '#ff0000', [this.posX+35,this.posY+20], 30, 10);
	display.blit((new gamejs.font.Font('20px Sans-serif')).render( scoreString), new gamejs.Rect([this.posX+18,this.posY+5]));
	scoreString = this.score.toString();
	display.blit((new gamejs.font.Font('30px Sans-serif')).render( scoreString), new gamejs.Rect([this.posX+80,this.posY]));
	for ( var i = 0 ; i < this.lives ; i++ ) {
		display.blit(this.image, new gamejs.Rect([this.posX+20*i,this.posY+40]));
		//display.blit(this.image, new gamejs.Rect([this.posX+20*i,this.posY+40]);
	}
};
