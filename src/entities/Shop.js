import { daysInMonth, getMonth, incrementDate } from '../utils/dates';
import { resizeImage } from '../utils/draw';

export class Shop {
    constructor() {
        this.currentWindow = "inventory";
        this._currentlyHolding = null;
        this.currentlyHoldingOrigin = null;
        this.drawables = [];
        this.date = new Date(2025, 0, 1);
        this.previousDate = null;
        this.rentDue = 0;
    }

    get currentlyHolding() {
        return this._currentlyHolding;
    }

    set currentlyHolding(item) {
        this._currentlyHolding = item;
        if (item && item.icon) {
            resizeImage(item.icon, 4, (dataUrl) => {
                document.body.style.cursor = `url(${dataUrl}), pointer`;
            });
        } else {
            document.body.style.cursor = "auto";
        }
    }

    resetCalendar() {
        clndr_days.innerHTML = "";
        clndr_month.innerHTML = `${getMonth(this.date)} ${this.date.getFullYear()}`;
        let dayOfTheWeek = this.date.getDay() || 7;
        for (let i = 0; i < dayOfTheWeek - 1; i++) {
            let empty = document.createElement("div");
            empty.classList.add("day-empty");
            clndr_days.appendChild(empty);
        }
        for (let i = 0; i < daysInMonth(this.date); i++) {
            let day = document.createElement("div");
            day.classList.add("day", `day-${i + 1}`, `day-w${(dayOfTheWeek + i) % 7}`);
            clndr_days.appendChild(day);
        }
    }

    selectCauldron() {
        this.currentWindow = "cauldron";
    }

    selectShelf() {
        this.currentWindow = "inventory";
    }

    increaseTime() {
        incrementDate(this.date);
        clndr_day.innerHTML = this.date.getDate();
        document.querySelector(`.day-${this.date.getDate()}`).classList.add("ticked");
        if (this.date.getDate() === 1) {
            this.dueRent();
            this.resetCalendar();
        }
        this.dueDebt();
    }

    dueDebt() {
        if (!window.player.debt) {
            return;
        }

        window.player.payDebt();
        this.drawMoneys();
    }

    dueRent() {
        this.rentDue += 550;
        window.pause();
        let delayedCost = Math.round(this.rentDue * 1.1);

        window.popUpWithOptions(
            "rent is due",
            {
                [`pay (${this.rentDue}🪙)`]: () => {
                    window.player.gold -= this.rentDue;
                    this.rentDue = 0;
                    window.resume();
                    window.closePopUp();
                },
                [`delay to next month (${delayedCost}🪙)`]: () => {
                    this.rentDue = delayedCost;
                    window.resume();
                    window.closePopUp();
                }
            }
        );
    }

    drawMoneys() {
        let goldDisplay = document.querySelector(".gold-display");
        if (goldDisplay) {
            goldDisplay.innerHTML = `${window.player.gold}🪙`;
        }
    }

    drawCurrentWindow() {
        if (this.currentWindow === "cauldron") {
            window.cauldron.drawContents();
        } else {
            window.player.inventory.drawContents();
        }
    }

    draw() {
        this.drawCurrentWindow();
        this.drawables.forEach(drawable => drawable?.draw());
    }
}