include_once(["const.js"]);

/* This is the messiest file in the entire project.
 * Holy shit.
 */
function Money() {
	this.imageLEFT = gamejs.image.load("img/money.png");
	this.imageRIGHT  = gamejs.transform.flip(this.imageLEFT, true, false);

	this.position = [0, 0];
	this.direction = RIGHT;
	this.image = this.imageRIGHT;
	this.rect = new gamejs.Rect([0, 0]);

	this.scaleF = 1;
	this.imageDims = this.image.getSize();
	this.imageDimsScale = this.imageDims;

	this.setDirection = function(direction) {
		if (this.direction != direction) {
			this.direction = direction;

			if (direction == LEFT) {
				this.image = this.imageLEFT;
			} else if (direction == RIGHT) {
				this.image = this.imageRIGHT;
			}
		}
	}

	this.setPosition = function(position) {
		this.position = position;
	}

	this.update = function(msDuration) {
		if (this.direction == LEFT) {
			this.rect.left = this.position[0] - this.imageDims[0] * 0.5 * this.scaleF;
			this.rect.top = this.position[1] + 7;
		} else {
			this.rect.left = this.position[0] + this.imageDims[0] * 0.5 * this.scaleF;
			this.rect.top = this.position[1] + 7;
		}

		this.scaleF = 0.5*SPRITESCALE + 0.5*this.rect.top/100 * SPRITESCALE;
		this.imageDims = this.image.getSize();
		this.imageDimsScale = this.image.getSize();
		this.imageDimsScale[0] *= this.scaleF;
		this.imageDimsScale[1] *= this.scaleF;
	}

	this.draw = function(mainSurface) {
		this.rect = new gamejs.Rect([(this.rect.left-this.imageDimsScale[0]/2),(this.rect.top-this.imageDimsScale[1])],
									[this.imageDimsScale[0],this.imageDimsScale[1]]);
		mainSurface.blit( this.image, this.rect, new gamejs.Rect([0,0],[this.imageDims[0],this.imageDims[1]]));
	}
}

gamejs.utils.objects.extend(Money, gamejs.sprite.Sprite);