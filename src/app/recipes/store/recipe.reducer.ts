import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import { StartEdit } from 'src/app/shopping-list/store/shopping-list.actions';

export interface State {
    recipes: Recipe[];
}

const initialStatus: State = {
    recipes: []
};

export function recipeReducer(state = initialStatus,action: RecipesActions.RecipesActions) {
    switch(action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        default:
            return state;
    }
}