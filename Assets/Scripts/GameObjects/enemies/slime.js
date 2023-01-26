class Slime extends Enemy {
    wobbleSpeed = 0.08;
    maxWobbleOffset = 5;
    heightOrigin = 0;


    constructor(name) {
        super(name, "./Enemies/" + name + ".png", getRandomPositionOnXAxis(waveManager.enemyDefaultSize * monsters[name].size), 20, waveManager.enemyDefaultSize * monsters[name].size, waveManager.enemyDefaultSize * monsters[name].size);
        this.currentHealthPoints *= Math.sqrt(waveManager.currentWaveNo) * Math.pow(monsters[name].size,9);
        this.maxHealthPoints = this.currentHealthPoints;
        this.heightOrigin = this.dimensions.height;
        this.movementSpeed = 0.5;
        this.movementSpeed /= Math.pow(monsters[name].size, 2);
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