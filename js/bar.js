function Bar(subtype) {
	this.subtype = subtype;
	this.position = [0, 0];

	this.name = SUBGROUP_NAMES[subtype];
	this.target = SUBGROUP_TARGETS[subtype];
	this.current = 0.5;

	this.draw = function(surface) {
		var position = this.position;

		// Draw background
		draw.rect(	surface, "#000", 
					new gamejs.Rect(position, [110, 0]), 20);
		draw.rect(	surface, "#FFF",
					new gamejs.Rect(
						[position[0]+5, position[1]], 
						[100, 0]
					), 10);

		// Draw the bar itself
		draw.rect(	surface, "#FF0000",
					new gamejs.Rect(
						[position[0]+5, position[1]], 
						[this.current * 100, 0]
					), 10);

		// Draw the target indicator
		draw.line(surface, "#000", 
					[position[0] + 5 + this.target*100, 
						position[1] + 5],
					[position[0] + 5 + this.target*100, 
						position[1] - 5], 3);

		// Draw the TEXTTTTTTTTTTTT
		var textpos = [position[0], position[1]-25];
		surface.blit((new gamejs.font.Font("12px Sans-serif")).render(this.name),
					  new gamejs.Rect(textpos));
	}
}