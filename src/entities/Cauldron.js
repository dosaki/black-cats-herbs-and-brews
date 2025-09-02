import { onClick, } from '../utils/interaction';
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
            ["#000000ff", "#453333ff", "#382828ff", "#423030ff"]
        );
        this.size = 3;
        this.sizeIncrement = 1;
        this.brewingRecipe = null;
        this.resultSlot = null;
    }

    brew() {
        this.brewingRecipe = ItemManager.findRecipe(this.items);

        if (!this.brewingRecipe) {
            this.items = [];
            this.drawContents();
            throw new Error("oops... i've screwed up my recipe");
        } else {
            if(!window.player.knownRecipes.includes(this.brewingRecipe)){
                window.player.knownRecipes.push(this.brewingRecipe);
            }
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
        let recipeButton = document.createElement("button");
        recipeButton.innerText = "show known recipes";
        onClick(recipeButton, () => {
            let recipesContainer = document.createElement("div");
            recipesContainer.classList.add("recipes-container");
            window.player.knownRecipes.forEach(recipe => {
                recipesContainer.appendChild(recipe.asElement());
            });
            let closeButton = document.createElement("button");
            closeButton.innerText = "close";
            onClick(closeButton, () => {
                window.closePopUp();
            });
            window.popUp([recipesContainer, closeButton]);
        });
        let brewButton = document.createElement("button");
        brewButton.innerText = "brew";
        onClick(brewButton, () => {
            try {
                this.brew();
            } catch (e) {
                window.popUpMsg(e.message, 2500);
            }
        });
        this.parentElement.appendChild(brewButton);

        let itemHolder = document.createElement("div");
        itemHolder.classList.add("item-holder");
        if (this.resultSlot) {
            let drawnItem = this.resultSlot.draw();
            onClick(drawnItem, () => {
                window.shelves.add(this.resultSlot);
                this.resultSlot = null;
            });
            itemHolder.appendChild(drawnItem);
        } else {
            let itemContainerElement = document.createElement("div");
            itemContainerElement.classList.add("item-container", "empty");
            let itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemContainerElement.appendChild(itemElement);
            itemHolder.appendChild(itemContainerElement);
        }

        this.parentElement.appendChild(itemHolder);
        this.parentElement.appendChild(recipeButton);
    }

    draw() {
        super.draw();
        if (this.brewingRecipe) {
            let canvas = cldrn_fx.appendChild(document.createElement("canvas"));
            canvas.style.display = "block";
            canvas.width = cldrn_fx.clientWidth / 10;
            canvas.height = cldrn_fx.clientHeight / 10;
            console.log(this.brewingRecipe.result.mainColour)
            let [r, g, b, a] = hexToRgbA(this.brewingRecipe.result.mainColour);
            let webGL = new WebGLHandler(canvas, makeFumesShader(r, g, b));
        } else {
            cldrn_fx.innerHTML = "";
        }
    }
}