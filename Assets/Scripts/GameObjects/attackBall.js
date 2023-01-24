class AttackBall extends ImageObject {
    directionX = 0;
    directionY = 0;

    directionXNormalised = 0;
    directionYNormalised = 0;

    lifespan = 5000;
    timeStampCreated = 0;

    origin = {
        x: 0,
        y: 0,
    };

    constructor(name, src, size, dirX, dirY) {
        super(name, src, player.position.x + (player.dimensions.width / 2) - size / 2, player.position.y - 50, size, size);

        this.origin.x = player.position.x + (player.dimensions.width / 2) - size / 2;
        this.origin.y = player.position.y - 50;

        this.directionX = dirX - this.position.x - (this.dimensions.width / 2);
        this.directionY = dirY - this.position.y - (this.dimensions.width / 2);

        let directionVectorLength = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);

        this.directionXNormalised = (this.directionX) / directionVectorLength;
        this.directionYNormalised = (this.directionY) / directionVectorLength;

        this.timeStampCreated = Date.now();
    }

    update() {
        this.position.x += this.directionXNormalised * 5;
        this.position.y += this.directionYNormalised * 5;
        if (this.timeStampCreated + this.lifespan < Date.now()) {
            this.destroy();
            delete this;
        }
    }

    draw() {
        this.image.src = this.imageFilePath
        gameManager.gameCanvas.drawLayer.save();
        gameManager.gameCanvas.drawLayer.translate(this.position.x + (this.dimensions.width / 2), this.position.y + (this.dimensions.width / 2));
        gameManager.gameCanvas.drawLayer.rotate((Math.atan2(this.directionY, this.directionX) * 180 / Math.PI + 90) * Math.PI / 180);
        gameManager.gameCanvas.drawLayer.beginPath();
        gameManager.gameCanvas.drawLayer.drawImage(this.image, 0, 0, this.dimensions.width * (this.image.width / this.dimensions.width), this.dimensions.height * (this.image.height / this.dimensions.width), -(this.dimensions.width / 2), -(this.dimensions.height / 2), this.dimensions.width, this.dimensions.height);
        gameManager.gameCanvas.drawLayer.closePath();
        gameManager.gameCanvas.drawLayer.restore();
    }

    onCollision(otherObject) {
        if (otherObject instanceof Enemy) {
            otherObject.receiveDamage(playerManager.intelligence.value);
            this.destroy();
        }
    }
}
