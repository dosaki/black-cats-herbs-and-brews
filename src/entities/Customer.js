import { femaleVillagerSkirt, maleVillagerBeard } from '../drawables/images';
import { adjust, base10ToHex, newColour } from '../utils/colour';
import { onClick, onMouseIn, onMouseUp } from '../utils/interaction';
import { int, pick } from '../utils/random';
import { Drawable } from './generic/Drawable';

const formatWants = (wants) => {
    if (wants.length === 1) {
        return wants[0].name;
    } else {
        return `${wants.slice(0, -1).map(item => item.name).join(", ")} and ${wants[wants.length - 1].name}`;
    }
};

const populateDialogue = (line) => {
    dlg_c.style.display = 'none';
    dlg_txt.innerHTML = "";
    dlg_opt.innerHTML = "";
    setTimeout(() => {
        dlg_c.style.display = 'block';
        dlg_txt.innerHTML = line.text;
        setTimeout(() => {
            populateOptions(line.options || []);
        }, 650);
    }, 200);
};

const populateOptions = (options) => {
    const list = document.createElement('ul');
    options.forEach(option => {
        const optionElement = document.createElement('li');
        optionElement.innerHTML = option.text;
        onClick(optionElement, () => {
            option.action();
        });
        list.appendChild(optionElement);
    });
    dlg_opt.innerHTML = "";
    dlg_opt.appendChild(list);
};

const leave = () => {
    window.customer.disappear();
};

const nextDialogue = () => {
    window.customer.doDialogue(window.customer.nextLine);
};

const wait = () => {
    dlg_c.style.display = 'none';
    dlg_txt.innerHTML = "";
    dlg_opt.innerHTML = "";
    setTimeout(() => {
        nextDialogue();
    }, int(1000, 5000));
};

const waitForSale = () => {
    dlg_c.style.display = 'none';
    dlg_txt.innerHTML = "";
    dlg_opt.innerHTML = "";
    window.customer.waitForSale();
};

export class Customer extends Drawable {
    constructor(canvas, wants) {
        const topColour = newColour(int(0, 360) / 360, 0.5, 0.4) + "ff";
        const topShading = adjust(topColour, -50) + "ff";
        const bottomColour = newColour(int(0, 360) / 360, 0.7, 0.3) + "ff";
        const bottomShading = adjust(bottomColour, -50) + "ff";
        const eyeColour = newColour(int(0, 360) / 360, 0.8, 0.5) + "ff";
        const hairRedChannel = `${int(22, 99)}`.padStart(2, '0');
        const hairGreenChannel = `${int(0, 20)}`.padStart(2, '0');
        const hairBlueChannel = `${int(0, 20)}`.padStart(2, '0');
        const hairGrays = base10ToHex(int(0, 200));
        const hairColour = pick(`#${hairGrays}${hairGrays}${hairGrays}ff`, `#${hairRedChannel}${hairGreenChannel}${hairBlueChannel}ff`);
        const hairShading = adjust(hairColour, -20) + "ff";
        const skinColour = pick("#513021ff", "#874c2cff", "#803716ff", "#b66837ff", "#a96238ff", "#f9bf91ff", "#ecc19fff");
        const isFemale = pick(true, false);
        super(canvas,
            isFemale ? femaleVillagerSkirt : maleVillagerBeard,
            isFemale ? ["#000000ff", hairShading, hairColour, skinColour, "#ffffffff", eyeColour, topColour, "#cd6644ff", "#ce3b4dff", "#77624cff", "#e7d3bcff", topShading, bottomShading, bottomColour, "#a65111ff"] : ["#000000ff", hairShading, hairColour, skinColour, "#ffffffff", eyeColour, "#a2462dff", "#8b2d16ff", topShading, topColour, "#b38558ff", "#e9c897ff", "#b26824ff", bottomShading, bottomColour]
        );

        this.wants = wants; // Array of items the customer wants
        this.inventory = [];
        this.goldNeeded = this.wants.reduce((total, item) => total + item.value, 0);
        this.gold = pick(this.goldNeeded, int(this.goldNeeded / 2, this.goldNeeded * 2), 10);

        this.currentLineIndex = -1;
        this.justBrowsing = pick(true, false, false, false);
        this._waitingTimeout = null;
        this.hasWaited = false;
        onMouseUp(this.canvas, () => {
            this.onMouseUp();
        });
        onMouseIn(this.canvas, () => {
            this.onMouseIn();
        });
    }

    get lines() {
        const wantLine = `${pick("do you have", "may i have")} ${formatWants(this.wants)}?`;
        const browsingLine = pick("just browsing", "i'm just looking");
        const greetingLine = pick("hi!", "hello!", "hi! cute cat.", "hey! i love your cat.");
        return [
            {
                text: greetingLine,
                options: [
                    { text: `${greetingLine.includes("cat") ? pick("thanks!", "she appreciates it.") : pick("hello!", "hi!")} ${pick("how can i help?", "looking for something special?")}`, action: nextDialogue },
                    { text: "get the hells out of my shop!", action: leave }
                ]
            },
            this.justBrowsing ? {
                text: browsingLine,
                options: [
                    { text: "sure", action: () => {
                        if(pick(true, false, false)){
                            this.justBrowsing = false;
                            this.currentLineIndex = 0;
                        }
                        wait();
                    } },
                    { text: pick("if you're not buying, get the hells out of my shop!", "this isn't a museum."), action: leave }
                ]
            } : {
                text: wantLine,
                options: [
                    { text: `that will be ${this.goldNeeded} gold.`, action: waitForSale },
                    { text: pick("i'm afraid i can't help you with that.", "sorry, i don't have what you need."), action: leave }
                ]
            },
            {
                text: pick("bye!", "goodbye!", "have a good day."),
                options: [
                    { text: pick("come again!", "take care!", "goodbye!", "tell your friends!"), action: leave }
                ]
            }
        ];
    }

