import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	public recipe: Recipe;
	public id: number;

	constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.route.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				this.recipe = this.recipeService.getRecipe(this.id);
 			}
		);
	}

	onAddToShoppingList(){
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
        this.router.navigate(['/recipes']);
	}

	onEditRecipe() {
    //Option 1
    this.router.navigate(['edit'],  {relativeTo: this.route});
    //Option 2
	// this.router.navigate([`recipes/${this.id}/edit`]); 
	//Option 3
	//this.router.navigate(['../', this.id, {relativeTo: this.route}]);
    }
    
    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id); 
        this.router.navigate(['/recipes']);
    }
}
