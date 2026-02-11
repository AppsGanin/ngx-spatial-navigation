import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavFocusableDirective } from './nav-focusable.directive';

@Component({
  selector: 'app-test-host',
  template: '<div navFocusable></div>',
  standalone: true,
  imports: [NavFocusableDirective],
})
class TestHostComponent { }

describe('NavFocusableDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    directiveElement = fixture.debugElement.query(By.directive(NavFocusableDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(NavFocusableDirective);
    expect(directive).toBeTruthy();
  });
});
