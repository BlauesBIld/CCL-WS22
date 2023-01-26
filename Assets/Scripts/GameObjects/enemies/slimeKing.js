class SlimeKing extends Enemy {
    wobbleSpeed = 0.06;
    maxWobbleOffset = 5;
    heightOrigin = 0;

    timeStampLastTimeEnemySpawned = 0;
    delayBetweenMonsterSpawns = 2200;
    spawnAbleEnemies = ['SlimeBig', 'SlimeMiddle', 'SlimeSmol'];

    constructor(name) {
        super(name, "./Enemies/" + name + ".png", gameManager.gameCanvas.canvasBoundaries.right/2 - (size * waveManager.enemyDefaultSize)/2, 100, waveManager.enemyDefaultSize * monsters[name].size, waveManager.enemyDefaultSize * monsters[name].size);
        this.currentHealthPoints *= Math.sqrt(waveManager.currentWaveNo) * Math.pow(monsters[name].size,9);
        this.maxHealthPoints = this.currentHealthPoints;
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
        this.spawnEnemies();
    }

    spawnEnemies() {
        if(this.timeStampLastTimeEnemySpawned + this.delayBetweenMonsterSpawns < Date.now()){
            let randomMinion = Math.random();
            if(randomMinion <= 0.10){
                new Slime(this.spawnAbleEnemies[0]);
            } else if (randomMinion <= 0.35){
                new Slime(this.spawnAbleEnemies[1]);
            } else {
                new Slime(this.spawnAbleEnemies[2]);
            }
            this.timeStampLastTimeEnemySpawned = Date.now();
        }
    }
}