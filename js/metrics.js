include_once(["bar.js"]);

function Metrics() {
	this.count = [0, 0, 0, 0, 0];

	/* PREPARE THE BARRRRRRRRS */
	this.bars = new Array();
	for (var i=0; i<5; i++) {
		this.bars[i] = new Bar(i);
		
		this.bars[i].position = [
			10, 200 + 40*i
		];
	}

	this.draw = function(display) {
		for (var i=0; i<5; i++) {
			this.bars[i].draw(display);
		}
	}

	this.onMoneyGiven = function(group) {
		this.count[group]++;
		this.recalculate();
	}

	this.recalculate = function() {
		var total = 0;
		for (var i=0; i<5; i++) {
			total += this.count[i];
		}

		for (var i=0; i<5; i++) {
			var fraction = this.count[i] / total;
			this.bars[i].current = fraction;
		}
	}
}