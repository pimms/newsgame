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

	this.mouseButtonDown = false;
	this.anyKeysDownLastFrame = false;
	this.keysDown = [false, false, false, false];


	this.handleEvent = function(event) {
		if (event.type === gamejs.event.MOUSE_DOWN) {
			this.mouseButtonDown = true;
		} else if (event.type === gamejs.event.MOUSE_UP) {
			this.mouseButtonDown = false;
		} else if(event.type === gamejs.event.MOUSE_MOTION && this.mouseButtonDown) {
			if(event.pos[1] < this.posY) {
				this.person.moveTo(event.pos[0], event.pos[1]+35);
			}
			else {
				this.person.moveTo(event.pos[0], event.pos[1]+60);
			}
		} else if (event.type == gamejs.event.KEY_DOWN ||
			       event.type == gamejs.event.KEY_UP) {
			var idx = -1;

			switch (event.key) {
				case gamejs.event.K_w:
				case gamejs.event.K_UP:
					idx = 0;
					break;

				case gamejs.event.K_a:
				case gamejs.event.K_LEFT:
					idx = 1;
					break;

				case gamejs.event.K_s:
				case gamejs.event.K_DOWN:
				 	idx = 2;
				 	break;

				 case gamejs.event.K_d:
				 case gamejs.event.K_RIGHT:
				 	idx = 3;
				 	break;
			}

			if (idx >= 0) {
				this.keysDown[idx] = (event.type === gamejs.event.KEY_DOWN);
			}
		}
	}
	

	this.update = function(msDuration) {
		/* Update the persons destination based on key input (I'M SO, SO SORRY) */
		if (this.keysDown[0] || this.keysDown[1] || this.keysDown[2] || this.keysDown[3]) {
			this.anyKeysDownLastFrame = true;
			var goal = [this.person.posX, this.person.posY];
			if (this.keysDown[0]) goal[1] -= 100;	// W
			if (this.keysDown[1]) goal[0] -= 100; 	// A
			if (this.keysDown[2]) goal[1] += 100;	// S
			if (this.keysDown[3]) goal[0] += 100;	// D
			this.person.moveTo(goal[0], goal[1]);
		} else if (this.anyKeysDownLastFrame) {
			this.anyKeysDownLastFrame = false;
			this.person.moveTo(this.person.posX, this.person.posY);
		}

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
			e.preventDefault()
		}, false)

		vas.addEventListener("touchmove", function(e) {
			var touchobj = e.changedTouches[0];
			var touchx = parseInt(touchobj.clientX);
			var touchy = parseInt(touchobj.clientY);
			this.person.moveTo(touchx, touchy);
			e.preventDefault()
		},false);
		
		canvas.addEventListener("touchend", function(e) {
			var touchobj = e.changedTouches[0];
			e.preventDefault();
		},false)
	}, false);
}