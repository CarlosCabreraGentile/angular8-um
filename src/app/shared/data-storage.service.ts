import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://angular-backend-um.firebaseio.com/recipes.json', recipes)
            .subscribe(
                res => {
                    console.log(res);
                }
            );
    }

    getRecipes() {
        //Only want to take one value from the observable and then automatically unsubscribe
        //Exhaust Map waits o the first observable to be complete and gives the data from the previous observable

        return this.http
            .get('https://angular-backend-um.firebaseio.com/recipes.json')
            .pipe(
                map((recipes: Recipe[]) => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    });
                }),
                //tap operator allows to execute some code without changing the data
                //that finally throw the observable
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }

} 