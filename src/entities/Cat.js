import { ItemManager } from '../config/ItemManager';
import { cat } from '../drawables/images';
import { onClick, onMouseIn, onMouseUp } from '../utils/interaction';
import { int, pick } from '../utils/random';
import { Drawable } from './generic/Drawable';

export class Cat extends Drawable {
    constructor(canvas) {
        super(canvas,
            cat,
            ["#000000ff", "#282828ff", "#171717ff"],
            { x: 5, y: 0, width: 23, height: 22 });
        this.canvas = canvas;
        this.hunger = 0;
        this.isGone = false;
        onClick(this.canvas, () => {
            this.onClick();
        });

        onMouseUp(this.canvas, (e) => {
            if (window.shop.currentlyHolding && window.shop.currentlyHolding.type === "animal") {
                window.shop.currentlyHoldingOrigin.remove(window.shop.currentlyHolding);
                window.shop.drawCurrentWindow();
                window.shop.currentlyHoldingOrigin.draw();
                window.shop.currentlyHolding = null;
                window.shop.currentlyHoldingOrigin = null;
                this.hunger = 0;
            }
            return false;
        });

        onMouseIn(this.canvas, () => {
            window.tooltipShowWithIcon(canvas.toDataURL(), "your black cat", `your mischievous feline familiar ${this.isHungry ? "looks hungry" : this.hunger < 50 ? "is purring happily" : "looks restless"}.`);
            return false;
        }, false);

        this.doMischief();
    }

    get isHungry() {
        return this.hunger > 70;
    }

    doMischief() {
        if (window.paused || this.isGone) {
            setTimeout(() => {
                this.doMischief();
            });
            return;
        }

        if (this.isHungry && pick(true, true, this.hunger >= 100)) {
            if (window.player.inventory.items.length > 0) {
                this.bounce();
                let item = pick(...window.player.inventory.items);
                if (item.type === "animal") {
                    this.hunger = 0;
                }
                window.player.inventory.remove(item);
                window.player.inventory.draw();
                window.shop.drawCurrentWindow();
            } else if (!this.isGone) {
                this.disappear();
                setTimeout(() => {
                    this.appear();
                    this.hunger = 0;
                }, 30000);
            }
        }
        setTimeout(() => {
            this.doMischief();
            this.hunger = Math.min(this.hunger - int(0, 10), 100);
        }, int(10000, 20000));
    }

    bounce() {
        this.canvas.classList.add("bounce");
        setTimeout(() => {
            this.canvas.classList.remove("bounce");
        }, 1000);
    }

    appear() {
        this.isGone = false;
        setTimeout(() => {
            this.canvas.classList.add("cat-out");
            this.canvas.classList.remove("cat-in");
            this.canvas.classList.remove("cat-out-anim");
            this.canvas.classList.remove("cat-in-anim");
            setTimeout(() => {
                this.canvas.classList.remove("cat-out");
                this.canvas.classList.add("cat-in-anim");
            }, 1);
        }, 1);
        setTimeout(() => {
            this.canvas.classList.remove("cat-in-anim");
        }, 1000);
    }

    disappear() {
        this.isGone = true;
        setTimeout(() => {
            this.canvas.classList.remove("cat-out");
            this.canvas.classList.remove("cat-in");
            this.canvas.classList.remove("cat-out-anim");
            this.canvas.classList.remove("cat-in-anim");
            setTimeout(() => {
                this.canvas.classList.add("cat-out-anim");
            }, 1);
        }, 1);
        setTimeout(() => {
            this.canvas.classList.add("cat-out");
            this.canvas.classList.remove("cat-out-anim");
        }, 1000);
    }

    findItem() {
        return pick(...ItemManager.ingredients).clone();
    }

    onClick() {
        this.disappear();
        setTimeout(() => {
            if (window.player.inventory.hasSpace) {
                setTimeout(() => {
                    if (pick(true, false, false, false, false)) {
                        window.player.gold += int(5, 10) === 5 ? int(10, 100) : int(5, 10);
                    } else {
                        window.player.inventory.add(this.findItem());
                    }
                    window.player.inventory.draw();
                    window.shop.drawCurrentWindow();
                }, 1000);
            }
            this.appear();
        }, int(5000, 10000));
    }
}
