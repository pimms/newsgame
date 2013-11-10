gamejs = require('gamejs');
font   = require('gamejs/font');
draw   = require("gamejs/draw");

gamejs.preload(["img/background.png", 
                 "img/construction_worker.png",
                "img/siv_jensen.png",
                "img/money.png",
                "img/artist.png",
                "img/nurse.png",
                "img/father.png",
                "img/old.png",
				        "img/student.png",
				        "img/scientist.png",
                "img/doctor.png",
                "img/police.png",
                "img/viking.png",
				        "img/symbolSheet.png",
				        "audio/music.ogg",
                "audio/buzz.ogg", 
                "audio/coin.ogg"
                ]);


gamejs.ready( function(){
   setTimeout(load, 5000);
});

function load() {
    include_once([  "const.js", 
                    "spawner.js", 
                    "world.js", 
                    "money.js",
                    "player.js", 
                    "feet.js", 
                    "score.js",
                    "label.js",
                    "metrics.js",
                    "bar.js",
                    "highscore.js"]);

      var display = gamejs.display.setMode([800, 600]);
      var mainSurface = gamejs.display.getSurface();
      var world = new World();

      // Loop the background music
      (new gamejs.mixer.Sound("audio/music.ogg")).play(true);

      gamejs.onEvent(function(event) {
          world.onEvent(event);
      });

      gamejs.onTick(function(msDuration) {
      	if (!world.gameEnded) {
  	    	world.update(msDuration);
  	
  	        // Draw
  	        world.draw(mainSurface);
          }
      });
}
