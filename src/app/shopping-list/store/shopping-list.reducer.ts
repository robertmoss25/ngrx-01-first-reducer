import { Action } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState, 
  action: ShoppingListActions.ShoppingListActions) 
  {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [...state.ingredients, ...action.payload]
        };
      case ShoppingListActions.UPDATE_INGREDIENT:
          // Have to do this garbage because it is immutable
          const ingredient = state.ingredients[action.payload.index];
          const updatedIngredient = {
            ...ingredient,
            ...action.payload.ingredient
          };
          const updatedIngredients = [...state.ingredients];
          updatedIngredients[action.payload.index] = updatedIngredient;
          return {
            ...state,
            ingredients: updatedIngredients
          };
      case ShoppingListActions.DELETE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((ig, igIndex)=> {
            return igIndex !== action.payload
          })
        }
      case ShoppingListActions.START_EDIT:
        // the ... is called the spread, it creates a new object
        return {
          ...state,
          editedIngredientIndex: action.payload,
          editedIngredient: {...state.ingredients[action.payload]}
        }
      case ShoppingListActions.STOP_EDIT:  
        return  {
          ...state,
          editedIngredientIndex: -1,
          editedIngredient: null
        }
    default:
      return state;
  }
}
