import { Shop } from "../entities/Shop.js";
import { Player } from "../entities/Player.js";
import { Cauldron } from '../entities/Cauldron.js';
import { Inventory } from '../entities/Inventory.js';

import { onClick, onHover, onLeave } from '../utils/interaction.js';
import { ItemManager } from './ItemManager.js';
import { Cat } from '../entities/Cat.js';


export const setup = () => {
    window.shop = new Shop();

    window.shelves = new Inventory(shlf, wrk);
    window.cat = new Cat(c);
    window.player = new Player(w, 100, shelves);
    window.player.inventory.addAll([
        ItemManager.makeItem("Vial"),
        ItemManager.makeItem("Vial"),
        ItemManager.makeItem("Vial"),
        ItemManager.makeItem("Lunar Moss"),
        ItemManager.makeItem("Lunar Moss"),
        ItemManager.makeItem("Snailroot"),
        ItemManager.makeItem("Sap"),
        ItemManager.makeItem("Sap"),
        ItemManager.makeItem("Sap")
    ]);
    window.cauldron = new Cauldron(cldrn, wrk);
    window.cauldron.add(ItemManager.makeItem("Snailroot"));
    window.customer = null;

    shop.resetCalendar();
    shop.selectShelf();
    shop.drawables = [
        window.shelves,
        window.cauldron,
        window.player,
        window.cat,
        window.customer
    ];

    onClick(cldrn, () => {
        shop.selectCauldron();
    });
    onClick(shlf, () => {
        shop.selectShelf();
    });
};