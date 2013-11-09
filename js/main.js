gamejs = require('gamejs');
font   = require('gamejs/font');
draw   = require("gamejs/draw");

gamejs.preload(["img/background.png", "img/siv_jensen.png"]);

gamejs.ready(function() {
    include_once(["spawner.js", "world.js", "player.js", "feet.js", "score.js"]);

    var display = gamejs.display.setMode([800, 600]);
    var mainSurface = gamejs.display.getSurface();
    var world = new World();
	var score = new Score();

    gamejs.onEvent(function(event) {
        world.onEvent(event);
    });

    gamejs.onTick(function(msDuration) {
    	world.update(msDuration);
		score.update(msDuration);

        // Draw
        mainSurface.fill("#FFAAAA");
        world.draw(mainSurface);
		score.draw(mainSurface);
    });
});
