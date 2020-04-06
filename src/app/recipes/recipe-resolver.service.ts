import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  RouterState,
} from "@angular/router";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recipeService.getRecipe.length > 0) {
      return this.recipeService.getRecipe;
    } else {
      return this.dataStorageService.fetchRecipe();
    }
  }
}
