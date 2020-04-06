import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe((response) => {
      //data successfully fetched
    });
  }
}
