function Label(typeName) {
	this.lifetime = 10 * 1000;
	this.age = 0;
	this.typeName = typeName;


	this.draw = function(surface) {
		//alert(this.typeName);
		//var font = new gamejs.font.Font('20px monospace');
    	// render text - this returns a surface with the text written on it.
    	//var helloSurface = font.render('Hello World')
		//new gamejs.font.Font('30px Sans-serif').render(this.typeName);
		//surface.blit((new gamejs.font.Font('30px Sans-serif')).render(this.typeName), new gamejs.Rect([20,80]));
	}

	this.update = function(msDuration) {
		this.age += msDuration;
		if (this.age > this.lifetime) {
			alert("Stop that text!!");
		}
	}
}