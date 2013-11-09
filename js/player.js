/**
 * @class Player
 * A wrapper around a Person object including 
 * input from various sources.
 */
include_once(["person.js"])
function Player() {
	this.person = new Person(0);
	this.posY = this.person.posY;
	this.handleEvent = function(event) {
		if(/*event.type === gamejs.event.MOUSE_MOTION*/ event.type === gamejs.event.MOUSE_UP) {
			this.person.moveTo(event.pos[0], event.pos[1]);
		}
	}
	

	this.update = function(msDuration) {
		this.person.update(msDuration);
		this.posY = this.person.posY;
	}

	this.draw = function(mainSurface) {
		this.person.draw(mainSurface);
	}
	
	this.collision = function( person ) {
		return false;
	}

	// Listen for touch events yo pls
	window.addEventListener("load", function() {
		var canvas = document.getElementsByTagName("canvas")[0];

		canvas.addEventListener("touchstart", function(e) {
			var touchobj = e.changedTouches[0];
			var touchx = parseInt(touchobj.clientX);
			var touchy = parseInt(touchobj.clientY);

			this.person.moveTo(touchx, touchy);
		});	

		canvas.addEventListener("touchmove", function(e) {
			var touchobj = e.changedTouches[0];
			var touchx = parseInt(touchobj.clientX);
			var touchy = parseInt(touchobj.clientY);

			this.person.moveTo(touchx, touchy);
		});
	});
}