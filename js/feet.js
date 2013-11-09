function Feet() {
	this.timer = 0;
	this.speed = 1;

	this.feetpos = [[-20, 0], [20, 0]];

	this.update = function(msDuration, isSearching) {
		if (isSearching === true) {
			this.timer += msDuration * this.speed;

			if (this.timer % 1000 < 500) {
				this.feetpos[0][1] = -20;
				this.feetpos[1][1] = 0;
			} else {
				this.feetpos[1][1] = -20;
				this.feetpos[0][1] = 0;
			}
		} else {
			this.timer = 0;
			this.feetpos[0] = [-20, 0];
			this.feetpos[1] = [20, 0];
		}
	}

	this.draw = function(mainSurface, position, dims, scale) {
		var feetpos = this.feetpos;
		var left = [ feetpos[0][0]*scale + position[0],
					 feetpos[0][1]*scale + position[1]];
		var right= [ feetpos[1][0]*scale + position[0],
					 feetpos[1][1]*scale + position[1]];

		this.drawFoot(mainSurface, left, scale);
		this.drawFoot(mainSurface, right, scale);
	}

	this.drawFoot = function(mainSurface, position, scale) {
		var basex = position[0] 
		var basey = position[1] 

		var start = [basex - 15 * scale, basey];
		var end   = [basex + 15 * scale, basey];

		var controlx = 5 * scale;
		var controly = 8 * scale;


		draw.bezierCurve(mainSurface, "#FF0000", 
			start, end,
			[(start[0] + end[0]) / 2 + 4*scale, (start[1] + end[1]) / 2 + 3*scale], 
			[(start[0] + end[0]) / 2 - 4*scale, (start[1] + end[1]) / 2 + 3*scale], 
			scale*5);
		draw.bezierCurve(mainSurface, "#FF0000", 
			start, end,
			[(start[0] + end[0]) / 2 + 4*scale, (start[1] + end[1]) / 2 - 3*scale], 
			[(start[0] + end[0]) / 2 - 4*scale, (start[1] + end[1]) / 2 - 3*scale], 
			scale*5);


		draw.bezierCurve(mainSurface, "#000", 
			start, end,
			[start[0] + controlx, start[1] - controly], 
			[end[0] - controlx, end[1] - controly], 
			scale*2);
		draw.bezierCurve(mainSurface, "#000", 
			start, end,
			[start[0] + controlx, start[1] + controly], 
			[end[0] - controlx, start[1] + controly], 
			scale * 2);
	}
}

