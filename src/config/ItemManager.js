import { Recipe } from '../entities/Recipe.js';
import { Item } from '../entities/Item.js';
import { asDataUrl } from '../utils/draw.js';
import { vial } from '../drawables/images.js';

const allItems = {
    "Lunar Moss": new Item("Lunar Moss", "Glows faintly under moonlight.", "herb", 3),
    "Emberleaf": new Item("Emberleaf", "Warm to the touch.", "herb", 5),
    "Snailroot": new Item("Snailroot", "Has a calming aroma.", "herb", 2),
    "Frostberry": new Item("Frostberry", "Icy to the touch.", "herb", 13),
    "Goldbloom": new Item("Goldbloom", "The pollen is a shiny golden colour.", "herb", 17),
    "Dreamcap": new Item("Dreamcap", "The smell makes you feel drowsy.", "herb", 4),
    "Ashthorn": new Item("Ashthorn", "Grows after wildfires.", "herb", 23),
    "Ironwood Bark": new Item("Ironwood Bark", "Strong and resilient.", "herb", 43),
    "Sap": new Item("Sap", "Almost feels alive", "herb", 4),
    "Chicken Liver": new Item("Chicken Liver", "Rich and flavorful.", "animal", 10),
    "Bone": new Item("Bone", "Definitely not human.", "animal", 10),
    "Preserved Fish": new Item("Preserved Fish", "Fresh and slippery.", "animal", 10),

    "Vial": new Item("Vial", "A small glass vial.", "container", 5, asDataUrl(vial, false, [
        "#000000ff",
        "#673b28ff",
        "#6d757bff",
        "#516269ff",
        "#6d757bff",
        "#6d757bff",
        "#516269ff"], null, 128, 128)),

    "Healing Potion": new Item("Healing Potion", "Restores health.", "potion", 17, asDataUrl(vial, false, ["#000000ff",
        "#673b28ff",
        "#6d757bff",
        "#516269ff",
        "#772f2fff",
        "#836c6cff",
        "#692424ff"], null, 128, 128),
        "#772f2fff"),
    "Superior Healing Potion": new Item("Superior Healing Potion", "Restores more health.", "potion", 75, asDataUrl(vial, false, ["#000000ff",
        "#673b28ff",
        "#7b6d75ff",
        "#695169ff",
        "#772f41ff",
        "#836c76ff",
        "#692435ff"], null, 128, 128),
        "#772f41ff"),
    "Love Potion": new Item("Love Potion", "Might be placebo...", "potion", 225, asDataUrl(vial, false, ["#000000ff",
        "#673b28ff",
        "#7b6d75ff",
        "#695169ff",
        "#a534b4ff",
        "#836c76ff",
        "#692435ff"], null, 128, 128),
        "#772f41ff"),
    "Poison Potion": new Item("Poison Potion", "Don't pour on your enemy's wine.", "potion", 125, asDataUrl(vial, false, ["#000000ff",
        "#673b28ff",
        "#7b6d75ff",
        "#695169ff",
        "#a534b4ff",
        "#836c76ff",
        "#692435ff"], null, 128, 128),
        "#772f41ff"),
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
            allItems["Sap"],
            allItems["Ashthorn"],
            allItems["Bone"]
        ], 65),
        new Recipe(allItems["Poison Potion"], [
            allItems["Dreamcap"],
            allItems["Emberleaf"],
            allItems["Sap"],
            allItems["Preserved Fish"],
            allItems["Bone"]
        ], 85)
    ];

    static get allItems() {
        return Object.values(ItemManager.items);
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