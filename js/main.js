gamejs = require('gamejs');
font   = require('gamejs/font');
draw   = require("gamejs/draw");

gamejs.preload(["img/background.png", 
                "img/siv_jensen.png",
                "img/money.png",
                "img/artist.png",
                "img/nurse.png",
                "img/father.png",
                "img/old.png",
				        "img/student.png",
				        "img/scientist.png",
				        "audo/music.ogg"]);

gamejs.ready(function() {
    include_once(["const.js", 
                  "spawner.js", 
                  "world.js", 
                  "money.js",
                  "player.js", 
                  "feet.js", 
                  "score.js",
                  "label.js"]);

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


var canvas = document.getElementsByTagName("canvas")[0];

var p = document.createElement("p");
var txt = document.createTextNode("test");
p.appendChild(txt);
canvas.appendChild(p);