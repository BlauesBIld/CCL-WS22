class Merchant extends ImageObject{
    merchantsRhino;
    shopArea = new GameObject("shop", gameCanvas.canvasBoundaries.right/2+70, gameCanvas.canvasBoundaries.bottom/2+80, 80, gameCanvas.canvasBoundaries.bottom/2-240);
    patArea = new GameObject("pat",gameCanvas.canvasBoundaries.right/2+70, gameCanvas.canvasBoundaries.bottom-160, 80, 160);

    randomItemsInShop = [];

    constructor() {
        super("wall", "Merchant.png", gameCanvas.canvasBoundaries.right/2+150, gameCanvas.canvasBoundaries.bottom/2+100, 300, gameCanvas.canvasBoundaries.bottom/2-100);
        this.merchantsRhino = new Rhino();
        titleObject.displayNewTitle("The Merchant has appeared!");
        this.initializeThreeRandomItemsWithPrices();
    }

    update() {
        super.update();
        if(this.shopArea.isCollidingWith(player)){
            console.log("hallo");
            uiManager.currentPage = this;
        } else if (this.patArea.isCollidingWith(player)){
            uiManager.setInteractButtonTextAndDisabledProperties("Pat", false);
            uiManager.setOnClickOfInteractButton("pat");
        }
    }

    draw(){
        super.draw();
    }

    initializeThreeRandomItemsWithPrices() {
        for (let i = 0; i < 3; i++) {
            this.randomItemsInShop.push({
                item: waveManager.getRandomItemNameWithTierFromItems(1),
                price: Math.floor(Math.random() * 30 + 15)
            })
        }
    }
}