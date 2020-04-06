import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getSingleRecipe(this.id);
    });
  }

  ingredientToShoppingList(ev: Event) {
    ev.preventDefault();
    this.recipeService.addShoppingListIngredient(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
