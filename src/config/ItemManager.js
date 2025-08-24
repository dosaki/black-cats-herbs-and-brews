import { Recipe } from '../entities/Recipe.js';
import { Item } from '../entities/Item.js';

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

        "Vial": new Item("Vial", "A small glass vial.", "container", 5),

        "Healing Potion": new Item("Healing Potion", "Restores health.", "potion", 17),
        "Superior Healing Potion": new Item("Superior Healing Potion", "Restores more health.", "potion", 75),
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
        ], 35)
    ];

    static findRecipe(ingredients) {
        const sortedIngredients = ingredients.toSorted((a, b) => a.name.localeCompare(b.name));
        return ItemManager.recipes.find(recipe => {
            return recipe.ingredients.map(i => i.name).join(", ") === sortedIngredients.map(i => i.name).join(", ")
        });
    }

    static makeItem(itemName) {
        return ItemManager.items[itemName].clone();
    }
}