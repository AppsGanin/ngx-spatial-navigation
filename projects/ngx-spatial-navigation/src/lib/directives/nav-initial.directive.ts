import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[navInitial]',
  standalone: true,
  host: {
    'class': 'nav-initial-focused',
  },
})
export class NavInitialDirective implements AfterViewInit {
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) { }

  ngAfterViewInit(): void {
    // Ensure element is focusable
    if (!this.el.nativeElement.hasAttribute('tabindex')) {
      this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
    }

    setTimeout(() => {
      const element = this.el.nativeElement as any;

      // Support for Ionic components with setFocus method
      if (element && typeof element.setFocus === 'function') {
        element.setFocus();
      } else {
        element.focus();
      }

      element.scrollIntoView({ block: 'center' });
    }, 0);
  }
}
