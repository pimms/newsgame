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
			this.bars[i].draW(display);
		}
	}

	this.onMoneyGiven = function(group) {
		this.count[group]++;
		this.recalculate();
	}

	this.recalculate = function() {
		var total = 0;
		for (var n in this.count) {
			total += n;
		}

		for (var i=0; i<5; i++) {
			var percent = this.count[i] / total;
			this.bars[i].current = percent;
		}
	}
}