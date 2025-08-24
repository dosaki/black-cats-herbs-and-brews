import { onClick, onMouseDown, onMouseUp } from '../../utils/interaction';
import { Drawable } from './Drawable';

export class ItemContainer extends Drawable {
    constructor(triggerElement, parentElement, imageMatrix, mirrorImage, colours) {
        super(triggerElement, imageMatrix, mirrorImage, colours);
        this.triggerElement = triggerElement;
        this.parentElement = parentElement;
        this.size = 10;
        this.items = [];
        onMouseDown(this.triggerElement, () => {
            this.onMouseDown();
        });
        onMouseUp(this.triggerElement, () => {
            this.onMouseUp();
        });
    }

    addAll(items) {
        items.forEach(item => this.add(item));
    }

    add(item) {
        if (this.items.length < this.size) {
            this.items.push(item);
        } else {
            throw new Error("It's full");
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
            throw new Error("Item not found");
        }
        this.items = this.items.filter(i => i.uuid !== item.uuid);
        return item;
    }

    upgrade(newSize) {
        this.size = newSize;
    }

    onClickItem(item, itemContainerElement) {
        console.log("Item clicked:", item);
    }

    onMouseDownItem(item, itemContainerElement) {
        console.log("Item mouse down:", item);
        window.shop.currentlyHolding = item;
        window.shop.currentlyHoldingOrigin = this;
    }

    onMouseUpItem(item, itemContainerElement) {
        console.log("Item mouse up:", item);
    }

    onMouseUp() {
        console.log("Mouse up");
        if (window.shop.currentlyHolding && window.shop.currentlyHoldingOrigin !== this) {
            window.shop.currentlyHoldingOrigin.remove(window.shop.currentlyHolding);
            this.add(window.shop.currentlyHolding);
            window.shop.currentlyHolding = null;
            window.shop.currentlyHoldingOrigin = null;
        }
    }

    onMouseDown() {
        console.log("Mouse down");
    }

    drawContents() {
        this.parentElement.innerHTML = "";
        this.parentElement.style.background = this.background;
        const itemHolder = document.createElement("div");
        itemHolder.classList.add("item-holder");
        this.items.forEach(i => {
            const drawnItem = i.draw();
            onClick(drawnItem, () => this.onClickItem(i, drawnItem));
            onMouseDown(drawnItem, () => this.onMouseDownItem(i, drawnItem));
            onMouseUp(drawnItem, () => this.onMouseUpItem(i, drawnItem));
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