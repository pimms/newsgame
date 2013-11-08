var gamejs = require('gamejs');
var font   = require('gamejs/font');

gamejs.preload(["img/background.png"]);

gamejs.ready(function() {
    include_once(["spawner.js", "world.js"]);

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
