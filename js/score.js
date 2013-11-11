
var Score = function() {
	this.score = new Number(0);
	this.posX = 40;
	this.posY = 40;
	this.multiplier = 1;
	this.multiplierBuildup = 0;
	this.timer = 0.1*1000;
};


Score.prototype.update = function( elapsed ) {
	this.multiplierBuildup -= elapsed/60*Math.sqrt(this.multiplier);
	if ( this.multiplierBuildup < 0 ) {
		this.multiplierBuildup = 0;
		if ( this.multiplier > 1 ) {
			this.multiplierBuildup = 100;
			this.multiplier -= Math.ceil( this.multiplier/5 );
			this.multiplierBuildup = 900;
		}
	}
	
	
	this.timer -= elapsed;
};

Score.prototype.addScore = function( points ) {
	this.score += points*this.multiplier;
	this.multiplierBuildup += points*9/Math.sqrt(this.multiplier);
	if( this.multiplierBuildup > 1000 ) {
		this.multiplier ++;
		this.multiplierBuildup = 100;
	}
};

Score.prototype.drawScore = function(display) {
	var scoreString = this.score.toString();
	display.blit((new gamejs.font.Font('30px Sans-serif')).render( scoreString), new gamejs.Rect([this.posX+80,this.posY]));
};

Score.prototype.draw = function(display) {

	var scoreString = '';
	scoreString = "x " + this.multiplier.toString();
	draw.circle(display, '#ff0000', [this.posX+35,this.posY+20],1+ 29*(this.multiplierBuildup/1000), 0);
	draw.circle(display, '#ff0000', [this.posX+35,this.posY+20], 30, 10);
	display.blit((new gamejs.font.Font('20px Sans-serif')).render( scoreString), new gamejs.Rect([this.posX+18,this.posY+5]));
	scoreString = this.score.toString();
	display.blit((new gamejs.font.Font('30px Sans-serif')).render( scoreString), new gamejs.Rect([this.posX+80,this.posY]));
	
	var total = Math.ceil( this.timer/1000 );
	var min = Math.floor(total/60);
	var sec = total % 60;
	
	if( min < 10 ) {
		min = "0"+min.toString();
	} else {
		min = min.toString();
	}
	
	if( sec < 10 ) {
		sec = "0"+sec.toString();
	} else {
		sec = sec.toString();
	}
	
	
	scoreString = min + ":" + sec;
	display.blit((new gamejs.font.Font('30px Sans-serif')).render( scoreString), new gamejs.Rect([this.posX+18,this.posY+60]));
	
};