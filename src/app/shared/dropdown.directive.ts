import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  @HostBinding("class.show") open: boolean = false;
  @HostListener("click") toggleOpen() {
    this.open = !this.open;
  }

  constructor() {}
}
