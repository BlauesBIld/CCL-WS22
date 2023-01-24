class GameManager {
    gameObjects = [];
    gameCanvas = null;
    uiCanvas = null;

    secondsPassed;
    oldTimeStamp;
    fps;

    waveButton;
    magicBarrier;
    titleObject;
    castle;

    constructor() {
        console.log("Game-Manager created!");
    }

    gameLoop(timeStamp) {
        gameCanvas.drawLayer.clearRect(0, 0, gameCanvas.canvasHTMLElement.width, gameCanvas.canvasHTMLElement.height);

        gameManager.trackFps(timeStamp);
        for (let gameLoopState = 0; gameLoopState < 3; gameLoopState++) {
            gameManager.gameObjects.forEach((gameObject) => {
                if (gameObject.isActive) {
                    if (gameLoopState === 0) {
                        gameObject.storePosition();
                        gameObject.update();
                    }
                    if (gameLoopState === 1) {
                        gameManager.checkObjectsForCollisions(gameObject);
                    }
                    if (gameLoopState === 2) {
                        gameObject.draw();
                    }
                }
            });

            if (enemyManager.waveActive) {
                enemyManager.checkIfWaveDone();
                enemyManager.trackDefeatedEnemies();
            }

            magicBarrier.trackHealth();
        }
        requestAnimationFrame(gameManager.gameLoop);
    }

    trackFps(timeStamp) {
        // Calculate the number of seconds passed since the last frame
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;

        // Calculate fps
        this.fps = Math.round(1 / this.secondsPassed);

        // Draw number to the screen
        this.gameCanvas.drawLayer.save();
        this.gameCanvas.drawLayer.font = 'bold 25px \'MedievalSharp\'';
        this.gameCanvas.drawLayer.fillStyle = 'black';
        this.gameCanvas.drawLayer.textAlign = 'left';
        this.gameCanvas.drawLayer.fillText("FPS: " + this.fps, 10, 30);
        this.gameCanvas.drawLayer.restore();
    }

    checkObjectsForCollisions(object1) {

        for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
            let object2 = gameManager.gameObjects[i];
            if (object2.isActive) {
                if (object1.isCollidingWith(object2)) {
                    object1.onCollision(object2);
                    object2.onCollision(object1);
                }
            }
        }
    }

    addGameObject(object) {
        this.gameObjects.push(object);
        object.gameObjectIndex = this.gameObjects.length - 1;
    }

    setGameCanvas(canvas) {
        this.gameCanvas = canvas;
    }

    setUICanvas(canvas) {
        this.uiCanvas = canvas;
    }

    setWaveButton(waveButton) {
        this.waveButton = waveButton;
        this.waveButton.onclick = function () {
            enemyManager.startWave();
        };
    }

    setMagicBarrier(magicBarrier) {
        this.magicBarrier = magicBarrier;
    }

    setTitleObject(titleObject) {
        this.titleObject = titleObject;
    }

    setCastle(castleObj) {
        this.castle = castleObj;
    }

    dropGoldCoin(x, y) {
        new ItemOnFloor("goldcoin", "GoldCoin.png", x, y, 55, 42, false, true);
    }

    dropItem(name, x, y) {
        new ItemOnFloor(name, "DroppedItem.png", x, y, 55, 55, false, false);
    }
}