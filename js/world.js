include_once(["player.js", "spawner.js"])
function World() {
	/* INIT WORLD OBJECTS HERE */
	this.spawner = new Spawner(this);
	this.player = new Player(0);
	this.npcArray = new Array();

	this.background = new gamejs.sprite.Sprite();
	this.background.image = gamejs.image.load("img/background.png");

	this.onEvent = function(event) {
		
	}

	this.draw = function(mainSurface) {
		this.background.draw(mainSurface);
		this.player.draw(mainSurface);

		this.npcArray.forEach(function(person) {
			person.draw(mainSurface);
		});
	}

	this.update = function(msDuration) {
		this.spawner.update(msDuration);
		this.player.update(msDuration);

		// Update all the NPCs		
		this.npcArray.forEach(function(person) {
			person.update(msDuration);
		});
	}

	this.addNPC = function(person) {
		this.npcArray.push(person);
	}
}