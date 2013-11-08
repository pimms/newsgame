gamejs = require('gamejs');
font   = require('gamejs/font');

gamejs.ready(function() {
    include_once([]);

    var display = gamejs.display.setMode([600, 400]);
    var mainSurface = gamejs.display.getSurface();
    var world = new World();

    gamejs.onEvent(function(event) {
        world.onEvent(event);
    });

    gamejs.onTick(function(msDuration) {
    	world.update(msDuration);

        // Draw
        mainSurface.fill("#FFFFFF");
        world.draw(mainSurface);
    });
});
