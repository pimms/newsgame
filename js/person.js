include_once(["feet.js"]);
var Person = function( id) {
	//this.image = gamejs.image.load('img/siv_jensen.png');
	this.id = id;
	this.group = 0;
	this.characterScore = 100;
	this.characterType();

	this.posX = 200;
	this.posY = 205;
	this.goalX = 50;
	this.goalY = 70;
	this.speed = 200;
	this.searching = false;
	this.scaleF = 0.5*SPRITESCALE + this.posY/100*SPRITESCALE;

	this.imageDims = this.image.getSize();
	this.imageDimsScale = this.imageDims;
	this.active = true;

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

	this.scaleF = 0.5*SPRITESCALE + 0.5*this.posY/100 * SPRITESCALE;
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

Person.prototype.onMoneyGiven = function() {
	this.active = false;
	this.searching = true;
	this.speed *= 2;
	this.feet.speed *= 2;
	this.goalX = (this.posX > 400) ? (950) : (-100);
	

	(new gamejs.mixer.Sound("audio/coin.ogg")).play(false);

}

Person.prototype.isDead = function() {
	return !this.searching;
}

Person.prototype.characterType = function() {
	switch(this.id) {
		case 0:
			this.image = gamejs.image.load('img/siv_jensen.png');
			this.characterScore = 1000;
			this.decreaseHealth = -1;
			this.typeName = "Siv Jensen er Norges viktigste person!";
			break;
		case 1:
			this.image = gamejs.image.load('img/artist.png');
			this.typeName = "Kunstnere, HAH! De er ubrukelige som få!";
			this.group = CULTURE;
			break;
		case 2:
			this.image = gamejs.image.load('img/nurse.png');
			this.typeName = "Sykepleiere er tydligvis viktige...";
			this.group = HEALTH;
			break;
		case 3:
			this.image = gamejs.image.load('img/father.png');
			this.typeName = "Fedre trenger ingenting. Gå tilbake på jobb!";
			this.group = WELFARE;
			break;
		case 4:
			this.image = gamejs.image.load('img/old.png');
			this.typeName = "Pensjonister får IKKE penger, hvorfor skulle de?";
			this.group = WELFARE;
			break;
		case 5:
			this.image = gamejs.image.load('img/student.png');
			this.typeName = "Studenter får penger, for de er Norges fremtid. BIATCH";
			this.group = SCIENCE_EDU;
			break;
		case 6:
			this.image = gamejs.image.load('img/scientist.png');
			this.typeName = "Vitenskap får penger, for det trengs!";
			this.group = SCIENCE_EDU;
			break;
	}
}

Person.prototype.getScore = function() {
	return this.characterScore;
}

Person.prototype.getTypeName = function() {
	return this.typeName;
}
