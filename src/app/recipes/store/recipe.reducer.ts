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
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipesActions.UPDATE_RECIPE:
            // Get the current recipe to update from the array
            const updatedRecipe = { 
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            };
            // get a copy of the array of recipes
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: updatedRecipes
            }
        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload;
                })
            }
        default:
            return state;
    }
}