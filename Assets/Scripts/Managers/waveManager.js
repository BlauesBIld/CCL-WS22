class WaveManager {
    enemies = [];
    itemsOnTheFloor = [];

    initialDelayToStartWave = 3000;
    timeBetweenMonsterSpawn = 1500;

    waveActive = false;
    currentWaveNo = 1;

    defeatedEnemiesCounter = 0;
    enemyDefaultSize = 80;

    chanceThatEnemyDropsGold = 0.5;
    chanceThatEnemyDropsItem = 0.2;

    constructor() {
        console.log("Enemy-Manager created!");
    }

    addEnemy(newEnemy) {
        this.enemies.push(newEnemy);
    }

    startWave() {
        this.itemsOnTheFloor.forEach(value => value.destroy());
        gameManager.magicBarrier.reactivateBarrier();
        gameManager.waveButton.disabled = true;
        gameManager.waveButton.innerHTML = "Wave " + this.currentWaveNo + " active"
        this.waveActive = true;

        this.spawnMonsters();

        gameManager.titleObject.displayNewTitle("Wave " + this.currentWaveNo);
    }

    spawnMonsters() {
        let amountOfEnemiesSpawned = 0;
        waveConfig[this.currentWaveNo].enemies.forEach(enemy => {
            for (let i = 0; i < enemy.amount; i++) {
                amountOfEnemiesSpawned++;
                setTimeout(function () {
                    if (waveManager.waveActive) {
                        new Enemy("Slime", "./Enemies/" + enemy.name + ".png", getRandomPositionOnXAxis(), 20, waveManager.enemyDefaultSize * enemy.size, waveManager.enemyDefaultSize * enemy.size);
                    }
                }, this.timeBetweenMonsterSpawn * (amountOfEnemiesSpawned) + this.initialDelayToStartWave);
            }
        })
    }

    checkIfWaveDone() {
        if (this.defeatedEnemiesCounter >= this.getTotalAmountOfEnemiesFromCurrentWave()) {
            this.currentWaveNo++;
            this.resetWave();
            gameManager.titleObject.displayNewTitle("Wave cleared!")
        } else if (gameManager.magicBarrier.currentHealthPoints <= 0) {
            this.enemies.forEach(value => value.die())
            gameManager.magicBarrier.currentHealthPoints = 100;
            this.resetWave();
            gameManager.titleObject.displayNewTitle("Wave failed!")
        }

    }

    resetWave() {
        gameManager.magicBarrier.deactivateBarrier();
        this.waveActive = false;
        this.defeatedEnemiesCounter = 0;
        gameManager.waveButton.disabled = false;
        gameManager.waveButton.innerHTML = "Start wave " + this.currentWaveNo;
    }

    addToCounterOfDefeatedEnemies() {
        this.defeatedEnemiesCounter++;
    }

    trackDefeatedEnemies() {
        gameManager.gameCanvas.drawLayer.save();
        gameManager.gameCanvas.drawLayer.font = 'bold 25px \'MedievalSharp\'';
        gameManager.gameCanvas.drawLayer.fillStyle = 'black';
        gameManager.gameCanvas.drawLayer.textAlign = 'right';
        gameManager.gameCanvas.drawLayer.fillText("Enemies: " + this.defeatedEnemiesCounter + "/" + this.getTotalAmountOfEnemiesFromCurrentWave(), gameCanvas.canvasBoundaries.right - 10, 30);
        gameManager.gameCanvas.drawLayer.restore();
    }

    getTotalAmountOfEnemiesFromCurrentWave() {
        let sumOfEnemies = 0;
        waveConfig[this.currentWaveNo].enemies.forEach(enemy => sumOfEnemies += enemy.amount);
        return sumOfEnemies;
    }

    getRandomItemNameWithCategoryFromItems(tier) {
        let allItems = [];
        for (let itemCategory in items) {
            allItems[itemCategory] = [];
            for (let item in items[itemCategory]) {
                if (items[itemCategory][item].tier === tier) {
                    allItems[itemCategory].push(item)
                }
            }
        }

        let randomCategoryNumb = Math.floor(Math.random()*4);
        let randomItemNumb = Math.floor(Math.random()*allItems[getItemCategoryFromIndex(randomCategoryNumb)].length);
        return getItemCategoryFromIndex(randomCategoryNumb) + ":" + allItems[getItemCategoryFromIndex(randomCategoryNumb)][randomItemNumb];
    }
}