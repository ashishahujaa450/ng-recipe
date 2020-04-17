import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as ShoppingListAction from "./../store/shopping.action";
import * as FromShoppingList from "./../store/shopping.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("ingForm", { static: false }) slForm: NgForm;
  editsubscription: Subscription;
  editMode: boolean = false;
  editeditemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListRecipe: ShoppingListService,
    private store: Store<FromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.editsubscription = this.store
      .select("shoppingListStore")
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editeditemIndex = stateData.editedIngredientIndex;
          this.editedItem = stateData.editedIngredient;

          this.slForm.setValue({
            ingredientName: this.editedItem.name,
            ingredientAmount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onClear() {
    this.slForm.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete() {
    this.store.dispatch(
      new ShoppingListAction.DeleteIngredient(this.editeditemIndex)
    );

    // this.shoppingListRecipe.removeIngredient(this.editeditemIndex);
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const value = form.form.value;

    const newIngredient = new Ingredient(
      value.ingredientName,
      value.ingredientAmount
    );

    if (this.editMode) {
      // this.shoppingListRecipe.updateIngredient(
      //   this.editeditemIndex,
      //   newIngredient
      // );

      this.store.dispatch(
        new ShoppingListAction.UpdateIngredient({
          index: this.editeditemIndex,
          newIngredient: newIngredient,
        })
      );
    } else {
      // this.shoppingListRecipe.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }

    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.editsubscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }
}
