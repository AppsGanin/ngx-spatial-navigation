import {
  AfterContentInit,
  booleanAttribute,
  contentChildren,
  Directive,
  ElementRef,
  input
} from '@angular/core';

import { NavFocusableDirective } from './nav-focusable.directive';

@Directive({
  selector: '[navSection]',
  standalone: true,
  host: {
    'class': 'lrud-container',
    '[class.lrud-ignore]': 'ignore()',
  },
})
export class NavSectionDirective implements AfterContentInit {
  readonly ignore = input(false, { transform: booleanAttribute });
  readonly focus = input(false, { transform: booleanAttribute });

  readonly focusables = contentChildren(NavFocusableDirective, {
    descendants: true,
    read: ElementRef,
  });

  ngAfterContentInit(): void {
    if (!this.ignore() && this.focus()) {
      setTimeout(() => {
        this.focusables()[0]?.nativeElement.focus();
      }, 500);
    }
  }
}
