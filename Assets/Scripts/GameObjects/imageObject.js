class ImageObject extends GameObject{
    image;
    imageFilePath;
    isKinamtic

    constructor(name, fileName, x, y, width, height, kinematic = false){
        super(name, x, y, width, height);
        this.image = new Image();
        this.imageFilePath = "./Sprites/" + fileName;
        this.isKinamtic = kinematic;
    }

    draw(){
        this.image.src = this.imageFilePath;
        gameManager.gameCanvas.drawLayer.beginPath();
        gameManager.gameCanvas.drawLayer.drawImage(this.image, 0, 0, this.dimensions.width*(this.image.width/this.dimensions.width), this.dimensions.height*(this.image.height/this.dimensions.height), this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.gameCanvas.drawLayer.closePath();
    }
}