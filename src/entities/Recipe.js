export class Recipe {
    constructor(result, ingredients, brewingTimeInSeconds) {
        this.result = result;
        this.ingredients = ingredients.toSorted((a, b) => a.name.localeCompare(b.name));
        this.brewingTimeInSeconds = brewingTimeInSeconds;
    }

    produceResult() {
        return this.result.clone();
    }
}
