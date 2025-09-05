import { Recipe } from '../entities/Recipe.js';
import { Item } from '../entities/Item.js';
import { asCanvas } from '../utils/draw.js';
import { drop, leaf, moss, root, vial } from '../drawables/images.js';

let allItems = Object.fromEntries([
    new Item("lunar moss", "glows faintly", "herb", 3, asCanvas(moss, ["#000000ff", "#225639ff", "#289769ff", "#2ccea6ff"]).toDataURL()),
    new Item("emberleaf", "warm to the touch", "herb", 5, asCanvas(leaf, ["#000000ff", "#7c2929ff", "#552828ff", "#943737ff"]).toDataURL()),
    new Item("frostmoss", "icy to the touch", "herb", 13, asCanvas(moss, ["#000000ff", "#223856ff", "#285897ff", "#2c65ceff"]).toDataURL()),
    new Item("dreamcap", "makes you feel drowsy", "herb", 4, asCanvas(moss, ["#000000ff", "#285897ff", "#2c65ceff", "#223856ff"]).toDataURL()),
    new Item("ironwood root", "hard to break", "herb", 43, asCanvas(root, ["#000000ff", "#2c65ceff", "#285897ff", "#a8aba6ff", "#223856ff"]).toDataURL()),

    new Item("sap", "smells sweet", "liquid", 4, asCanvas(drop, ["#000000ff", "#928a19ff", "#afb125ff", "#d7c144ff", "#eeedafff"]).toDataURL()),
    new Item("blood", "rich and metallic", "liquid", 10, asCanvas(drop, ["#000000ff", "#740c0cff", "#b12525ff", "#d74444ff", "#eeafafff"]).toDataURL()),
    new Item("water", "pure and refreshing", "liquid", 2, asCanvas(drop, ["#000000ff", "#195292ff", "#2575b1ff", "#44a3d7ff", "#afe4eeff"]).toDataURL()),
    new Item("ooze", "best not to think about it", "liquid", 5, asCanvas(drop, ["#000000ff", "#225639ff", "#1f7a54ff", "#289769ff", "#2ccea6ff"]).toDataURL()),

    new Item("liver", "rich and flavorful", "animal", 10, asCanvas(moss, ["#000000ff", "#552828ff", "#a53e35ff", "#7c2929ff"]).toDataURL()),
    new Item("weird bone", "not from around here", "animal", 10, asCanvas(root, ["#000000ff", "#646453ff", "#818173ff", "#969681ff", "#bdc2c0ff"]).toDataURL()),
    new Item("roe", "fish eggs", "animal", 10, asCanvas(moss, ["#000000ff", "#2f383dff", "#7a888cff", "#6d828aff"]).toDataURL()),

    new Item("vial", "a glass vial", "container", 5, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#546a77ff", "#6d858fff", "#546a77ff", "#a8aba6ff"]).toDataURL()),

    new Item("healing potion", "restores health", "potion", 17, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#740c0cff", "#d74444ff", "#b12525ff"]).toDataURL(), "#740c0cff"),
    new Item("coolant", "cold vapour rises from vial", "potion", 98, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#223856ff", "#2c65ceff", "#285897ff"]).toDataURL(), "#285897ff"),
    new Item("underwater breathing potion", "allows you to breathe underwater", "potion", 180, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#223856ff", "#2c65ceff", "#285897ff"]).toDataURL(), "#223856ff"),
    new Item("frostmoss wine", "chilled and fruity", "potion", 120, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#223856ff", "#2c65ceff", "#285897ff"]).toDataURL(), "#223856ff"),
    new Item("strength potion", "increases physical strength", "potion", 230, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#928a19ff", "#d7c144ff", "#afb125ff"]).toDataURL(), "#928a19ff"),
    new Item("sleep potion", "you yawn as you smell it", "potion", 56, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#382929ff", "#3f3a3aff", "#3f3434ff"]).toDataURL(), "#645050ff"),
    new Item("vampiric tonic", "blood-based tonic for vampires", "potion", 180, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#552828ff", "#943737ff", "#7c2929ff"]).toDataURL(), "#552828ff"),
    new Item("love potion", "might be placebo", "potion", 225, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#682072ff", "#a534b4ff", "#8c3397ff"]).toDataURL(), "#8c3397ff"),
    new Item("poison potion", "don't pour into your enemy's wine", "potion", 125, asCanvas(vial, ["#000000ff", "#794129ff", "#a16a48ff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#225639ff", "#289769ff", "#1f7a54ff"]).toDataURL(), "#1f7a54ff")
].map(i => [i.name, i]));

export class ItemManager {
    static items = allItems;

    static recipes = [
        new Recipe(allItems["healing potion"], [
            allItems["lunar moss"],
            allItems["sap"],
            allItems["vial"]
        ], 10),
        new Recipe(allItems["coolant"], [
            allItems["frostmoss"],
            allItems["water"],
            allItems["vial"]
        ], 10),
        new Recipe(allItems["underwater breathing potion"], [
            allItems["roe"],
            allItems["water"],
            allItems["vial"]
        ], 12),
        new Recipe(allItems["frostmoss wine"], [
            allItems["frostmoss"],
            allItems["sap"],
            allItems["vial"]
        ], 20),
        new Recipe(allItems["strength potion"], [
            allItems["ironwood root"],
            allItems["blood"],
            allItems["vial"]
        ], 12),
        new Recipe(allItems["sleep potion"], [
            allItems["lunar moss"],
            allItems["dreamcap"],
            allItems["water"],
            allItems["vial"]
        ], 18),
        new Recipe(allItems["vampiric tonic"], [
            allItems["weird bone"],
            allItems["liver"],
            allItems["blood"],
            allItems["vial"]
        ], 25),
        new Recipe(allItems["love potion"], [
            allItems["weird bone"],
            allItems["dreamcap"],
            allItems["emberleaf"],
            allItems["water"],
            allItems["vial"]
        ], 30),
        new Recipe(allItems["poison potion"], [
            allItems["weird bone"],
            allItems["ironwood root"],
            allItems["emberleaf"],
            allItems["ooze"],
            allItems["vial"]
        ], 30)
    ];

    static get basicPotions() {
        return this.allItems.filter(item => item.type === "potion").slice(0, 4);
    }

    static get advancedPotions() {
        return this.allItems.filter(item => item.type === "potion").slice(4);
    }

    static get allItems() {
        return Object.values(ItemManager.items);
    }

    static get ingredients() {
        return this.allItems.filter(i => i.type !== "potion");
    }

    static findRecipe(ingredients) {
        let sortedIngredients = ingredients.toSorted((a, b) => a.name.localeCompare(b.name));
        return ItemManager.recipes.find(recipe => {
            return recipe.ingredients.map(i => i.name).join(", ") === sortedIngredients.map(i => i.name).join(", ");
        });
    }

    static makeItem(itemName) {
        return ItemManager.items[itemName].clone();
    }
}