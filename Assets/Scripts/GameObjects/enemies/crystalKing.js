class CrystalKing extends Enemy {
    constructor(name, size) {
        super("CrystalKing", "./Enemies/" + name + ".png", gameManager.gameCanvas.canvasBoundaries.right / 2 - (size * waveManager.enemyDefaultSize) / 2, 100, waveManager.enemyDefaultSize * size, waveManager.enemyDefaultSize * size);
    }
}