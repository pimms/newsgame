include_once(["feet.js"]);
var Person = function( id) {
	this.image = gamejs.image.load('img/siv_jensen.png');
	this.id = id;
	this.posX = 200;
	this.posY = 205;
	this.goalX = 50;
	this.goalY = 70;
	this.speed = 100;
	this.searching = false;
	this.scaleF = 0.5 + 0.5*this.posY/100;
	this.imageDims = this.image.getSize();
	this.imageDimsScale = this.imageDims;

	this.feet = new Feet();

}
gamejs.utils.objects.extend(Person, gamejs.sprite.Sprite);

Person.prototype.moveTo = function( x, y) {
	this.searching = true;
	this.goalX = x;
	if ( y < 200 ) {
		y = 200;
	}
	this.goalY = y;
};


Person.prototype.collision = function( person ) { //The function 'collision' that takes a person object as a parameter
	disX = this.posX - person.posX;		//Subtracts this objects x from other objects x
	disY = this.posY - person.posY;		//Same as above but for y
	
	length = Math.sqrt((disX*disX)+(disY*disY)); //Finds the length
	
	if(length < 50 * this.scaleF) {		//If length is less than 10
		return true;					//Collision happened; return true
	}
	return false;						//Collision didn't happen; return false
};

Person.prototype.update = function( elapsed ) {

	this.scaleF = 0.5*0.5 + 0.5*this.posY/100 * 0.5;
	this.imageDims = this.image.getSize();
	this.imageDimsScale = this.image.getSize();
	this.imageDimsScale[0] *= this.scaleF;
	this.imageDimsScale[1] *= this.scaleF;

	this.feet.update(elapsed, this.searching);
	
	if(this.searching) {

		var direction = [this.goalX-this.posX,this.goalY-this.posY];
		var length = direction[0]*direction[0] + direction[1]*direction[1];
		length = Math.sqrt(length);
		if ( length > 10 ) {
			this.posX += this.speed*direction[0]*this.scaleF*elapsed/(1000*length);
			this.posY += this.speed*direction[1]*this.scaleF*elapsed/(1000*length);
		} else {
			this.searching = false;
		}
	}
};


Person.prototype.draw  = function(display) {
	this.rect = new gamejs.Rect([(this.posX-this.imageDimsScale[0]/2),(this.posY-this.imageDimsScale[1])],[this.imageDimsScale[0],this.imageDimsScale[1]]);
	display.blit( this.image, this.rect, new gamejs.Rect([0,0],[this.imageDims[0],this.imageDims[1]]));

	this.feet.draw(display, [this.posX, this.posY], this.imageDims, this.scaleF);
};

