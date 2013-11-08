/**
 * @class Player
 * A wrapper around a Person object including 
 * input from various sources.
 */
include_once(["person.js"])
function Player() {
	this.person = new Person(0);

	this.handleEvent = function(event) {
		// DO SHIT WITH EVENT
	}

	this.update = function(msDuration) {
		this.person.update(msDuration);
	}

	this.draw = function(mainSurface) {
		this.person.draw(mainSurface);
	}

	// Listen for touch events yo pls
	window.addEventListener("load", function() {
		var canvas = document.getElementsByTagName("canvas")[0];

		canvas.addEventListener("touchstart", function(e) {
			var touchobj = e.changedTouches[0];
			var startx = parseInt(touchobj.clientX);
			var starty = parseInt(touchobj.clientY);


		});	

		canvas.addEventListener("touchmove", function(e) {
			var touchobj = e.changedTouches[0];
			var startx = parseInt(touchobj.clientX);
			var starty = parseInt(touchobj.clientY);

			
		});
	});
}