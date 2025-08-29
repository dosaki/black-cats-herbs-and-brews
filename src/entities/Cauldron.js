import { onClick, onMouseDown, onMouseUp } from '../utils/interaction';
import { ItemContainer } from './generic/ItemContainer';
import { WebGLHandler, makeFumesShader } from '../effects/fumes';
import { ItemManager } from '../config/ItemManager';
import { cauldronTop } from '../drawables/images';
import { hexToRgbA } from '../utils/colour';

export class Cauldron extends ItemContainer {
    constructor(triggerElement, parentElement) {
        super(
            triggerElement,
            parentElement,
            cauldronTop,
            true,
            ["#000000ff", "#453333ff", "#382828ff", "#423030ff"]
        );
        this.size = 3;
        this.brewingRecipe = null;
        this.resultSlot = null;
    }

    brew() {
        this.brewingRecipe = ItemManager.findRecipe(this.items);

        if (!this.brewingRecipe) {
            this.items = [];
            this.drawContents();
            throw new Error("Oops... I've screwed up my recipe");
        }
        this.items = [];
        this.draw();
        setTimeout(() => {
            this.resultSlot = this.brewingRecipe.produceResult();
            this.brewingRecipe = null;
            this.draw();
            window.shop.drawCurrentWindow();
        }, this.brewingRecipe.brewingTimeInSeconds * 1000);
        return this.brewingRecipe;
    }

    drawContents() {
        super.drawContents();
        this.parentElement.classList = ["cauldron"];
        const brewButton = document.createElement("button");
        brewButton.innerText = "Brew";
        onClick(brewButton, () => {
            try {
                this.brew();
            } catch (e) {
                window.popUpMsg(e.message, 2500);
            }
        });
        this.parentElement.appendChild(brewButton);

        const itemHolder = document.createElement("div");
        itemHolder.classList.add("item-holder");
        if (this.resultSlot) {
            const drawnItem = this.resultSlot.draw();
            onClick(drawnItem, () => {
                window.shelves.add(this.resultSlot);
                this.resultSlot = null;
            });
            itemHolder.appendChild(drawnItem);
        } else {
            const itemContainerElement = document.createElement("div");
            itemContainerElement.classList.add("item-container", "empty");
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemContainerElement.appendChild(itemElement);
            itemHolder.appendChild(itemContainerElement);
        }

        this.parentElement.appendChild(itemHolder);
    }

    draw() {
        super.draw();
        if (this.brewingRecipe) {
            const canvas = cldrn_fx.appendChild(document.createElement("canvas"));
            canvas.style.display = "block";
            canvas.width = cldrn_fx.clientWidth / 10;
            canvas.height = cldrn_fx.clientHeight / 10;
            const [r, g, b, a] = hexToRgbA(this.brewingRecipe.result.mainColour);
            const webGL = new WebGLHandler(canvas, makeFumesShader(r, g, b));
        } else {
            cldrn_fx.innerHTML = "";
        }
    }
}