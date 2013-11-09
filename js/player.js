/**
 * @class Player
 * A wrapper around a Person object including 
 * input from various sources.
 */
include_once(["person.js", "money.js"])
function Player() {
	this.person = new Person(0);
	this.money = new Money();

	this.posY = this.person.posY;


	this.handleEvent = function(event) {
		if(/*event.type === gamejs.event.MOUSE_MOTION*/ event.type === gamejs.event.MOUSE_UP) {
			this.person.moveTo(event.pos[0], event.pos[1]);
		}
	}
	

	this.update = function(msDuration) {
		this.person.update(msDuration);
		this.posY = this.person.posY;

		/* Set the required attributes of the money */
		this.money.setPosition([this.person.posX, this.person.posY]);
		this.money.update(msDuration);

		var diff = this.person.goalX - this.person.posX;
		if (Math.abs(diff) > 5) {
			if (diff < 0) {
				this.money.setDirection(LEFT);
			} else {
				this.money.setDirection(RIGHT);
			}
		}
	}

	this.draw = function(mainSurface) {
		this.person.draw(mainSurface);
		this.money.draw(mainSurface);
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