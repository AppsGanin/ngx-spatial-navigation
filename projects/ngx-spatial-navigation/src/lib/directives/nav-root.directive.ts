import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { getFirstFocusableElement, getNextFocus } from '../utils/spatial-navigation';

@Directive({
  selector: '[navRoot]',
  standalone: true,
  host: {
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class NavRootDirective implements AfterViewInit {
  constructor(private readonly el: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ensureFocusExists();
    }, 100);
  }

  private ensureFocusExists(): void {
    // Check if there's already a focused element
    if (document.activeElement && document.activeElement !== document.body) {
      return;
    }

    // If no focus, set focus to the first focusable element
    const firstFocusable = getFirstFocusableElement(this.el.nativeElement);
    if (firstFocusable) {
      const element = firstFocusable as any;

      // Support for Ionic components with setFocus method
      if (element && typeof element.setFocus === 'function') {
        element.setFocus();
      } else {
        element.focus();
      }

      element.scrollIntoView({ block: 'center' });
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    const element = event.target as HTMLElement;

    if (
      ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
    ) {
      if (
        ['ArrowLeft', 'ArrowRight'].includes(event.key) &&
        [
          'text',
          'password',
          'email',
          'number',
          'search',
          'tel',
          'url',
        ].includes(element.getAttribute('type')!)
      ) {
        return;
      }

      event.preventDefault();

      const nextFocus = getNextFocus(
        element,
        event.keyCode,
        this.el.nativeElement
      );
      if (nextFocus) {
        nextFocus.focus();
        nextFocus.scrollIntoView({ block: 'center' });
      }
    }
  }
}
