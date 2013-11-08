/** 
 * @param world
 * A World object.
 */
function Spawner(world) {
	this.world = world;
	this.timer = 0;
	this.limit = 1000;

	this.update = function(msDuration) {
		this.timer += msDuration;

		if (this.timer > this.limit) {
			this.spawnPerson();
			this.timer = 0;
		}
	}

	this.spawnPerson = function() {
		var person = new Person(0);
		person.posX = -50;
		person.posY = 300;
		person.goalX = 850;
		person.goalY = 300;

		// Add the person to the world
		this.world.addNPC(person);
	}
}

