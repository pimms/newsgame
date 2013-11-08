
var Person = function( id) {
	this.image = gamejs.image.load('img/Siv_Jensen.png');
	this.id = id;
	this.posX = 0;
	this.posY = 0;
	this.goalX = 50;
	this.goalY = 70;
	this.speed = 15;
	this.rect = new gamejs.Rect([(this.posX)*32,(this.posY)*32],[32,32]);
	this.searching = false;
}
gamejs.utils.objects.extend(Person, gamejs.sprite.Sprite);

Person.prototype.moveTo = function( x, y) {
	this.searching = true;
	this.goalX = x;
	this.goalY = y;
};

Person.prototype.update = function( elapsed ) {
	if(this.searching) {
		var direction = [this.goalX-this.posX,this.goalY-this.posY];
		var length = direction[0]*direction[0] + direction[1]*direction[1];
		length = Math.sqrt(length);
		if ( length > 10 ) {
			this.posX += this.speed*direction[0]*elapsed/(1000*length);
			this.posY += this.speed*direction[1]*elapsed/(1000*length);
			this.rect = new gamejs.Rect([(this.posX),(this.posY)],[32,32]);
		} else {
			this.searching = false;
		}
	}

	// Apply the position
	this.rect = gamejs.Rect([this.posX, this.posY]);
};

/*
Person.prototype.draw  = function(display) {
	var tImg = gamejs.transform.scale(this.image, [ 0.75+0.25*(y/400) , 0.75+0.25*(y/400) ]);
	display.blit( tImg, this.rect, new gamejs.Rect([this.id*32,0],[32,32]));
};
*/