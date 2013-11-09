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
			this.spawnPerson();
			this.timer = 0;
		}
	}

	this.spawnPerson = function() {
		var person = new Person(0);

		var leftToRight = (Math.random() > 0.5);

		person.posX  = (leftToRight) ? (-100) : ( 950);
		person.goalX = (leftToRight) ? ( 950) : (-100);

		person.posY = 120+(600-120)*Math.random();;
		person.goalY = 120+(600-120)*Math.random();
		person.searching = true;

		// Add the person to the world
		this.world.addNPC(person);
	}
}