    get nextLine() {
        this.currentLineIndex++;
        return this.lines[this.currentLineIndex];
    }

    doDialogue(nextLine) {
        const line = nextLine || this.nextLine;
        populateDialogue(line);
    }

    appear() {
        this.canvas.style.bottom = `${pick(-4, 0) * 10}px`;
        this.canvas.style.transform = 'scale(1,1)';
        this.canvas.style.left = '32px';
        setTimeout(() => {
            this.doDialogue();
        }, 650);
    }

    disappear() {
        this.canvas.style.transform = 'scale(-1,1)';
        dlg_c.style.display = 'none';
        dlg_txt.innerHTML = "";
        dlg_opt.innerHTML = "";
        setTimeout(() => {
            this.canvas.style.left = '-340px';
            setTimeout(() => {
                this.canvas.remove();
                window.customer = null;
            }, 1000);
        }, 200);
    }

    pay(gold) {
        this.gold -= gold;
        populateDialogue({
            text: pick(`here's ${gold} gold`),
            options: [
                {
                    text: "thanks!", action: () => {
                        player.gold += gold;
                        player.inventory.draw();
                        window.shop.drawCurrentWindow();
                        leave();
                    }
                }
            ]
        });
    }

    returnItems() {
        try {
            window.player.inventory.addAll(this.inventory);
        } catch (error) {
            window.popUpMsg("not enough shelf space!", 2000);
            return;
        }
        this.inventory = [];
        leave();
        player.inventory.draw();
        window.shop.drawCurrentWindow();
    }

    waitForSale() {
        this._waitingTimeout = setTimeout(() => {
            if (!window.customer) {
                clearTimeout(this._waitingTimeout);
                return;
            }

            if (this.hasAllItems(this.wants.map(i => i.name))) {
                clearTimeout(this._waitingTimeout);
                if (this.gold >= this.goldNeeded) {
                    this.pay(this.goldNeeded);
                } else {
                    populateDialogue({
                        text: "i don't have enough gold.",
                        options: [
                            { text: pick("i'm not running a charity here!", "then get out."), action: () => { this.returnItems(); } },
                            {
                                text: "what can you afford?", action: () => {
                                    populateDialogue({
                                        text: `is ${this.gold} gold enough?`,
                                        options: [
                                            { text: "yes", action: () => { this.pay(this.gold); } },
                                            { text: "no", action: () => { this.returnItems(); } }
                                        ]
                                    });
                                }
                            }
                        ]
                    });
                }
            } else if (int(0, 10) > 8) {
                if (this.hasWaited && pick(true, true, false)) {
                    populateDialogue({
                        text: "this is taking too long.",
                        options: [{ text: "okay", action: () => { this.returnItems(); } }]
                    });
                } else {
                    populateDialogue({
                        text: pick("will it take long?", "how much longer?", "is it ready yet?"),
                        options: [
                            {
                                text: pick("just a moment longer.", "i'm almost done."), action: () => {
                                    this.hasWaited = true;
                                    clearTimeout(this._waitingTimeout);
                                    waitForSale();
                                }
                            },
                            { text: pick("i'm afraid i can't help you with that.", "sorry, i don't have what you need."), action: () => { this.returnItems(); } }
                        ]
                    });
                }
            } else {
                clearTimeout(this._waitingTimeout);
                waitForSale();
            }
        }, 1000);
    }

    addAll(items) {
        items.forEach(item => this.add(item));
    }

    add(item) {
        this.inventory.push(item);
    }

    hasItemType(itemName) {
        return this.inventory.some(i => i.name === itemName);
    }

    hasAllItems(itemNames) {
        return itemNames.every(name => this.hasItemType(name));
    }

    remove(item) {
        if (!item) {
            throw new Error("item not found");
        }
        this.inventory = this.inventory.filter(i => i.uuid !== item.uuid);
        return item;
    }

    wantsItem(itemName) {
        console.log(this.wants.map(i => i.name), itemName);
        return this.wants.map(i => i.name).includes(itemName);
    }

    onMouseUp() {
        if (window.shop.currentlyHolding && window.shop.currentlyHoldingOrigin !== this) {
            if (!this.wantsItem(window.shop.currentlyHolding.name)) {
                this.doDialogue({
                    text: "that's not what i'm looking for.",
                    options: [{
                        text: "okay",
                        action: () => {
                            this.currentLineIndex = 0;
                            nextDialogue();
                        }
                    }]
                });
                return;
            }
            window.shop.currentlyHoldingOrigin.remove(window.shop.currentlyHolding);
            this.add(window.shop.currentlyHolding);
            window.shop.currentlyHolding = null;
            window.shop.currentlyHoldingOrigin = null;
            clearTimeout(this._waitingTimeout);
            this.waitForSale();
        }
    }

    onMouseIn() {
        const wants = this.currentLineIndex > 0 ? this.justBrowsing ? 'this customer is just browsing.' : `this customer wants ${formatWants(this.wants)}.` : "you don't know what they want.";
        const has = this.inventory.length > 0 ? `you've given them ${formatWants(this.inventory)}.` : "";
        window.tooltipShowWithIcon(this.canvas.toDataURL(), "customer", `${wants}\n${has}`);
    }
}