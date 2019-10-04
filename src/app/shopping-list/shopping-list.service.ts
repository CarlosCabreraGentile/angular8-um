import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>(); 
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('apple', 5),
        new Ingredient('sugar', 2),
        ];
    
    getIngredient(id: number) {
        return this.ingredients[id];
    }
        
    getIngredients() {
        return this.ingredients.slice();
    }    

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(id: number, ingredient: Ingredient) {
        this.ingredients[id] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}