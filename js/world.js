include_once(["player.js", "spawner.js"])

 function depthCompare(a,b) {
	return a.posY - b.posY;
}

function World() {
	/* INIT WORLD OBJECTS HERE */
	var score = new Score();
	this.spawner = new Spawner(this);
	this.player = new Player(0);
	this.npcArray = new Array();
	this.npcArray.push(this.player);
	

	this.background = new gamejs.sprite.Sprite();
	this.background.image = gamejs.image.load("img/background.png");

	this.onEvent = function(event) {
		this.player.handleEvent(event);

	}

	this.draw = function(mainSurface) {
		this.background.draw(mainSurface);
		//this.player.draw(mainSurface);

		this.npcArray.sort( depthCompare );

		//console.log(this.npcArray.length);
		this.npcArray.forEach(function(person) {
			person.draw(mainSurface);
		});
		score.draw(mainSurface);
	}

	this.update = function(msDuration) {
		this.spawner.update(msDuration);

		
		var test = this.player.person;
		this.npcArray.forEach(function(person){
			if( person != test ) {
				if( person.collision( test ) ) {
					score.addScore(100);
				}
			}
		});

		// Update all the NPCs		
		this.npcArray.forEach(function(person) {
			person.update(msDuration);
		});
		score.update(msDuration);
	}

	this.addNPC = function(person) {
		this.npcArray.push(person);
	}
}