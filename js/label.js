function Label() {
	this.lifetime = 10 * 1000;
	this.age = 0;
	this.typeName = "";


	this.draw = function(surface, typeName) {
		surface.blit((new gamejs.font.Font('10px Sans-serif')).render(typeName), new gamejs.Rect([520,30]));
	}

	this.update = function(msDuration) {
		this.age += msDuration;
		if (this.age > this.lifetime) {
			//Delete stuff ?????????????
		}
	}
}