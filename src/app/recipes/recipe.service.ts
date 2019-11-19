import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('A test', 
    //     'Test description', 
    //     'https://www.tasteofhome.com/wp-content/uploads/2017/10/All-American-Hamburgers_EXPS_THJJ17_29321_D02_03_5b-1-696x696.jpg',
    //     [
    //         new Ingredient('ingrediente 1', 5),
    //         new Ingredient('ingrediente 2', 3)
    //     ]),
    //     new Recipe('B test', 
    //     'Test description', 
    //     'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ricotta-goat-cheese-stuffed-zucchini-recipe-1558036677.jpg?resize=480:*',
    //     [
    //         new Ingredient('ingrediente 3', 4),
    //         new Ingredient('ingrediente 4', 6)
    //     ])
    //     ];

    private recipes: Recipe[] = []; 

    constructor(private shoppingListService: ShoppingListService){}

    /**
     * Get recipes from the backend
     * @param recipes 
     */
    setRecipes(recipes) { 
        this.recipes = recipes;
        //Emits the new changes in the recipe list and returns a copy of the original
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipes() {
    //Returns a copy and not the original array  
    return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        //Emits the new changes in the recipe list and returns a copy of the original
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(id: number, recipe: Recipe ) {
        this.recipes[id] = recipe;
        //Emits the new changes in the recipe list and returns a copy of the original
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        //Emits the new changes in the recipe list and returns a copy of the original
        this.recipesChanged.next(this.recipes.slice());
    }

}