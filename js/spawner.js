/** 
 * @param world
 * A World object.
 */
function Spawner(world) {
	this.world = world;
	this.timer = 0;
	this.limit = 1000;
	
	this.spawnerFocusIndex = 0;
	this.spawnerFocusTimer = 0;
	this.spawnFocus = new Array();
	this.image = gamejs.image.load('img/sumbolSheet.png');
	
	for ( var i = 0 ; i < 12 ; i++ ) {
		this.spawnFocus[i] = Math.floor((Math.random() * 6) + 1);
	}
	
	this.draw = function( display ) {
		for ( var i = this.spawnerFocusIndex ; i < 12 ; i++ ) {
			display.blit((new gamejs.font.Font('30px Sans-serif')).render( this.spawnFocus[i].toString() ), new gamejs.Rect([500+20*i,100]));
			display.blit( this.image, new gamejs.Rect([128+128*this.spawnFocus[i],0], new gamejs.Rect([500+20*i,100]));
		}
	}

	this.update = function(msDuration) {
		this.timer += msDuration;
		this.spawnerFocusTimer += msDuration;
		
		if ( this.spawnerFocusTimer > 10000 && this.spawnerFocusIndex < 11 ) {
			this.spawnerFocusTimer = 0;
			this.spawnerFocusIndex++;
		}

		if (this.timer > this.limit) {
			this.spawnPerson();
			this.spawnPerson();
			this.timer = 0;
		}
	}

	this.spawnPerson = function() {
		var person = new Person(this.randomCharacter());

		var leftToRight = (Math.random() > 0.5);

		person.posX  = (leftToRight) ? (-100) : ( 950);
		person.goalX = (leftToRight) ? ( 950) : (-100);

		person.posY = 120+(600-120)*Math.random();;
		person.goalY = 120+(600-120)*Math.random();
		person.searching = true;

		// Add the person to the world
		this.world.addNPC(person);
	}

	this.randomCharacter = function() {
		var id = Math.ceil(Math.random() * 20);
		if ( id > 10 ) {
			id = this.spawnFocus[this.spawnerFocusIndex];
		}
		return id;
	}
}