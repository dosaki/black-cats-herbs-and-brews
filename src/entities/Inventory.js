import { ItemContainer } from './generic/ItemContainer';

export class Inventory extends ItemContainer {
    constructor(triggerElement, parentElement) {
        super(triggerElement, parentElement, null, true, ['#000000FF', '#3d1904FF']);
        this.size = 10;
        this.items = [];
    }

    drawContents() {
        super.drawContents();
        this.parentElement.classList = ["inventory"];
        const goldDisplay = document.createElement("div");
        goldDisplay.classList.add("gold-display");
        goldDisplay.innerText = `Gold: ${window.player.gold}`;
        this.parentElement.appendChild(goldDisplay);
    }

    draw() {
        super.draw();
    }
}