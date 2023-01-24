class PlayerObject extends ImageObject {
    timeStampLastTimeAttackBallFired = 0;
    isShooting = false;

    mousePosX;
    mousePosY;

    velocity = {
        xLeft: 0,
        xRight: 0,
        yUp: 0,
        yDown: 0
    }
    playerSafeZone = undefined;

    constructor(name, src, x, y, width, height) {
        super(name, src, x, y, width, height);
        console.log("PlayerFigure has been created");
        this.playerSafeZone = new GameObject("safezone", gameManager.castle.safeZone.position.x, gameManager.castle.safeZone.position.y + this.dimensions.height, gameManager.castle.dimensions.width, gameManager.castle.dimensions.height - this.dimensions.height);

    }

    update() {
        this.move();
        this.isThePlayerInTheSafeZone();
        if (this.isShooting) {
            this.shoot();
        }

        if (enemyManager.waveActive === false) {
            gameManager.waveButton.disabled = !this.isThePlayerInTheSafeZone();
        }

        if(uiManager.currentPage instanceof ItemOnFloor){
            if(!this.isCollidingWith(uiManager.currentPage)){
                uiManager.currentPage = undefined;
                uiManager.initializePage();
            }
        }
    }

    shoot() {
        if (this.timeStampLastTimeAttackBallFired + playerManager.spellCastRate.value < Date.now()) {
            new AttackBall("attackBall", "FireBall.png", 80, this.mousePosX, this.mousePosY);
            this.timeStampLastTimeAttackBallFired = Date.now();
        }
    }

    onCollision(otherObject) {
        if (otherObject.name === "wall" && otherObject.isActive === true) {
            this.reStorePosition();
        }
    }

    move() {
        this.position.x += (this.velocity.xRight - this.velocity.xLeft) * playerManager.movementSpeed * this.getUnitFactorIfWalkingDiagonal();
        this.position.y += (this.velocity.yDown - this.velocity.yUp) * playerManager.movementSpeed * this.getUnitFactorIfWalkingDiagonal();
    }

    isThePlayerInTheSafeZone() {
        return this.isCollidingWith(this.playerSafeZone);
    }

    getUnitFactorIfWalkingDiagonal() {
        if (Math.pow(this.velocity.xRight - this.velocity.xLeft, 2) === 1 && Math.pow(this.velocity.yDown - this.velocity.yUp, 2) === 1) {
            return 0.66;
        }
        return 1;
    }
}
