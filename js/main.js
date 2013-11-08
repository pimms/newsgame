gamejs = require('gamejs');
font   = require('gamejs/font');

gamejs.preload(["img/background.png", "img/Siv_Jensen.png"]);

gamejs.ready(function() {
    include_once(["spawner.js", "world.js", "player.js"]);

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
