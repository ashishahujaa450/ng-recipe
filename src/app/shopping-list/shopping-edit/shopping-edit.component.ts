import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("ingForm", { static: false }) slForm: NgForm;
  editsubscription: Subscription;
  editMode: boolean = false;
  editeditemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListRecipe: ShoppingListService) {}

  ngOnInit() {
    this.editsubscription = this.shoppingListRecipe.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editeditemIndex = index;
        this.editedItem = this.shoppingListRecipe.getIngredientById(index);

        this.slForm.setValue({
          ingredientName: this.editedItem.name,
          ingredientAmount: this.editedItem.amount
        });
      }
    );
  }

  onClear() {
    this.slForm.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListRecipe.removeIngredient(this.editeditemIndex);
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const value = form.form.value;

    const newIngredient = new Ingredient(
      value.ingredientName,
      value.ingredientAmount
    );

    if (this.editMode) {
      this.shoppingListRecipe.updateIngredient(
        this.editeditemIndex,
        newIngredient
      );
    } else {
      this.shoppingListRecipe.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.editsubscription.unsubscribe();
  }
}
