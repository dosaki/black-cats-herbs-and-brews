import { ItemManager } from '../config/ItemManager';
import { witch } from '../drawables/images';
import { int } from '../utils/random';
import { Drawable } from './generic/Drawable';

export class Player extends Drawable {
    constructor(canvas, gold, inventory) {
        super(canvas,
            witch,
            ["#000000ff", "#a8aba6ff", "#bdc2c0ff", "#d29558ff", "#3f3a3aff", "#ffffffff", "#289769ff", "#b46a47ff", "#740c0cff"]
        );
        this.gold = gold;
        this._debt = [];
        this.inventory = inventory;
        this.chosenOption = null;
        this.previousLine = null;
        this.knownRecipes = [
            ItemManager.recipes[0]
        ];
    }

    get debt() {
        return this._debt.reduce((acc, d) => acc + d.current, 0);
    }

    get dailyDebt() {
        return this._debt.map(d => {
            let _payment = Math.ceil(d.original / 30);
            return Math.min(d.current, _payment);
        }).reduce((acc, curr) => acc + curr, 0);
    }

    get debtPortion() {
        return this._debt.reduce((a, b) => a + b, 0) / 365;
    }

    addDebt(value) {
        this._debt.push({ current: Math.ceil(value), original: Math.ceil(value) });
    }

    payDebt() {
        this._debt = this._debt.map(d => {
            let _payment = Math.ceil(d.original / 30);
            let payment = Math.min(d.current, _payment);
            this.gold -= payment;
            return {
                ...d,
                current: Math.max(0, Math.ceil(d.current - payment))
            };
        }).filter(d => d.current > 0);
    }

    buyRecipe(recipe, gold) {
        if (this.gold < gold) {
            window.closePopUp(100);
            setTimeout(() => {
                window.popUpMsg("you can't afford this", 1500);
            }, 500);
            return;
        }
        this.gold -= gold;
        this.knownRecipes.push(recipe);
    }

    buyItem(item) {
        if (this.gold < item.shopPrice) {
            window.closePopUp(100);
            setTimeout(() => {
                window.popUpMsg("you can't afford this", 1500);
            }, 500);
            return;
        }
        try {
            this.inventory.add(item);
        } catch (error) {
            window.closePopUp(500);
            setTimeout(() => {
                window.popUpMsg(error.message, 1500);
            }, 500);
            return;
        }
        this.gold -= item.shopPrice;
    }

    animate() {
        if (this.imageMatrix[10][16] !== 4 && int(0, 30) < 1) {
            this.imageMatrix[10][16] = 4;
            this.imageMatrix[10][17] = 4;
            this.imageMatrix[11][16] = 4;
            this.imageMatrix[11][17] = 4;
            this.imageMatrix[10][22] = 4;
            this.imageMatrix[10][23] = 4;
            this.imageMatrix[11][22] = 4;
            this.imageMatrix[11][23] = 4;
        } else {
            if (window.customer) {
                this.imageMatrix[10][16] = 7;
                this.imageMatrix[10][17] = 6;
                this.imageMatrix[11][16] = 7;
                this.imageMatrix[11][17] = 6;
            } else {
                this.imageMatrix[10][16] = 6;
                this.imageMatrix[10][17] = 7;
                this.imageMatrix[11][16] = 6;
                this.imageMatrix[11][17] = 7;
            }
            this.imageMatrix[10][22] = 7;
            this.imageMatrix[10][23] = 6;
            this.imageMatrix[11][22] = 7;
            this.imageMatrix[11][23] = 6;
        }
        return true;
    }
}
