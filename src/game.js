import { ItemManager } from './config/ItemManager.js';
import { setup } from "./config/setup.js";
import { Customer } from './entities/Customer.js';
import { onClick } from './utils/interaction.js';
import { int, pick } from './utils/random.js';

window.paused = false;

window.pause = function () {
    window.paused = true;
};
window.resume = function () {
    window.paused = false;
};

window.popUpMsg = function (message, time) {
    let element = document.createElement("p");
    element.innerText = message;
    window.popUp([element], time);
};

window.popUpWithOptions = function (message, options) {
    let messageElement = document.createElement("h1");
    messageElement.innerText = message;
    let elements = [messageElement];
    Object.entries(options).forEach(([text, action]) => {
        let buttonElement = document.createElement("button");
        buttonElement.innerText = text;
        onClick(buttonElement, () => {
            action();
        });
        elements.push(buttonElement);
    });

    window.popUp(elements);
};

window.popUp = function (elements, time) {
    msg.style.display = 'block';
    overlay.style.display = 'flex';
    elements.forEach(el => {
        msg_txt.appendChild(el);
    });

    if (time) {
        window.closePopUp(time);
    }
};

window.closePopUp = function (time) {
    time = time || 100;
    setTimeout(() => {
        msg.style.top = '-50%';
        setTimeout(() => {
            msg.style.top = '50%';
            overlay.style.display = 'none';
            msg.style.display = 'none';
            msg_txt.innerHTML = '';
        }, time / 4);
    }, (time / 4) * 3);
};

window.tooltipShowWithIcon = function (icon, name, description) {
    let tooltipContent = document.createElement("div");
    tooltipContent.classList.add("tooltip-content");

    let tooltipText = document.createElement("div");
    tooltipText.classList.add("tooltip-text");

    let tooltipName = document.createElement("div");
    tooltipName.classList.add("tooltip-name");
    tooltipName.innerText = name;

    let iconHolder = document.createElement("div");
    iconHolder.classList.add("item-icon-holder");
    if (icon) {
        let iconElement = document.createElement("img");
        iconElement.classList.add("item-icon");
        iconElement.src = icon;
        iconHolder.appendChild(iconElement);
    }

    let tooltipDescription = document.createElement("div");
    tooltipDescription.classList.add("tooltip-description");
    tooltipDescription.innerText = description;

    tooltipText.appendChild(tooltipName);
    tooltipText.appendChild(tooltipDescription);
    tooltipContent.appendChild(iconHolder);
    tooltipContent.appendChild(tooltipText);
    tooltipShow(tooltipContent);
};

window.tooltipShow = function (element) {
    tooltip.innerHTML = "";
    tooltip.appendChild(element);
    tooltip.style.display = 'block';
};

window.tooltipHide = function () {
    tooltip.innerHTML = "";
    tooltip.style.display = 'none';
};

window.main = function () {
    window.shop.draw();

    setInterval(() => {
        if (window.paused) {
            return;
        }

        if (window.customer === null && int(0, 5) > 3) {
            let numberOfItems = int(1, 3);
            let wants = [];
            for (let i = 0; i < numberOfItems; i++) {
                wants.push(pick(...ItemManager.basicPotions, ...ItemManager.allItems));
            }
            let cstmrCanvas = document.createElement("canvas");
            cstmrCanvas.id = "cstmr";
            c.after(cstmrCanvas);
            window.customer = new Customer(cstmrCanvas, [...new Set(wants)]);
            window.customer.draw();
            window.customer.appear();
        }
    }, 1000);

    setInterval(() => {
        if (window.paused) {
            return;
        }

        window.shop.increaseTime();
        if (window.player.gold < 0) {
            setTimeout(() => {
                let loan1 = 1000 + Math.abs(window.player.gold);
                let loan2 = 1500 + Math.abs(window.player.gold);
                let loan3 = 2000 + Math.abs(window.player.gold);
                let options = {
                    "restart": ()=>window.location.reload()
                }
                if(window.player._debt.length <= 2){
                    options[`take a loan (${loan1}🪙)`] = () => {
                        window.player.gold += loan1;
                        window.player.addDebt(loan1 * 1.25);
                        window.closePopUp();
                        window.shop.drawCurrentWindow();
                        window.resume();
                    }
                    options[`take a loan (${loan2}🪙)`] = () => {
                        window.player.gold += loan2;
                        window.player.addDebt(loan2 * 1.25);
                        window.closePopUp();
                        window.shop.drawCurrentWindow();
                        window.resume();
                    }
                    options[`take a loan (${loan3}🪙)`] = () => {
                        window.player.gold += loan3;
                        window.player.addDebt(loan3 * 1.25);
                        window.closePopUp();
                        window.shop.drawCurrentWindow();
                        window.resume();
                    }
                }
                window.popUpWithOptions(`you're broke${window.player._debt.length > 2 ? ' and you have over 2 loans' : ''}`, options);
            }, 1000);
            window.pause();
        }
    }, 30000);
};

setup();
main();