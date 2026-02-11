import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavSectionDirective } from './nav-section.directive';

@Component({
  selector: 'app-test-host',
  template: '<div navSection></div>',
  standalone: true,
  imports: [NavSectionDirective],
})
class TestHostComponent { }

describe('NavSectionDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    directiveElement = fixture.debugElement.query(By.directive(NavSectionDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(NavSectionDirective);
    expect(directive).toBeTruthy();
  });
});
