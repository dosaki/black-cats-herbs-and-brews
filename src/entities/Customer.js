import { femaleVillagerSkirt, maleVillagerBeard, maleVillagerClean } from '../drawables/images';
import { adjust, base10ToHex, newColour } from '../utils/colour';
import { onClick, onMouseUp } from '../utils/interaction';
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
    dlg_text.innerHTML = "";
    dlg_opt.innerHTML = "";
    setTimeout(() => {
        dlg_c.style.display = 'block';
        dlg_text.innerHTML = line.text;
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
    dlg_text.innerHTML = "";
    dlg_opt.innerHTML = "";
    setTimeout(() => {
        nextDialogue();
    }, int(1000, 5000));
};

const waitForSale = () => {
    dlg_c.style.display = 'none';
    dlg_text.innerHTML = "";
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
            isFemale ? pick(femaleVillagerSkirt) : pick(maleVillagerBeard, maleVillagerClean),
            false,
            isFemale ? ["#000000ff", hairShading, hairColour, skinColour, "#ffffffff", eyeColour, topColour, "#cd6644ff", "#ce3b4dff", "#77624cff", "#e7d3bcff", topShading, bottomShading, bottomColour, "#a65111ff"] : ["#000000ff", hairShading, hairColour, skinColour, "#ffffffff", eyeColour, "#a2462dff", "#8b2d16ff", topShading, topColour, "#b38558ff", "#e9c897ff", "#b26824ff", bottomShading, bottomColour]
        );

        this.wants = wants; // Array of items the customer wants
        this.inventory = [];
        this.goldNeeded = this.wants.reduce((total, item) => total + item.value, 0);
        this.gold = pick(this.goldNeeded, int(this.goldNeeded / 2, this.goldNeeded * 2), 10);

        this.currentLineIndex = -1;
        const justBrowsing = pick(true, false, false, false);
        const wantLine = `${pick("Do you have", "Can I get", "May I have", "How much for")} ${formatWants(this.wants)}?`;
        const browsingLine = pick("Just browsing", "I'm just looking");
        const greetingLine = pick("Hi!", "Hello!", "Greetings!", "Hi! Cute cat.", "Excuse me...", "Hey! I love your cat.");
        this.lines = [
            {
                text: greetingLine,
                options: [
                    { text: `${greetingLine.includes("cat") ? pick("She's my familiar.", "Thanks!", "She appreciates it.") : pick("Hello!", "Welcome!", "Hi!")} ${pick("Do you need help?", "How can I help?", "Looking for something special?")}`, action: nextDialogue },
                    { text: "Get the hells out of my shop!", action: leave }
                ]
            },
            justBrowsing ? {
                text: browsingLine,
                options: [
                    { text: browsingLine === "I can't do this" ? pick("What do you mean...?", "Ooookay...") : pick("Sure", "Please go ahead"), action: wait },
                    { text: pick("If you're not buying, get out.", "Leave.", "Get out.", "This isn't a museum."), action: leave }
                ]
            } : {
                text: wantLine,
                options: [
                    { text: pick("Give me a moment.", "I'll prepare that for you.", `That will be ${this.goldNeeded} gold.`), action: waitForSale },
                    { text: pick("I'm afraid I can't help you with that.", "Sorry, I don't have what you need."), action: leave }
                ]
            },
            {
                text: pick("Bye!", "Goodbye!", "Have a good day."),
                options: [
                    { text: pick("Come again!", "Take care!", "Goodbye!", "Tell your friends!"), action: leave }
                ]
            }
        ];
        this._waitingTimeout = null;
        this.hasWaited = false;

        onMouseUp(this.canvas, () => {
            this.onMouseUp();
        });
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
        this.canvas.style.transform = 'scale(1, 1)';
        this.canvas.style.left = '32px';
        setTimeout(() => {
            this.doDialogue();
        }, 650);
    }

    disappear() {
        this.canvas.style.transform = 'scale(-1, 1)';
        dlg_c.style.display = 'none';
        dlg_text.innerHTML = "";
        dlg_opt.innerHTML = "";
        setTimeout(() => {
            this.canvas.style.left = '-340px';
            setTimeout(() => {
                window.customer = null;
            }, 1000);
        }, 200);
    }

    pay(gold) {
        this.gold -= gold;
        populateDialogue({
            text: pick(`Here's ${gold} gold`),
            options: [
                {
                    text: pick("Thanks!", "I appreciate it."), action: () => {
                        player.inventory.draw();
                        window.shop.drawCurrentWindow();
                        leave();
                    }
                }
            ]
        });
    }

    returnItems() {
        window.player.inventory.addAll(this.inventory);
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
                        text: pick("I don't have enough gold.", "Oh... I can't afford that"),
                        options: [
                            { text: pick("I'm not running a charity here!", "Then get out.", "I'm afraid you need to leave."), action: () => { this.returnItems(); } },
                            {
                                text: pick("What can you afford?", "Just give me however much you can spare."), action: () => {
                                    populateDialogue({
                                        text: pick(`I can offer you ${this.gold} gold.`, `Is ${this.gold} gold enough?`),
                                        options: [
                                            { text: "Yes", action: () => { this.pay(this.gold); } },
                                            { text: "No", action: () => { this.returnItems(); } }
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
                        text: pick("Actually, I've changed my mind.", "I'll come back later.", "This is taking too long."),
                        options: [{ text: pick("Bye", "Okay", "Come back later!"), action: () => { this.returnItems(); } }]
                    });
                } else {
                    populateDialogue({
                        text: pick("Will it take long?", "How much longer?", "Is it ready yet?"),
                        options: [
                            {
                                text: pick("It'll be ready soon.", "Just a moment longer.", "I'm almost done."), action: () => {
                                    this.hasWaited = true;
                                    clearTimeout(this._waitingTimeout);
                                    waitForSale();
                                }
                            },
                            { text: pick("Sorry, I can't help after all.", `I'm afraid I'm all out of ${formatWants(this.wants)}`), action: () => { this.returnItems(); } }
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
            throw new Error("Item not found");
        }
        this.inventory = this.inventory.filter(i => i.uuid !== item.uuid);
        return item;
    }

    onMouseUp() {
        if (window.shop.currentlyHolding && window.shop.currentlyHoldingOrigin !== this) {
            window.shop.currentlyHoldingOrigin.remove(window.shop.currentlyHolding);
            this.add(window.shop.currentlyHolding);
            window.shop.currentlyHolding = null;
            window.shop.currentlyHoldingOrigin = null;
            clearTimeout(this._waitingTimeout);
            this.waitForSale();
        }
    }
}