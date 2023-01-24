class Enemy extends ImageObject {
    hpBar;
    currentHealthPoints = 100;
    maxHealthPoints = 100;

    speed = 0.5;

    origin = {
        x: 0,
        y: 0
    }

    attackSpeed = 2500;
    attackDamage = 100;
    touchingBarrier = false;
    timeStampLastTimeDealtDamage = 0;

    constructor(name, src, x, y, width, height) {
        super(name, src, x, y, width, height);
        this.hpBar = new HPBar(x, y, width, height);
        this.hpBar.enemy = this;
        this.origin.x = x;
        this.origin.y = y;
        enemyManager.addEnemy(this);
    }

    update() {
        this.bindHPBarPositionToEnemyPosition();
        this.moveTowardsBottomMid();

        if (this.touchingBarrier) {
            if (this.timeStampLastTimeDealtDamage + this.attackSpeed < Date.now()) {
                this.timeStampLastTimeDealtDamage = Date.now();
                gameManager.magicBarrier.receiveDamage(this.attackDamage);
            }
        }
    }

    bindHPBarPositionToEnemyPosition() {
        this.hpBar.position.x = this.position.x;
        this.hpBar.position.y = this.position.y + this.hpBar.offsetY;

        this.hpBar.border.position.x = this.position.x;
        this.hpBar.border.position.y = this.position.y + this.hpBar.offsetY;
    }

    moveTowardsBottomMid() {
        let directionX = gameManager.gameCanvas.canvasBoundaries.right / 2 - this.origin.x;
        let directionY = gameManager.gameCanvas.canvasBoundaries.bottom - this.origin.y;

        let directionVectorLength = Math.sqrt(directionX * directionX + directionY * directionY);

        let directionXNormalised = (directionX) / directionVectorLength;
        let directionYNormalised = (directionY) / directionVectorLength;

        this.position.x += directionXNormalised * this.speed;
        this.position.y += directionYNormalised * this.speed;
    }

    onCollision(otherObject) {
        if (otherObject.name === "magicBarrier") {
            this.speed = 0;
            this.touchingBarrier = true;
        }
    }

    receiveDamage(damage) {
        this.currentHealthPoints -= damage;
        this.hpBar.dimensions.width = this.hpBar.border.dimensions.width * (this.currentHealthPoints / this.maxHealthPoints);

        new FadingPopUp("-" + damage, this.position.x + this.dimensions.width, this.position.y - 20, 35);

        if (this.currentHealthPoints <= 0) {
            this.die();
        }
    }

    die() {
        enemyManager.addToCounterOfDefeatedEnemies();
        this.dropLoot();
        this.destroy();
        this.hpBar.destroy();
        this.hpBar.border.destroy();
    }

    dropLoot() {
        let numb = Math.random();
        if (numb <= enemyManager.chanceThatEnemyDropsGold) {
            gameManager.dropGoldCoin(this.position.x, this.position.y);
        }
        console.log("Lucky number for Gold drop was: " + numb);
        numb = Math.random();
        if (numb <= enemyManager.chanceThatEnemyDropsItem) {
            gameManager.dropItem(enemyManager.getRandomItemNameWithCategoryFromItems(1), this.position.x, this.position.y);
        }
        console.log("Lucky number for Item drop was: " + numb);
    }
}