import { Recipe } from '../entities/Recipe.js';
import { Item } from '../entities/Item.js';
import { asDataUrl } from '../utils/draw.js';
import { berry, drop, fish, leaf, meat, moss, root, vial } from '../drawables/images.js';

const allItems = {
    "Lunar Moss": new Item("Lunar Moss", "Glows faintly under moonlight.", "herb", 3, asDataUrl(moss, false, ["#000000ff", "#225639ff", "#289769ff", "#2ccea6ff"])),
    "Emberleaf": new Item("Emberleaf", "Warm to the touch.", "herb", 5, asDataUrl(leaf, false, ["#000000ff", "#7c2929ff", "#552828ff", "#943737ff"])),
    "Goldbloom Root": new Item("Goldbloom Root", "Has a calming aroma.", "herb", 2, asDataUrl(root, false, ["#000000ff", "#555228ff", "#7c7429ff", "#929437ff", "#afb125ff"])),
    "Frostberry": new Item("Frostberry", "Icy to the touch.", "herb", 13, asDataUrl(berry, false, ["#000000ff", "#225639ff", "#289769ff", "#2ccea6ff", "#223856ff", "#285897ff", "#2c65ceff"])),
    "Goldbloom Petal": new Item("Goldbloom Petal", "The pollen is a shiny golden colour.", "herb", 17, asDataUrl(leaf, false, ["#000000ff", "#7c7429ff", "#555228ff", "#929437ff"])),
    "Dreamcap": new Item("Dreamcap", "The smell makes you feel drowsy.", "herb", 4, asDataUrl(moss, false, ["#000000ff", "#223856ff", "#285897ff", "#2c65ceff"])),
    "Ashthorn": new Item("Ashthorn", "Grows after wildfires.", "herb", 23, asDataUrl(root, false, ["#000000ff", "#3f3a3aff", "#3f3434ff", "#382929ff", "#645050ff"])),
    "Ironwood Root": new Item("Ironwood Root", "Strong and resilient.", "herb", 43, asDataUrl(root, false, ["#000000ff", "#2c65ceff", "#285897ff", "#a8aba6ff", "#223856ff"], null, 90)),
    
    "Sap": new Item("Sap", "Smells sweet. Almost feels alive.", "liquid", 4, asDataUrl(drop, false, ["#000000ff", "#928a19ff", "#afb125ff", "#d7c144ff", "#eeedafff"])),
    "Blood": new Item("Blood", "Rich and metallic.", "liquid", 10, asDataUrl(drop, false, ["#000000ff", "#921919ff", "#b12525ff", "#d74444ff", "#eeafafff"])),
    "Water": new Item("Water", "Clear and refreshing.", "liquid", 2, asDataUrl(drop, false, ["#000000ff", "#195292ff", "#2575b1ff", "#44a3d7ff", "#afe4eeff"])),
    "Ooze": new Item("Ooze", "Slimey and thick.", "liquid", 5, asDataUrl(drop, false, ["#000000ff", "#225639ff", "#1f7a54ff", "#289769ff", "#2ccea6ff"])),

    "Liver": new Item("Liver", "Rich and flavorful.", "animal", 10, asDataUrl(meat, false, ["#000000ff", "#552828ff", "#a53e35ff", "#a23931ff", "#7c2929ff"])),
    "Weird Bone": new Item("Weird Bone", "Definitely not from around here.", "animal", 10, asDataUrl(root, false, ["#000000ff", "#646453ff", "#818173ff", "#969681ff", "#b2b6b7ff"])),
    "Preserved Fish": new Item("Preserved Fish", "Fresh and slippery.", "animal", 10, asDataUrl(fish, false, ["#000000ff", "#2f383dff", "#7a888cff", "#6d828aff", "#44525cff", "#b2b6b7ff"])),
                                                                
    "Vial": new Item("Vial", "A small glass vial.", "container", 5, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#546a77ff", "#6d858fff", "#546a77ff", "#a8aba6ff"])),
    "Healing Potion": new Item("Healing Potion", "Restores health.", "potion", 17, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#921919ff", "#d74444ff", "#b12525ff", "#eeafafff"]), "#d74444ff"),
    "Superior Healing Potion": new Item("Superior Healing Potion", "Restores more health.", "potion", 75, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#552828ff", "#943737ff", "#7c2929ff", "#d74444ff"]), "#943737ff"),
    "Love Potion": new Item("Love Potion", "Might be placebo...", "potion", 225, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#682072ff", "#a534b4ff", "#8c3397ff", "#f39cffff"]), "#a534b4ff"),
    "Poison Potion": new Item("Poison Potion", "Don't pour into your enemy's wine.", "potion", 125, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#225639ff", "#289769ff", "#1f7a54ff", "#2ccea6ff"]), "#289769ff"),
    "Coolant": new Item("Coolant", "Cold vapour rises from vial.", "potion", 98, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#223856ff", "#2c65ceff", "#285897ff", "#a8aba6ff"]), "#2c65ceff"),
    "Sleep Potion": new Item("Sleep Potion", "You yawn as you smell it.", "potion", 56, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff",  "#382929ff", "#3f3a3aff", "#3f3434ff", "#645050ff"]), "#3f3a3aff"),
    "Vampiric Tonic": new Item("Vampiric Tonic", "Blood-based tonic for vampires.", "potion", 180, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff",  "#552828ff", "#943737ff", "#7c2929ff", "#d74444ff"]), "#552828ff"),
    "Underwater Breathing Potion": new Item("Underwater Breathing Potion", "Allows you to breathe underwater.", "potion", 180, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff",  "#223856ff", "#2c65ceff", "#285897ff", "#a8aba6ff"]), "#285897ff"),
    "Strength Potion": new Item("Strength Potion", "Increases physical strength.", "potion", 230, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff",  "#928a19ff", "#d7c144ff", "#afb125ff", "#eeedafff"]), "#d7c144ff"),
    "Alchemist's Fire": new Item("Alchemist's Fire", "Pretty much fire in a bottle.", "potion", 230, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff",  "#d74444ff", "#eeafafff", "#eeafafff", "#eeedafff"]), "#eeafafff"),
    "Frostberry Wine": new Item("Frostberry Wine", "Chilled and fruity.", "potion", 120, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff",  "#223856ff", "#2c65ceff", "#285897ff", "#a8aba6ff"]), "#223856ff"),
    "Emberleaf Liquor": new Item("Emberleaf Liquor", "Mmhmm... spicy.", "potion", 80, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff",  "#682072ff", "#a534b4ff", "#8c3397ff", "#f39cffff"]), "#682072ff"),
};

export class ItemManager {
    static items = allItems;

    static recipes = [
        new Recipe(allItems["Healing Potion"], [
            allItems["Sap"],
            allItems["Lunar Moss"],
            allItems["Vial"]
        ], 20),
        new Recipe(allItems["Superior Healing Potion"], [
            allItems["Sap"],
            allItems["Lunar Moss"],
            allItems["Ironwood Root"],
            allItems["Vial"]
        ], 45),
        new Recipe(allItems["Superior Healing Potion"], [
            allItems["Healing Potion"],
            allItems["Ironwood Root"]
        ], 35),
        new Recipe(allItems["Love Potion"], [
            allItems["Dreamcap"],
            allItems["Emberleaf"],
            allItems["Water"],
            allItems["Weird Bone"],
            allItems["Vial"]
        ], 65),
        new Recipe(allItems["Poison Potion"], [
            allItems["Dreamcap"],
            allItems["Emberleaf"],
            allItems["Ooze"],
            allItems["Weird Bone"],
            allItems["Vial"]
        ], 85),
        new Recipe(allItems["Coolant"], [
            allItems["Frostberry"],
            allItems["Water"],
            allItems["Vial"]
        ], 25),
        new Recipe(allItems["Sleep Potion"], [
            allItems["Goldbloom Root"],
            allItems["Dreamcap"],
            allItems["Water"],
            allItems["Vial"]
        ], 45),
        new Recipe(allItems["Vampiric Tonic"], [
            allItems["Blood"],
            allItems["Liver"],
            allItems["Weird Bone"],
            allItems["Vial"]
        ], 25),
        new Recipe(allItems["Underwater Breathing Potion"], [
            allItems["Preserved Fish"],
            allItems["Water"],
            allItems["Vial"]
        ], 40),
        new Recipe(allItems["Strength Potion"], [
            allItems["Ironwood Root"],
            allItems["Goldbloom Petal"],
            allItems["Blood"],
            allItems["Vial"]
        ], 40),
        new Recipe(allItems["Alchemist's Fire"], [
            allItems["Emberleaf"],
            allItems["Goldbloom Petal"],
            allItems["Ooze"],
            allItems["Vial"]
        ], 40),
        new Recipe(allItems["Frostberry Wine"], [
            allItems["Frostberry"],
            allItems["Sap"],
            allItems["Vial"]
        ], 60),
        new Recipe(allItems["Emberleaf Liquor"], [
            allItems["Emberleaf"],
            allItems["Sap"],
            allItems["Vial"]
        ], 60)
    ];

    static get allItems() {
        return Object.values(ItemManager.items);
    }

    static get ingredients() {
        return this.allItems.filter(i => i.type !== "potion");
    }

    static findRecipe(ingredients) {
        const sortedIngredients = ingredients.toSorted((a, b) => a.name.localeCompare(b.name));
        return ItemManager.recipes.find(recipe => {
            return recipe.ingredients.map(i => i.name).join(", ") === sortedIngredients.map(i => i.name).join(", ");
        });
    }

    static makeItem(itemName) {
        return ItemManager.items[itemName].clone();
    }
}