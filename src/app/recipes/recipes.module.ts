import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
//Common module it is use in all other modules, in all other places
//to get access to the ngIfs and ngFors
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

//All this module needs to function correctly, has to be imported in the module
//it is not enough if it is import in the app module
//the only exception to the rule are the services
@NgModule({
     declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
     ],
     imports: [
        RouterModule, 
        //SharedModule just use to use the CommonModule inside
        SharedModule,
        ReactiveFormsModule,
        RecipesRoutingModule
     ] 
})
export class RecipesModule {

}