import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>;
    private igChangedSubscription: Subscription; 

    constructor(
        private shoppingListService: ShoppingListService, 
        private store: Store<{shoppingList : { ingredients: Ingredient[] }}>) { }

    ngOnInit() {
        //Now selecting the shopping list part of the global store
        //This give an observable
        this.ingredients = this.store.select('shoppingList');

        // this.ingredients = this.shoppingListService.getIngredients();
        // this.igChangedSubscription = this.shoppingListService.ingredientsChanged
        //     .subscribe(
        //         (ingredients: Ingredient[]) => {
        //             this.ingredients = ingredients;
        //         }
        //     );
    }

    ngOnDestroy() {
        // this.igChangedSubscription.unsubscribe();
    }

    onEditItem(id: number) {
        //Pass on the id, so the subject can emit this value
        //and listen to it in some another place 
        this.shoppingListService.startedEditing.next(id);
    }

}
