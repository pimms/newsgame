include_once(["feet.js"]);
var Person = function( id) {
	this.image = gamejs.image.load('img/siv_jensen.png');
	this.id = id;
	this.posX = 0;
	this.posY = 0;
	this.goalX = 50;
	this.goalY = 70;
	this.speed = 100;
	this.searching = false;
	this.scaleF = 0.5 + 0.5*this.posY/100;

	this.feet = new Feet();

	
	this.collision = function(person) { //The function 'collision' that takes a person object as a parameter
	disX = this.posX - person.posX;		//Subtracts this objects x from other objects x
	disY = this.posY - person.posY;		//Same as above but for y
	
	length = Math.sqrt((disX*disX)+(disY*disY)); //Finds the length
	
	if(length < 10) {					//If length is less than 10
		return true;					//Collision happened; return true
	}
	return false;						//Collision didn't happen; return false
}

}
gamejs.utils.objects.extend(Person, gamejs.sprite.Sprite);

Person.prototype.moveTo = function( x, y) {
	this.searching = true;
	this.goalX = x;
	this.goalY = y;
};

Person.prototype.update = function( elapsed ) {

	this.scaleF = 0.5*0.5 + 0.5*this.posY/100 * 0.5;
	this.feet.update(elapsed);
	
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
	this.feet.draw(display, [this.posX, this.posY]);

	var dims = this.image.getSize();
	this.rect = new gamejs.Rect([(this.posX),(this.posY)],[dims[0]*this.scaleF,dims[1]*this.scaleF]);
	display.blit( this.image, this.rect, new gamejs.Rect([0,0],[dims[0],dims[1]]));
};

