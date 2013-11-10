include_once([	"player.js", 
	 		 	"spawner.js", 
	 		 	"score.js",
	 		 	"metrics.js"])

 function depthCompare(a,b) {
	return a.posY - b.posY;
}

function World() {
	/* INIT WORLD OBJECTS HERE */
	var score = new Score();
	var label = new Label();
	this.spawner = new Spawner(this);
	this.metrics = new Metrics();
	this.player = new Player(0);
	this.npcArray = new Array();
	this.npcArray.push(this.player);
	this.gameEnded = false;
	var currentTypeName = " ";

	this.background = new gamejs.sprite.Sprite();
	this.background.image = gamejs.image.load("img/background.png");

	this.onEvent = function(event) {
		this.player.handleEvent(event);
	}

	this.draw = function(mainSurface) {
		if( !this.gameEnded ) { 
			this.background.draw(mainSurface);
			//this.player.draw(mainSurface);

			this.npcArray.sort( depthCompare );

			//console.log(this.npcArray.length);
			this.npcArray.forEach(function(person) {
				person.draw(mainSurface);
			});
			score.draw(mainSurface);

			label.draw(mainSurface, currentTypeName);
			this.spawner.draw(mainSurface);
			this.metrics.draw(mainSurface);
		} else {
			score.drawScore(mainSurface);
		}

	}

	this.update = function(msDuration) {
		if( score.timer < 1 && !this.gameEnded ) {
			this.gameEnded = true;
		}
		
		if( !this.gameEnded ) {
			this.updateGame(msDuration);	
		} else {
			// Display high score or something... ?
		}
	}

	this.updateGame = function(msDuration) {
		this.spawner.update(msDuration);

		// OH MY GOD I HATE JAVASCRIPT
		var test = this.player.person;
		var world = this;

		this.npcArray.forEach(function(person){
			if( person != test ) {
				if( person.active === true && person.collision( test ) ) {
					score.addScore(person.getScore());
					
					// Make the person gtfo
					person.onMoneyGiven();

					// STATISTICS, BITCH
					world.metrics.onMoneyGiven(person.group);

					// Update the label with the typename
					currentTypeName = person.typeName;
				}
			}
		});

		// Update all the NPCs		
		this.npcArray.forEach(function(person) {
			person.update(msDuration);
		});
		score.update(msDuration);
		label.update(msDuration);

		// Remove dead NPCs
		for (var i=0; i<this.npcArray.length; i++) {
			var person = this.npcArray[i];
			if (person != this.player && person.isDead()) {
				this.npcArray.splice(i--, 1);
			}
		}
	}

	this.addNPC = function(person) {
		this.npcArray.push(person);
	}
}