

function Bar(subtype) {
	this.subtype = subtype;
	this.position = [0, 500];

	this.name = SUBGROUP_NAMES[subtype];
	this.target = SUBGROUP_TARGETS[subtype];
	this.current = 0;

	this.draw = function(surface) {
		var position = this.position;
		// Draw background
		draw.rect(	surface, "#000", new gamejs.Rect([position[0], position[1] + 100], [110, 0]), 20);
		draw.rect(	surface, "#FFF", new gamejs.Rect([position[0] + 5, position[1] + 100], [100, 0]), 10);

		// Draw the bar itself
		var actualLength = this.current;
		if (actualLength > BAR_CUTOFF) {
			actualLength = BAR_CUTOFF;
		}

		var distance = Math.abs(actualLength - this.current) * 3;
		if (distance > 1) distance = 1;
		var fillColor = "rgb(0, 255, 0)";
		//var fillColor = "rgb(" + (distance * 255) + "," + ((1 - distance) * 255) + ",0)";
		//var hexColor = "#" + Math.floor((distance * 255)).toString(16) + Math.floor(((1 - distance) * 255)).toString(16) + (0).toString(16);
		//console.log(actualLength + ", " + this.current + ", " + fillColor + ", " + distance);
		//console.log(fillColor + ", " + hexColor);
		//console.log(test);

		draw.rect(	surface, fillColor, new gamejs.Rect([position[0] + 5, position[1] + 100], [actualLength / BAR_CUTOFF * 100, 0]), 10);

		// Draw the target indicator
		draw.line(surface, "#000", 
					[position[0] + 5 + this.target/BAR_CUTOFF*100, 
						position[1] + 95],
					[position[0] + 5 + this.target/BAR_CUTOFF*100, 
						position[1] + 105], 3);

		// Draw the TEXTTTTTTTTTTTT
		var textpos = [position[0], position[1] + 75];
		surface.blit((new gamejs.font.Font("12px Sans-serif")).render(this.name), new gamejs.Rect(textpos));
	}
}