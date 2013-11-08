function World() {
	/* Init Box2D */
	var gravity = new b2Vec2(0, 100);
	this.world = new b2World(gravity, true); 

	var debugDraw = new Box2D.Dynamics.b2DebugDraw;
	debugDraw.SetSprite(document.getElementsByTagName("canvas")[0].getContext("2d"));
	this.world.SetDebugDraw(debugDraw);

	/* Init the player */
	this.player = new Player(this.world);
	this.terrain = new Terrain(this.world);


	this.onEvent = function(event) {
		this.player.handleInput(event);
	}

	this.draw = function(mainSurface) {
		this.player.draw(mainSurface);
	}

	this.update = function(msDuration) {
		this.player.update(msDuration);
		this.world.Step(1.0 / 60.0, 10, 10);
	}
}