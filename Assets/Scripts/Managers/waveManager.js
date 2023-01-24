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

    waveMultiplierIfOverLimit = 1;

    chanceThatTheMerchantAppears = 1;
    merchant;

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
        if(this.merchant !== undefined){
            this.merchant.destroy();
            this.merchant = undefined;
        }
    }

    spawnMonsters() {
        let amountOfEnemiesSpawned = 0;
        for (let i = 0; i < this.waveMultiplierIfOverLimit; i++) {
            waveConfig[this.currentWaveNo - 1].enemies.forEach(enemy => {
                for (let i = 0; i < enemy.amount; i++) {
                    amountOfEnemiesSpawned++;
                    setTimeout(function () {
                        if (waveManager.waveActive) {
                            waveManager.spawnMonsterFromType(enemy);
                        }
                    }, this.timeBetweenMonsterSpawn * (amountOfEnemiesSpawned) + this.initialDelayToStartWave);
                }
            });
        }
    }

    spawnMonsterFromType(enemy) {
        switch (enemy.type) {
            case "Slime":
                new Slime(enemy.name, enemy.size);
                break;
            case "SlimeKing":
                new SlimeKing(enemy.name, enemy.size);
        }
    }

    checkIfWaveDone() {
        if (this.defeatedEnemiesCounter >= this.getTotalAmountOfEnemiesFromCurrentWave()) {
            this.currentWaveNo++;
            if (this.currentWaveNo > waveConfig.length) {
                this.currentWaveNo = 1;
                this.waveMultiplierIfOverLimit++;
            }
            gameManager.titleObject.displayNewTitle("Wave cleared!");
            this.resetWave();
        } else if (gameManager.magicBarrier.currentHealthPoints <= 0) {
            this.enemies.forEach(value => value.die())
            gameManager.magicBarrier.currentHealthPoints = 100;
            gameManager.titleObject.displayNewTitle("Wave failed!");
            this.resetWave();
        }
    }

    resetWave() {
        gameManager.magicBarrier.deactivateBarrier();
        this.waveActive = false;
        this.defeatedEnemiesCounter = 0;
        gameManager.waveButton.disabled = false;
        gameManager.waveButton.innerHTML = "Start wave " + this.currentWaveNo;

        if(Math.random() <= this.chanceThatTheMerchantAppears){
            this.merchant = new Merchant();
        }
    }

    addToCounterOfDefeatedEnemies() {
        this.defeatedEnemiesCounter++;
    }

    trackDefeatedEnemies() {
        gameManager.gameCanvas.drawLayer.save();
        gameManager.gameCanvas.drawLayer.font = 'bold 25px \'MedievalSharp\'';
        gameManager.gameCanvas.drawLayer.fillStyle = 'black';
        gameManager.gameCanvas.drawLayer.textAlign = 'right';
        gameManager.gameCanvas.drawLayer.fillText("Enemies: " + this.defeatedEnemiesCounter + "/" + this.getTotalAmountOfEnemiesFromCurrentWave() * this.waveMultiplierIfOverLimit, gameCanvas.canvasBoundaries.right - 10, 30);
        gameManager.gameCanvas.drawLayer.restore();
    }

    getTotalAmountOfEnemiesFromCurrentWave() {
        let sumOfEnemies = 0;
        waveConfig[this.currentWaveNo - 1].enemies.forEach(enemy => sumOfEnemies += enemy.amount);
        return sumOfEnemies;
    }

    getRandomItemNameWithTierFromItems(tier) {
        let allItems = [];
        for (let itemCategory in items) {
            allItems[itemCategory] = [];
            for (let item in items[itemCategory]) {
                if (items[itemCategory][item].tier === tier) {
                    allItems[itemCategory].push(item)
                }
            }
        }

        let randomCategoryNumb = Math.floor(Math.random() * 4);
        let randomItemNumb = Math.floor(Math.random() * allItems[getItemCategoryFromIndex(randomCategoryNumb)].length);
        return getItemCategoryFromIndex(randomCategoryNumb) + ":" + allItems[getItemCategoryFromIndex(randomCategoryNumb)][randomItemNumb];
    }
}