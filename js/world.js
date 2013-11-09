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
	this.gameEnded = false;
	

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
		} else {
			score.drawScore();
		}

	}

	this.update = function(msDuration) {
		if( score.lives < 1 && !this.gameEnded ) {
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
		var test = this.player.person;
		this.npcArray.forEach(function(person){
			if( person != test ) {
				if( person.active === true && person.collision( test ) ) {
					score.addScore(100);
					person.onMoneyGiven();
				}
			}
		});

		// Update all the NPCs		
		this.npcArray.forEach(function(person) {
			person.update(msDuration);
		});
		score.update(msDuration);

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