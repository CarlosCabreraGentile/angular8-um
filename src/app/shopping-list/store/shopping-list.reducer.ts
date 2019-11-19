import { Ingredient } from "../../shared/ingredients.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
    ingredients: [
        new Ingredient('apple', 5),
        new Ingredient('sugar', 2),
    ]
};

//Reducer is a function that receives 2 arguments
//The state (current state) and the action
//Takes the old state and return a new state
//The Action trigger the reducer!!!!
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {

    //action is an object which need to have a type property
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                //copy the old state with spread operator
                ...state,
                //also copy the old ingredients to keep the information
                //the ingredients array is a new array with the old elements in there
                ingredients: [...state.ingredients, action.payload]
            };
            case ShoppingListActions.ADD_INGREDIENTS:
                return {
                    ...state,
                    ingredients: [...state.ingredients, ...action.payload]
                };
            default: 
                return state;
    }
}

