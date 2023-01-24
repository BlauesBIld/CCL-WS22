let gameManager = new GameManager();
let enemyManager = new EnemyManager();
let playerManager = new PlayerManager();
let uiManager = new UIManager();

let gameCanvas = new Canvas("gameCanvas"),
    uiCanvas = new Canvas("uiCanvas");

gameManager.setWaveButton(document.getElementById("waveButton"));
uiManager.setInteractButton(document.getElementById("interactButton"));

gameManager.setGameCanvas(gameCanvas);
uiManager.setUiCanvas(uiCanvas);
uiManager.initializePage();

let grasTileSize = 40;
setupRandomGrasTiles();

let magicBarrier = new MagicBarrier();
gameManager.setMagicBarrier(magicBarrier);
let castleObj = new Castle("castle", "Castle.png", 0, 0, gameCanvas.canvasBoundaries.right, gameCanvas.canvasBoundaries.bottom);
gameManager.setCastle(castleObj);

let playerHeight = 1024/7.5,
    playerWidth = 768/7.5,
    player = new PlayerObject("player", "MageBack.png", gameCanvas.canvasBoundaries.right / 2 - playerWidth / 2, gameCanvas.canvasBoundaries.bottom - playerHeight - 20, playerWidth, playerHeight);

let gameCanvasLeft = gameCanvas.canvasHTMLElement.offsetLeft + gameCanvas.canvasHTMLElement.clientLeft,
    gameCanvasTop = gameCanvas.canvasHTMLElement.offsetTop + gameCanvas.canvasHTMLElement.clientTop;

gameCanvas.canvasHTMLElement.addEventListener("mousemove", function (event) {
    let x = event.pageX - gameCanvasLeft,
        y = event.pageY - gameCanvasTop;

    player.mousePosX = x;
    player.mousePosY = y;
})

gameCanvas.canvasHTMLElement.addEventListener("mousedown", function (event) {
    player.isShooting = true;
});

gameCanvas.canvasHTMLElement.addEventListener("mouseup", function (event) {
    player.isShooting = false;
});

let titleObject = new TitleObject();
gameManager.setTitleObject(titleObject);

playerManager.equipItem("weapon", "WoodenRod");
gameManager.dropItem(enemyManager.getRandomItemNameWithCategoryFromItems(1), 650, 450);

requestAnimationFrame(gameManager.gameLoop);

function setupRandomGrasTiles() {
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            let grasTileIndex = getRandomInt(7) + 1;
            new GrasTile("gras" + i, "Gras" + grasTileIndex + ".png", grasTileSize, gameCanvas.canvasBoundaries.right / 12 * i, gameCanvas.canvasBoundaries.bottom / 12 * j);
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomPositionOnXAxis() {
    return getRandomInt(gameManager.gameCanvas.canvasBoundaries.right);
}

function capitalizeFirstLetterOfWord(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}