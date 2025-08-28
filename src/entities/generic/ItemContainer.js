import { onClick, onHover, onMouseDown, onMouseIn, onMouseOut, onMouseUp } from '../../utils/interaction';
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

    onClickItem(item, itemContainerElement, event) {
        console.log("Item clicked:", item);
    }

    onMouseDownItem(item, itemContainerElement, event) {
        console.log("Item mouse down:", item);
        window.shop.currentlyHolding = item;
        window.shop.currentlyHoldingOrigin = this;
    }

    onMouseUpItem(item, itemContainerElement, event) {
        console.log("Item mouse up:", item);
    }

    onMouseInItem(item, itemContainerElement, event) {
        tooltip.innerHTML = "";
        const iconHolder = document.createElement("div");
        iconHolder.classList.add("item-icon-holder");
        const icon = document.createElement("img");
        icon.classList.add("item-icon");
        icon.src = item.icon;
        iconHolder.appendChild(icon);
        tooltip.appendChild(iconHolder);
        tooltip.style.display = 'block';
    }

    onMouseOutItem(item, itemContainerElement, event) {
        tooltip.innerHTML = "";
        tooltip.style.display = 'none';
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
            onClick(drawnItem, (e) => this.onClickItem(i, drawnItem, e));
            onMouseDown(drawnItem, (e) => this.onMouseDownItem(i, drawnItem, e));
            onMouseUp(drawnItem, (e) => this.onMouseUpItem(i, drawnItem, e));
            onMouseIn(drawnItem, (e) => this.onMouseInItem(i, drawnItem, e));
            onMouseOut(drawnItem, (e) => this.onMouseOutItem(i, drawnItem, e));
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