include_once(["bar.js"]);

function Metrics() {

	/* PREPARE THE BARRRRRRRRS */
	this.bars = new Array();
	for (var i=0; i<5; i++) {
		this.bars[i] = new Bar(i);
	}	
}