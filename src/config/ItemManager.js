import { Recipe } from '../entities/Recipe.js';
import { Item } from '../entities/Item.js';
import { asDataUrl } from '../utils/draw.js';
import { bark, berry, drop, fish, leaf, meat, moss, root, vial } from '../drawables/images.js';

const allItems = {
    "Lunar Moss": new Item("Lunar Moss", "Glows faintly under moonlight.", "herb", 3, asDataUrl(moss, false, ["#000000ff", "#225639ff", "#289769ff", "#2ccea6ff"])),
    "Emberleaf": new Item("Emberleaf", "Warm to the touch.", "herb", 5, asDataUrl(leaf, false, ["#000000ff", "#7c2929ff", "#552828ff", "#943737ff"])),
    "Goldbloom Root": new Item("Goldbloom Root", "Has a calming aroma.", "herb", 2, asDataUrl(root, false, ["#000000ff", "#4e3326ff", "#704526ff", "#30251fff", "#9c6634ff"])),
    "Frostberry": new Item("Frostberry", "Icy to the touch.", "herb", 13, asDataUrl(berry, false, ["#000000ff", "#264f1cff", "#4c7c28ff", "#779b35ff", "#294182ff", "#324b9bff", "#3d4da5ff"])),
    "Goldbloom Petal": new Item("Goldbloom Petal", "The pollen is a shiny golden colour.", "herb", 17, asDataUrl(leaf, false, ["#000000ff", "#7c7429ff", "#555228ff", "#929437ff"])),
    "Dreamcap": new Item("Dreamcap", "The smell makes you feel drowsy.", "herb", 4, asDataUrl(moss, false, ["#000000ff", "#223856ff", "#285897ff", "#2c65ceff"])),
    "Ashthorn": new Item("Ashthorn", "Grows after wildfires.", "herb", 23, asDataUrl(root, false, ["#000000ff", "#3f3a3aff", "#3f3434ff", "#382929ff", "#645050ff"])),
    "Ironwood Bark": new Item("Ironwood Bark", "Strong and resilient.", "herb", 43, asDataUrl(bark, false, ["#000000ff", "#59311dff", "#6e3f26ff", "#784226ff", "#854828ff"], null, 90)),
    "Sap": new Item("Sap", "Almost feels alive", "liquid", 4, asDataUrl(drop, false, ["#000000ff", "#928a19ff", "#afb125ff", "#d7c144ff", "#eeedafff"])),
    "Blood": new Item("Blood", "Rich and metallic.", "liquid", 10, asDataUrl(drop, false, ["#000000ff", "#921919ff", "#b12525ff", "#d74444ff", "#eeafafff"])),
    "Water": new Item("Water", "Clear and refreshing.", "liquid", 2, asDataUrl(drop, false, ["#000000ff", "#195292ff", "#2575b1ff", "#44a3d7ff", "#afe4eeff"])),
    "Liver": new Item("Liver", "Rich and flavorful.", "animal", 10, asDataUrl(meat, false, ["#000000ff", "#631a16ff", "#a53e35ff", "#a23931ff", "#781c17ff"])),
    "Weird Bone": new Item("Weird Bone", "Definitely not from around here.", "animal", 10, asDataUrl(root, false, ["#000000ff", "#646453ff", "#818173ff", "#969681ff", "#c2c2abff"])),
    "Preserved Fish": new Item("Preserved Fish", "Fresh and slippery.", "animal", 10, asDataUrl(fish, false, ["#000000ff", "#2f383dff", "#7a888cff", "#6d828aff", "#44525cff", "#b2b6b7ff"])),

    "Vial": new Item("Vial", "A small glass vial.", "container", 5, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#23353fff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#546a77ff", "#6d858fff", "#6d858fff", "#a8aba6ff", "#6d858fff", "#546a77ff"])),

    "Healing Potion": new Item("Healing Potion", "Restores health.", "potion", 17, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#23353fff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#8d281fff", "#a94633ff", "#b74d34ff", "#db8e69ff", "#c36345ff", "#923a34ff"]), "#8d281fff"),
    "Superior Healing Potion": new Item("Superior Healing Potion", "Restores more health.", "potion", 75, asDataUrl(vial, false,  ["#000000ff", "#794129ff", "#a16a48ff", "#23353fff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#941740ff", "#b23a54ff", "#c23f59ff", "#e78584ff", "#ce5866ff", "#963350ff"]), "#772f41ff"),
    "Love Potion": new Item("Love Potion", "Might be placebo...", "potion", 225, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#23353fff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#961b63ff", "#b43c79ff", "#c53f80ff", "#ef85a4ff", "#d3588cff", "#963870ff"]), "#a534b4ff"),
    "Poison Potion": new Item("Poison Potion", "Don't pour into your enemy's wine.", "potion", 125, asDataUrl(vial, false, ["#000000ff", "#794129ff", "#a16a48ff", "#23353fff", "#546a77ff", "#6d858fff", "#a8aba6ff", "#295416ff", "#406e32ff", "#417936ff", "#7ba97fff", "#54894eff", "#415c2bff"]), "#2f7733ff"),
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
            allItems["Ironwood Bark"],
            allItems["Vial"]
        ], 45),
        new Recipe(allItems["Superior Healing Potion"], [
            allItems["Healing Potion"],
            allItems["Ironwood Bark"]
        ], 35),
        new Recipe(allItems["Love Potion"], [
            allItems["Dreamcap"],
            allItems["Emberleaf"],
            allItems["Water"],
            allItems["Ashthorn"],
            allItems["Weird Bone"]
        ], 65),
        new Recipe(allItems["Poison Potion"], [
            allItems["Dreamcap"],
            allItems["Emberleaf"],
            allItems["Blood"],
            allItems["Preserved Fish"],
            allItems["Weird Bone"]
        ], 85)
    ];

    static get allItems() {
        return Object.values(ItemManager.items);
    }

    static get findableItems() {
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