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
    const element = document.createElement("p");
    element.innerText = message;
    window.popUp([element], time);
};

window.popUpOpt1Opt2 = function (message, button1Text, button2Text, onButton1, onButton2) {
    const messageElement = document.createElement("h1");
    messageElement.innerText = message;

    const button1Element = document.createElement("button");
    button1Element.innerText = button1Text;
    onClick(button1Element, () => {
        onButton1();
    });

    const elements = [messageElement, button1Element];
    if (button2Text) {
        const button2Element = document.createElement("button");
        button2Element.innerText = button2Text;
        onClick(button2Element, () => {
            onButton2();
        });
        elements.push(button2Element);
    }

    window.popUp(elements);
};

window.popUp = function (elements, time) {
    msg.style.display = 'flex';
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
    const tooltipContent = document.createElement("div");
    tooltipContent.classList.add("tooltip-content");
    
    const tooltipText = document.createElement("div");
    tooltipText.classList.add("tooltip-text");

    const tooltipName = document.createElement("div");
    tooltipName.classList.add("tooltip-name");
    tooltipName.innerText = name;
    
    const iconHolder = document.createElement("div");
    iconHolder.classList.add("item-icon-holder");
    const iconElement = document.createElement("img");
    iconElement.classList.add("item-icon");
    if(icon){
        iconElement.src = icon;
    }
    iconHolder.appendChild(iconElement);

    const tooltipDescription = document.createElement("div");
    tooltipDescription.classList.add("tooltip-description");
    tooltipDescription.innerText = description;

    tooltipText.appendChild(tooltipName);
    tooltipText.appendChild(tooltipDescription);
    tooltipContent.appendChild(iconHolder);
    tooltipContent.appendChild(tooltipText);
    tooltipShow(tooltipContent);
}

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

        if (window.customer === null && int(0, 20) > 1) {
            const numberOfItems = int(1, 3);
            const wants = [];
            for (let i = 0; i < numberOfItems; i++) {
                wants.push(pick(...Object.values(ItemManager.items)));
            }
            window.customer = new Customer(cstmr, wants);
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
                const loan = 1800 + Math.abs(window.player.gold);
                window.popUpOpt1Opt2("You're broke", "Restart", `Take a loan (${loan}g)`, () => {
                    window.location.reload();
                }, () => {
                    window.player.gold += loan;
                    window.player.addDebt(loan * 1.25);
                    window.closePopUp();
                    window.shop.drawMoneys();
                    window.resume();
                });
            }, 1000);
            window.pause();
        }
    }, 30000);
};

setup();
main();