function Feet() {


	this.update = function(msDuration) {

	}

	this.draw = function(mainSurface, position) {
		draw.bezierCurve(mainSurface, "#7EC736", 
			[100, 300], [400, 300], 
			[110, 350], [390, 350], 4);
		draw.bezierCurve(mainSurface, "#7EC736", 
			[100, 300], [400, 300], 
			[110, 250], [390, 250], 4);
	}
}

