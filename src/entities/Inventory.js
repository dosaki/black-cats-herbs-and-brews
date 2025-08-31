import { ItemManager } from '../config/ItemManager';
import { ItemContainer } from './generic/ItemContainer';

export class Inventory extends ItemContainer {
    constructor(triggerElement, parentElement) {
        super(triggerElement, parentElement, null, ['#000000FF', '#3d1904FF']);
        this.sizeIncrement = 5;
        this.size = 10;
        this.items = [];
    }

    drawContents() {
        super.drawContents();
        this.parentElement.classList = ["inventory"];

        const goldNumber = document.createElement("div");
        goldNumber.innerText = `${window.player.gold}🪙`;
        const debtMarker = document.createElement("div");
        debtMarker.classList.add("debt-marker");
        debtMarker.innerText = window.player.debt > 0 ? '(↘)' : '';

        const buyIngredientsButton = document.createElement("button");
        buyIngredientsButton.innerText = "shop";
        buyIngredientsButton.onclick = () => {
            const shopOptions = ItemManager.ingredients.map(i => {
                return [`${i.shopPrice}🪙 - ${i.name}`, () => {
                    window.player.buyItem(i);
                }];
            });
            window.popUpWithOptions("shop", {
                ...Object.fromEntries(shopOptions),
                "close": window.closePopUp
            });
        };

        const goldDisplay = document.createElement("div");
        goldDisplay.classList.add("gold-display");
        goldDisplay.appendChild(goldNumber);
        goldDisplay.appendChild(buyIngredientsButton);
        this.parentElement.appendChild(goldDisplay);
    }

    draw() {
        super.draw();
    }
}