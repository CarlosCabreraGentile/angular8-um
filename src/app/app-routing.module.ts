import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'
    },
    {
        //With Lazy loading only load on demand, when user clicks
        //in some part of the app, just load it 
        //loadChildren is a path to the module you want to load when this page is visited
        //Must remove the RecipesModule from AppModule to avoid errors
        path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'
    },
    {
        //Must remove the ShoppingListModule from AppModule to avoid errors
        path: 'shopping-list', 
        loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
    },
    {
        //Must remove the AuthModule from AppModule to avoid errors
        path: 'auth', 
        loadChildren: './auth/auth.module#AuthModule'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}