export class Item {
    constructor(name, description, type, value, icon) {
        this.uuid = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.type = type;
        this.value = value;
        this.icon = icon;
    }

    draw() {
        const itemContainerElement = document.createElement("div");
        itemContainerElement.classList.add("item-container");
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerText = this.name;
        itemElement.style.backgroundImage = `url(${this.icon})`;
        itemContainerElement.appendChild(itemElement);
        return itemContainerElement;
    }

    clone() {
        return new Item(this.name, this.description, this.type, this.value, this.icon);
    }
}
