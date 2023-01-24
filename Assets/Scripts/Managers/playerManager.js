class PlayerManager {
    intelligence = {
        base: 5,
        value: 0
    };

    spellCastRate = {
        base: 0,
        value: 0
    };

    magicCrit = {
        base: 0,
        value: 0
    };

    movementSpeed = 5;

    goldCoinsAmount = 0;

    currentLevel = 1;
    currentExpPoints = 0;
    maxExpPoints = 100;

    equipped = {
        weapon: undefined,
        robe: undefined,
        hat: undefined,
        accessory: undefined,
    }


    constructor() {
        console.log("Player-Manager created!")
    }

    pickUpItem(item) {
        if (item.name === 'goldcoin') {
            this.goldCoinsAmount++;
            if (uiManager.currentPage === undefined) {
                uiManager.initializePage();
            }
        } else {
            playerManager.equipItem(item.name.split(':')[0], item.name.split(':')[1])
        }
    }

    recalculateStats() {
        this.calculateStat("intelligence");
        this.calculateStat("spellCastRate");
        this.calculateStat("magicCrit");
    }

    calculateStat(statName) {
        this[statName].value = this[statName].base;
        let additionForCurrentLevel = (Math.sqrt(this.currentLevel)*10);
        if(statName === "magicCrit"){
            additionForCurrentLevel = this.currentLevel;
        }
        if (this.equipped.weapon !== undefined) {
            this[statName].value += this.equipped.weapon[statName] + additionForCurrentLevel;
        }
        if (this.equipped.robe !== undefined) {
            this[statName].value += this.equipped.robe[statName] + additionForCurrentLevel;
        }
        if (this.equipped.hat !== undefined) {
            this[statName].value += this.equipped.hat[statName] + additionForCurrentLevel;
        }
        if (this.equipped.accessory !== undefined) {
            this[statName].value += this.equipped.accessory[statName] + additionForCurrentLevel;
        }
    }

    equipItem(itemType, itemName) {
        this.equipped[itemType] = items[itemType][itemName];
        uiManager.initializePage();
    }

    getIntelligence() {
        return this.intelligence.value;
    }

    getSpellCastRate() {
        return 600 - this.spellCastRate.value;
    }

    getSpellCastRateToDisplay(){
        return this.spellCastRate.value;
    }

    getMagicCrit() {
        return this.magicCrit.value;
    }

    gainExperience(amountOfExpPoints) {
        this.currentExpPoints += amountOfExpPoints;
        if (this.currentExpPoints >= this.maxExpPoints) {
            this.currentExpPoints = 0;
            this.maxExpPoints += 20;
            this.currentLevel++;
            uiManager.initializePage();
        }
    }
}