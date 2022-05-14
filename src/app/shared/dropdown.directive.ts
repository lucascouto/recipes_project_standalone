import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  menuOpened = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('click') onClick(): void {
    if (!this.menuOpened) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
      this.menuOpened = true;
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.menuOpened = false;
    }
  }
}
