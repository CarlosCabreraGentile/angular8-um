import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test', 
        'Test description', 
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ricotta-goat-cheese-stuffed-zucchini-recipe-1558036677.jpg?resize=480:*',
        [
            new Ingredient('ingrediente 1', 5),
            new Ingredient('ingrediente 2', 3)
        ]),
        new Recipe('B test', 
        'Test description', 
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ricotta-goat-cheese-stuffed-zucchini-recipe-1558036677.jpg?resize=480:*',
        [
            new Ingredient('ingrediente 3', 4),
            new Ingredient('ingrediente 4', 6)
        ])
        ];

        constructor(private shoppingListService: ShoppingListService){}

        getRecipes() {
        //Returns a copy and not the original array  
        return this.recipes.slice();
        }

        addIngredientsToShoppingList(ingredients: Ingredient[]) {
            this.shoppingListService.addIngredients(ingredients);
        }
}