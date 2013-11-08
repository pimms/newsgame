/**
 * @class Player
 * A wrapper around a Person object including 
 * input from various sources.
 */
function Player() {
	this.person = new Person();

	this.handleEvent = function(event) {
		// DO SHIT WITH EVENT
	}

	this.update = function(msDuration) {
		this.person.update(msDuration);
	}

	this.draw = function(mainSurface) {
		this.person.draw(mainSurface);
	}
}