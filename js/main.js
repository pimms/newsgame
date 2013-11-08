gamejs = require('gamejs');
font   = require('gamejs/font');
draw   = require("gamejs/draw");

gamejs.preload(["img/background.png", "img/siv_jensen.png"]);

gamejs.ready(function() {
    include_once(["spawner.js", "world.js", "player.js", "feet.js"]);

    var display = gamejs.display.setMode([800, 600]);
    var mainSurface = gamejs.display.getSurface();
    var world = new World();

    gamejs.onEvent(function(event) {
        world.onEvent(event);
    });

    gamejs.onTick(function(msDuration) {
    	world.update(msDuration);

        // Draw
        mainSurface.fill("#FFAAAA");
        world.draw(mainSurface);
    });
});
