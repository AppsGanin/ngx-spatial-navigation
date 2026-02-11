import {
  AfterContentInit,
  booleanAttribute,
  Directive,
  ElementRef,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[navFocusable]',
  standalone: true,
  host: {
    '[class.lrud-ignore]': 'ignore()',
    'tabindex': '-1',
    '(focus)': 'handleFocus($event)',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class NavFocusableDirective implements AfterContentInit {
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) { }

  readonly ignore = input(false, { transform: booleanAttribute });
  readonly focus = input(false, { transform: booleanAttribute });

  ngAfterContentInit(): void {
    if (!this.ignore() && this.focus()) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 500);
    }
  }

  handleFocus(event: FocusEvent): void {
    const element = event.target as any;
    // Support for Ionic searchbar or similar components with setFocus method
    if (element && typeof element.setFocus === 'function') {
      element.setFocus();
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    const element = event.currentTarget as HTMLElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      element.click();
    }
  }
}
