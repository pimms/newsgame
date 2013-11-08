var gamejs = require('gamejs');
var draw = require('gamejs/draw');

gamejs.preload([]);


var Score = function() {
	this.score = new Number(0);
	this.posX = 40;
	this.posY = 40;
	this.multiplier = 100;
	this.multiplierBuildup = 0;
}


Score.prototype.update = function( elapsed ) {
	this.multiplierBuildup -= elapsed/10;
	if ( this.multiplierBuildup < 0 ) {
		this.multiplierBuildup = 100;
		if ( this.multiplier > 1 ) {
			this.multiplier -= Math.ceil( this.multiplier/5 );
			this.multiplierBuildup = 900;
		}
	}
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
	scoreString = "x " + this.multiplier.toString() + '   ';
	scoreString += this.score.toString();
	draw.circle(display, '#ff0000', [this.posX+35,this.posY+20],1+ 29*(this.multiplierBuildup/1000), 0);
	
	draw.circle(display, '#ff0000', [this.posX+35,this.posY+20], 30, 10);
	
	display.blit((new gamejs.font.Font('30px Sans-serif')).render( scoreString), new gamejs.Rect([this.posX,this.posY]));
};
