class UIManager {
    uiCanvas;

    currentPage = undefined;
    textSize = 30;

    interactButton;

    constructor() {
        console.log("UI-Manager created!");
    }

    setUiCanvas(uiCanvas) {
        this.uiCanvas = uiCanvas;
    }

    setInteractButton(interactButton){
        this.interactButton = interactButton;
        this.interactButton.disabled = true;
    }

    initializePage() {
        this.uiCanvas.drawLayer.clearRect(0, 0, this.uiCanvas.canvasBoundaries.right, this.uiCanvas.canvasBoundaries.bottom);
        if (this.currentPage === undefined) {
            this.initializeDefaultPage();
            this.setInteractButtonTextAndDisabledProperties("Interact", true);
        }
        if (this.currentPage instanceof ItemOnFloor) {
            this.setInteractButtonTextAndDisabledProperties("Equip!", false);
            this.drawHeader();
            this.drawText(capitalizeFirstLetterOfWord(this.currentPage.name.split(':')[0]), this.uiCanvas.canvasBoundaries.right / 2, 150, 50, 'center');
            this.drawText(this.currentPage.name.split(':')[1], this.uiCanvas.canvasBoundaries.right / 2, 200, 40, 'center');

            let pathToItemImg = "Items/" + items[this.currentPage.name.split(':')[0]][this.currentPage.name.split(':')[1]].imageFileName;
            this.drawImageWithFrame(pathToItemImg, this.uiCanvas.canvasBoundaries.right / 16, this.uiCanvas.canvasBoundaries.bottom / 2.5, 180);
            this.drawStatsOfCurrentItem();
        }
    }

    initializeDefaultPage() {
        this.drawHeader();
    }

    drawHeader(){
        this.drawText('Player-Level: ' + playerManager.currentLevel, 10, this.textSize + 2, this.textSize, 'left');
        this.drawImg("GoldCoin.png", this.uiCanvas.canvasBoundaries.right - 45, 5, 40, 32);
        this.drawText(playerManager.goldCoinsAmount + 'x', this.uiCanvas.canvasBoundaries.right - 50, this.textSize + 2, this.textSize, 'right');
    }

    drawText(text, x, y, size, alignment) {
        this.uiCanvas.drawLayer.save();
        this.uiCanvas.drawLayer.beginPath();
        this.uiCanvas.drawLayer.font = 'bold ' + size + 'px Arial';
        this.uiCanvas.drawLayer.fillStyle = 'black';
        this.uiCanvas.drawLayer.textAlign = alignment;
        this.uiCanvas.drawLayer.fillText(text, x, y);
        this.uiCanvas.drawLayer.closePath();
        this.uiCanvas.drawLayer.restore();
    }

    drawImageWithFrame(imageName, x, y, width, height = width) {
        this.drawImg(imageName, x, y, width, height, true);
    }

    drawImg(imageName, x, y, width, height, frame = false) {
        let image = new Image();
        image.src = "./Sprites/" + imageName;
        console.log(image.src)
        image.onload = function () {
            uiManager.uiCanvas.drawLayer.save();
            uiManager.uiCanvas.drawLayer.beginPath();
            uiManager.uiCanvas.drawLayer.drawImage(image, 0, 0, width * (image.width / width), height * (image.height / height), x, y, width, height);
            uiManager.uiCanvas.drawLayer.closePath();
            uiManager.uiCanvas.drawLayer.restore();
            if(frame){
                uiManager.uiCanvas.drawLayer.save();
                uiManager.uiCanvas.drawLayer.beginPath();
                uiManager.uiCanvas.drawLayer.strokeStyle = 'black';
                uiManager.uiCanvas.drawLayer.lineWidth = 12;
                uiManager.uiCanvas.drawLayer.roundRect(x - 5, y - 5, width + 10, height + 10, 20)
                uiManager.uiCanvas.drawLayer.stroke();
                uiManager.uiCanvas.drawLayer.closePath();
                uiManager.uiCanvas.drawLayer.restore();
            }
        }
    }

    drawStatsOfCurrentItem() {
        let item = items[this.currentPage.name.split(':')[0]][this.currentPage.name.split(':')[1]];
        let textSize = 25;

        this.drawText("Intelligence: " + item.intelligence, this.uiCanvas.canvasBoundaries.right / 2, this.uiCanvas.canvasBoundaries.bottom / 2.1, textSize, "left");
        this.drawText("Spell Cast Rate: " + item.spellCastRate, this.uiCanvas.canvasBoundaries.right / 2, this.uiCanvas.canvasBoundaries.bottom / 2.1 + 40, textSize, "left");
        this.drawText("Magic Crit.: " + item.magicCrit, this.uiCanvas.canvasBoundaries.right / 2, this.uiCanvas.canvasBoundaries.bottom / 2.1 + 80, textSize, "left");
    }

    setInteractButtonTextAndDisabledProperties(text, disabled) {
        this.interactButton.disabled = disabled;
        this.interactButton.innerHTML = text;
    }
}