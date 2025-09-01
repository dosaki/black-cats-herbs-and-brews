export class Recipe {
    constructor(result, ingredients, brewingTimeInSeconds) {
        this.result = result;
        this.ingredients = ingredients.toSorted((a, b) => a.name.localeCompare(b.name));
        this.brewingTimeInSeconds = brewingTimeInSeconds;
    }

    asElement() {
        let element = document.createElement("div");
        element.classList.add("recipe");
        
        let equals = document.createElement("div");
        equals.classList.add("operator");
        equals.innerText = " = ";
        element.appendChild(this.result.draw());
        element.appendChild(equals);
        this.ingredients.forEach(ingredient => {
            let plus = document.createElement("div");
            plus.classList.add("operator");
            plus.innerText = " + ";
            element.appendChild(ingredient.draw());
            element.appendChild(plus);
        });
        element.lastChild.remove();

        return element;
    }

    produceResult() {
        return this.result.clone();
    }
}
