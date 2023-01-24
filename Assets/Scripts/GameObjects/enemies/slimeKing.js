class SlimeKing extends Enemy {
    wobbleSpeed = 0.06;
    maxWobbleOffset = 5;
    heightOrigin = 0;

    constructor(name, size) {
        super("SlimeKing", "./Enemies/" + name + ".png", gameManager.gameCanvas.canvasBoundaries.right/2 - (size * waveManager.enemyDefaultSize)/2, 100, waveManager.enemyDefaultSize * size, waveManager.enemyDefaultSize * size);
        this.currentHealthPoints *= Math.sqrt(waveManager.currentWaveNo) * (size*16);
        this.maxHealthPoints = this.currentHealthPoints;
        console.log(this.currentHealthPoints);
        this.heightOrigin = this.dimensions.height;
        this.movementSpeed = 0;
    }

    update() {
        super.update();
        this.dimensions.height -= this.wobbleSpeed;
        if (this.dimensions.height < this.heightOrigin - this.maxWobbleOffset) {
            this.wobbleSpeed = -Math.abs(this.wobbleSpeed);
        } else if (this.dimensions.height >= this.heightOrigin) {
            this.wobbleSpeed = Math.abs(this.wobbleSpeed);
        }
    }
}