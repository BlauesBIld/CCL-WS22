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

    setInteractButton(interactButton) {
        this.interactButton = interactButton;
        this.interactButton.disabled = true;
    }

    initializePage() {
        playerManager.recalculateStats();
        this.uiCanvas.drawLayer.clearRect(0, 0, this.uiCanvas.canvasBoundaries.right, this.uiCanvas.canvasBoundaries.bottom);
        this.setOnClickOfInteractButton("clear");
        if (this.currentPage === undefined) {
            this.initializeDefaultPage();
        } else if (this.currentPage instanceof ItemOnFloor) {
            this.setOnClickOfInteractButton("pickUp");
            this.setInteractButtonTextAndDisabledProperties("Equip!", false);
            this.drawHeader();
            this.drawItemOnTheFloor();
            this.drawItemCurrentlyEquipped();
        } else if (this.currentPage instanceof Merchant){
            console.log("seas")
        }
    }

    initializeDefaultPage() {
        this.drawHeader();
        this.drawEquipmentOnDefaultPage();
        this.drawStatsOnDefaultPage();
    }

    drawEquipmentOnDefaultPage() {
        this.setInteractButtonTextAndDisabledProperties("Interact", true);
        this.drawGearFrames();
        this.drawGearIcons();
    }

    drawHeader() {
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

    drawImageWithFrame(imageName, x, y, width, height = width, frameLineWidth, opacity = 1) {
        this.drawImg(imageName, x, y, width, height, true, frameLineWidth, opacity);
    }

    drawImg(imageName, x, y, width, height, frame = false, frameLineWidth = 12, opacity = 1) {
        let image = new Image();
        image.src = "./Sprites/" + imageName;
        image.onload = function () {
            uiManager.uiCanvas.drawLayer.save();
            uiManager.uiCanvas.drawLayer.beginPath();
            uiManager.uiCanvas.drawLayer.globalAlpha = opacity;
            uiManager.uiCanvas.drawLayer.drawImage(image, 0, 0, width * (image.width / width), height * (image.height / height), x, y, width, height);
            uiManager.uiCanvas.drawLayer.closePath();
            uiManager.uiCanvas.drawLayer.restore();
            if (frame) {
                uiManager.uiCanvas.drawLayer.save();
                uiManager.uiCanvas.drawLayer.beginPath();
                uiManager.uiCanvas.drawLayer.strokeStyle = 'black';
                uiManager.uiCanvas.drawLayer.lineWidth = frameLineWidth;
                uiManager.uiCanvas.drawLayer.roundRect(x - 5, y - 5, width + 10, height + 10, 20)
                uiManager.uiCanvas.drawLayer.stroke();
                uiManager.uiCanvas.drawLayer.closePath();
                uiManager.uiCanvas.drawLayer.restore();
            }
        }
    }

    drawStatsOfCurrentItemOnTheFloor() {
        let item = items[this.currentPage.name.split(':')[0]][this.currentPage.name.split(':')[1]];
        let textSize = 25;

        this.drawText("Intelligence: " + item.intelligence, this.uiCanvas.canvasBoundaries.right / 2, this.uiCanvas.canvasBoundaries.bottom / 2.2, textSize, "left");
        this.drawText("Spell Cast Rate: " + item.spellCastRate, this.uiCanvas.canvasBoundaries.right / 2, this.uiCanvas.canvasBoundaries.bottom / 2.2 + 40, textSize, "left");
        this.drawText("Magic Crit.: " + item.magicCrit, this.uiCanvas.canvasBoundaries.right / 2, this.uiCanvas.canvasBoundaries.bottom / 2.2 + 80, textSize, "left");
    }

    drawItemOnTheFloor() {
        this.drawText(capitalizeFirstLetterOfWord(this.currentPage.name.split(':')[0]), this.uiCanvas.canvasBoundaries.right / 2, 100, 50, 'center');
        this.drawText(this.currentPage.name.split(':')[1], this.uiCanvas.canvasBoundaries.right / 2, 150, 40, 'center');

        let pathToItemImg = "Items/" + items[this.currentPage.name.split(':')[0]][this.currentPage.name.split(':')[1]].imageFileName;
        this.drawImageWithFrame(pathToItemImg, this.uiCanvas.canvasBoundaries.right / 16, this.uiCanvas.canvasBoundaries.bottom / 2.7, 180);
        this.drawStatsOfCurrentItemOnTheFloor();
    }

    setInteractButtonTextAndDisabledProperties(text, disabled) {
        this.interactButton.disabled = disabled;
        this.interactButton.innerHTML = text;
    }

    drawGearFrames() {
        let pathToImg = "",
            iconSize = 100,
            offset = 30,
            distLeft = 45;

        for (let i = 0; i < 4; i++) {
            if (playerManager.equipped[getItemCategoryFromIndex(i)] !== undefined) {
                pathToImg = "Items/" + playerManager.equipped[getItemCategoryFromIndex(i)].imageFileName;
            } else {
                pathToImg = "Empty.png";
            }
            this.drawImageWithFrame(pathToImg, distLeft, 80 + iconSize * (i) + (offset * i), iconSize, iconSize, 8);
        }
    }

    drawGearIcons() {
        let iconSize = 80,
            offset = 50,
            distLeft = 55,
            opacity = 0.4;
        for (let i = 0; i < 4; i++) {
            this.drawGearIconBackground(getItemCategoryFromIndex(i), "UI/" + capitalizeFirstLetterOfWord(getItemCategoryFromIndex(i)) + "Icon.png", distLeft, 90 + iconSize * (i) + (offset * i), iconSize, iconSize, opacity);
        }
    }

    drawGearIconBackground(itemCategory, imageName, x, y, width, height, opacity) {
        let image = new Image();
        image.src = "./Sprites/" + imageName;
        image.onload = function () {
            if (playerManager.equipped[itemCategory] === undefined) {
                uiManager.uiCanvas.drawLayer.save();
                uiManager.uiCanvas.drawLayer.beginPath();
                uiManager.uiCanvas.drawLayer.globalAlpha = opacity;
                uiManager.uiCanvas.drawLayer.drawImage(image, 0, 0, width * (image.width / width), height * (image.height / height), x, y, width, height);
                uiManager.uiCanvas.drawLayer.closePath();
                uiManager.uiCanvas.drawLayer.restore();
            }
        }
    }

    setOnClickOfInteractButton(toWhat) {
        switch (toWhat) {
            case "clear":
                this.interactButton.onclick = null;
                break;
            case "pickUp":
                this.interactButton.onclick = function () {
                    let item = uiManager.currentPage;
                    uiManager.currentPage.destroy();
                    uiManager.currentPage = undefined;
                    playerManager.pickUpItem(item);
                };
                break;
            case "pat":
                this.interactButton.onclick = function () {
                    waveManager.merchant.merchantsRhino.startPatting();
                };
                break;
        }

    }

    drawStatsOnDefaultPage() {
        let titleSize = 45,
            statsSize = 32,
            paddingBetweenStats = 40,
            paddingToTop = 160;

        this.drawText("Player Stats", this.uiCanvas.canvasBoundaries.right / 1.5, paddingToTop, titleSize, "center");
        paddingBetweenStats += 60;
        this.drawText("Intelligence", this.uiCanvas.canvasBoundaries.right / 1.5, paddingToTop + paddingBetweenStats, statsSize, "center");
        paddingBetweenStats += 40;
        this.drawText("- " + Math.floor(playerManager.getIntelligence()) + " -", this.uiCanvas.canvasBoundaries.right / 1.5, paddingToTop + paddingBetweenStats, statsSize, "center");
        paddingBetweenStats += 60;
        this.drawText("Spell Cast Rate", this.uiCanvas.canvasBoundaries.right / 1.5, paddingToTop + paddingBetweenStats, statsSize, "center");
        paddingBetweenStats += 40;
        this.drawText("- " + Math.floor(playerManager.getSpellCastRateToDisplay()) + " -", this.uiCanvas.canvasBoundaries.right / 1.5, paddingToTop + paddingBetweenStats, statsSize, "center");
        paddingBetweenStats += 60;
        this.drawText("Magic Crit", this.uiCanvas.canvasBoundaries.right / 1.5, paddingToTop + paddingBetweenStats, statsSize, "center");
        paddingBetweenStats += 40;
        this.drawText("- " + Math.floor(playerManager.getMagicCrit()) + " -", this.uiCanvas.canvasBoundaries.right / 1.5, paddingToTop + paddingBetweenStats, statsSize, "center");
    }

    drawItemCurrentlyEquipped() {
        let distLeft = 50,
            distBottom = 80,
            iconSize = 60,
            statsText = "";

        this.drawText("Currently Equipped " + capitalizeFirstLetterOfWord(this.currentPage.name.split(':')[0]), this.uiCanvas.canvasBoundaries.right / 2, this.uiCanvas.canvasBoundaries.bottom - 110, 25, "center");
        if (playerManager.equipped[this.currentPage.name.split(':')[0]] !== undefined) {
            let itemEquipped = playerManager.equipped[this.currentPage.name.split(':')[0]];
            statsText = "Int.: " + itemEquipped.intelligence + " / S.C.R.: " + itemEquipped.spellCastRate + " / M-Crit.: " + itemEquipped.magicCrit;

            this.drawImageWithFrame("Items/" + playerManager.equipped[this.currentPage.name.split(':')[0]].imageFileName, distLeft, this.uiCanvas.canvasBoundaries.bottom - distBottom, iconSize, iconSize, 6);
            } else {
            statsText = "Int.: - / S.C.R.: - / Magic Crit: -";
            this.drawImageWithFrame("UI/" + capitalizeFirstLetterOfWord(this.currentPage.name.split(':')[0]) + "Icon.png", distLeft, this.uiCanvas.canvasBoundaries.bottom - distBottom, iconSize, iconSize, 6, 0.4);
        }
        this.drawText(statsText, this.uiCanvas.canvasBoundaries.right/2 + distLeft, this.uiCanvas.canvasBoundaries.bottom - (distBottom/2), 20, "center");
    }
}