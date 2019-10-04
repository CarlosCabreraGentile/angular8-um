import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  /**
   * HostBinding allows to bind a property of the element 
   * directive is placed on
   * Bind to a class property of the element 
   */
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) { }

}
