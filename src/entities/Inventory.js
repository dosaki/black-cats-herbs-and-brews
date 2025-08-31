import { ItemManager } from '../config/ItemManager';
import { coin } from '../drawables/images';
import { asDataUrl } from '../utils/draw';
import { ItemContainer } from './generic/ItemContainer';

export class Inventory extends ItemContainer {
    constructor(triggerElement, parentElement) {
        super(triggerElement, parentElement, null, true, ['#000000FF', '#3d1904FF']);
        this.sizeIncrement = 5;
        this.size = 10;
        this.items = [];
    }

    drawContents() {
        super.drawContents();
        this.parentElement.classList = ["inventory"];

        const goldNumber = document.createElement("div");
        goldNumber.innerText = window.player.gold;
        const debtMarker = document.createElement("div");
        debtMarker.classList.add("debt-marker");
        debtMarker.innerText = window.player.debt > 0 ? '(↘)' : '';
        const goldIcon = document.createElement("img");
        goldIcon.src = asDataUrl(coin, false, ["#000000ff", "#ecbc40ff", "#c2822cff", "#d99b35ff"]);

        const buyIngredientsButton = document.createElement("button");
        buyIngredientsButton.innerText = "Shop";
        buyIngredientsButton.onclick = () => {
            const shopOptions = ItemManager.ingredients.map(i => {
                return [`${i.shopPrice}g - ${i.name}`, () => {
                    window.player.buyItem(i);
                }];
            });
            window.popUpWithOptions("Shop", {
                ...Object.fromEntries(shopOptions),
                "Cancel": window.closePopUp
            });
        };

        const goldDisplay = document.createElement("div");
        goldDisplay.classList.add("gold-display");
        goldDisplay.appendChild(goldIcon);
        goldDisplay.appendChild(goldNumber);
        goldDisplay.appendChild(buyIngredientsButton);
        this.parentElement.appendChild(goldDisplay);
    }

    draw() {
        super.draw();
    }
}