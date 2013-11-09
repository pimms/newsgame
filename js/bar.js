function Bar(subtype) {
	this.subtype = subtype;
	this.position = [0, 0];

	this.name = SUBGROUP_NAMES[subtype];
	this.target = SUBGROUP_TARGETS[subtype];
	this.current = 0;

	this.draw = function(surface) {
		// Draw background
		draw.rect(	surface, "#FFF", 
					new gamejs.Rect(position, [110, 30]), 15);

		// Draw the bar itself
		draw.rect(	surface, "#FF0000",
					new gamejs.Rect([position[0]+5, position[1]+5]),
					10);
	}
}