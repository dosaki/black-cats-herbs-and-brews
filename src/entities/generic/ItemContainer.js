import { onClick, onHover, onMouseDown, onMouseIn, onMouseOut, onMouseUp } from '../../utils/interaction';
import { Drawable } from './Drawable';

export class ItemContainer extends Drawable {
    constructor(triggerElement, parentElement, imageMatrix, mirrorImage, colours) {
        super(triggerElement, imageMatrix, mirrorImage, colours);
        this.triggerElement = triggerElement;
        this.parentElement = parentElement;
        this.upgradeCost = 50;
        this.size = 10;
        this.items = [];
        onMouseDown(this.triggerElement, () => {
            this.onMouseDown();
        });
        onMouseUp(this.triggerElement, () => {
            this.onMouseUp();
        });
    }

    get isEmpty() {
        return this.items.length === 0;
    }

    get hasSpace() {
        return this.items.length < this.size;
    }

    addAll(items) {
        items.forEach(item => this.add(item));
    }

    add(item) {
        if (this.hasSpace) {
            this.items.push(item);
        } else {
            throw new Error("it's full");
        }
    }

    hasItemType(itemName) {
        return this.items.some(i => i.name === itemName);
    }

    hasAllItems(itemNames) {
        return itemNames.every(name => this.hasItemType(name));
    }

    remove(item) {
        if (!item) {
            throw new Error("item not found");
        }
        this.items = this.items.filter(i => i.uuid !== item.uuid);
        return item;
    }

    upgrade() {
        if(window.player.gold >= this.upgradeCost){
            this.size = this.size + this.sizeIncrement;
            window.player.gold -= this.upgradeCost;
            this.upgradeCost = Math.ceil(this.upgradeCost * 1.5);
        }
        this.drawContents();
    }

    onClickItem(item, itemContainerElement, event) {
    }

    onMouseDownItem(item, itemContainerElement, event) {
        window.shop.currentlyHolding = item;
        window.shop.currentlyHoldingOrigin = this;
    }

    onMouseUpItem(item, itemContainerElement, event) {
    }

    onMouseInItem(item, itemContainerElement, event) {
        window.tooltipShowWithIcon(item.icon, item.name, `${item.description}\n\nsells for: ${item.value}g`);
        return false;
    }

    onMouseOutItem(item, itemContainerElement, event) {
        window.tooltipHide();
        return false;
    }

    onMouseUp() {
        if (window.shop.currentlyHolding && window.shop.currentlyHoldingOrigin !== this) {
            try {
                this.add(window.shop.currentlyHolding);
                window.shop.currentlyHoldingOrigin.remove(window.shop.currentlyHolding);
            } catch (e) {
                window.popUpMsg(e.message, 1500);
            }
            window.shop.currentlyHolding = null;
            window.shop.currentlyHoldingOrigin = null;
        }
    }

    onMouseDown() {
    }

    drawContents() {
        this.parentElement.innerHTML = "";
        this.parentElement.style.background = this.background;
        const upgradeButton = document.createElement("button");
        upgradeButton.innerText = "upgrade";
        if(window.player.gold >= this.upgradeCost){
            upgradeButton.onclick = () => this.upgrade();
        } else {
            upgradeButton.disabled = true;
        }
        this.parentElement.appendChild(upgradeButton);
        const itemHolder = document.createElement("div");
        itemHolder.classList.add("item-holder");
        this.items.forEach(i => {
            const drawnItem = i.draw();
            onClick(drawnItem, (e) => this.onClickItem(i, drawnItem, e));
            onMouseDown(drawnItem, (e) => this.onMouseDownItem(i, drawnItem, e));
            onMouseUp(drawnItem, (e) => this.onMouseUpItem(i, drawnItem, e));
            onMouseIn(drawnItem, (e) => this.onMouseInItem(i, drawnItem, e));
            // onMouseOut(drawnItem, (e) => this.onMouseOutItem(i, drawnItem, e));
            itemHolder.appendChild(drawnItem);
        });
        for (let i = this.items.length; i < this.size; i++) {
            const itemContainerElement = document.createElement("div");
            itemContainerElement.classList.add("item-container", "empty");
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemContainerElement.appendChild(itemElement);
            itemHolder.appendChild(itemContainerElement);
        }
        this.parentElement.appendChild(itemHolder);
    }
}