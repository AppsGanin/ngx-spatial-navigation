import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavRootDirective } from './nav-root.directive';

@Component({
  selector: 'app-test-host',
  template: '<div navRoot></div>',
  standalone: true,
  imports: [NavRootDirective],
})
class TestHostComponent { }

describe('NavRootDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    directiveElement = fixture.debugElement.query(By.directive(NavRootDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = directiveElement.injector.get(NavRootDirective);
    expect(directive).toBeTruthy();
  });
});
