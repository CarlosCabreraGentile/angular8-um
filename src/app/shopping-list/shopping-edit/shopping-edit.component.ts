import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') shoppingListForm: NgForm;
    subscription: Subscription;
    editMode: Boolean = false;
    editedIdItem: number;
    editedItem: Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
      this.subscription = this.shoppingListService.startedEditing
      .subscribe(
          (id: number) => {
            this.editedIdItem = id;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(id);
            this.shoppingListForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
            });
          }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;   
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
        this.shoppingListService.updateIngredient(this.editedIdItem, newIngredient);
    } else {
        this.shoppingListService.addIngredient(newIngredient); 
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
      this.shoppingListForm.reset();
      this.editMode = false;
  }

  onDelete() {
      this.shoppingListService.deleteIngredient(this.editedIdItem);
      this.onClear();
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
