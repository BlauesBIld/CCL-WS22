class Slime extends Enemy {
    wobbleSpeed = 0.08;
    maxWobbleOffset = 5;
    heightOrigin = 0;

    constructor(name, size) {
        super("Slime", "./Enemies/" + name + ".png", getRandomPositionOnXAxis(waveManager.enemyDefaultSize * size), 20, waveManager.enemyDefaultSize * size, waveManager.enemyDefaultSize * size);
        this.currentHealthPoints *= Math.sqrt(waveManager.currentWaveNo) * Math.pow(size,9);
        this.maxHealthPoints = this.currentHealthPoints;
        this.heightOrigin = this.dimensions.height;
        this.movementSpeed = 0.5;
        this.movementSpeed /= Math.pow(size, 2);
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