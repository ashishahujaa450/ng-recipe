import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipe;
    this.http
      .put(
        "https://ng-course-recipe-book-a383f.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipe() {
    return this.http
      .get<Recipe[]>(
        "https://ng-course-recipe-book-a383f.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipe: Recipe[]) => {
          return recipe.map((elm) => {
            return {
              ...elm,
              ingredients: elm.ingredients ? elm.ingredients : [],
            };
          });
        }),
        tap((recipe) => {
          this.recipeService.replceRecipes(recipe);
        })
      );
  }
}
