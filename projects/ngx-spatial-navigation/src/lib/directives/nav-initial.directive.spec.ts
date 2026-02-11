import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavInitialDirective } from './nav-initial.directive';

@Component({
    selector: 'app-test-host',
    template: '<div navInitial></div>',
    standalone: true,
    imports: [NavInitialDirective],
})
class TestHostComponent { }

describe('NavInitialDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let directiveElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        directiveElement = fixture.debugElement.query(By.directive(NavInitialDirective));
    });

    it('should create an instance', () => {
        const directive = directiveElement.injector.get(NavInitialDirective);
        expect(directive).toBeTruthy();
    });

    it('should set tabindex if not present', () => {
        fixture.detectChanges();
        expect(directiveElement.nativeElement.hasAttribute('tabindex')).toBe(true);
    });

    it('should have nav-initial-focused class', () => {
        fixture.detectChanges();
        expect(directiveElement.nativeElement.classList.contains('nav-initial-focused')).toBe(true);
    });

    it('should set focus on element after view init', async () => {
        spyOn(directiveElement.nativeElement, 'focus');
        fixture.detectChanges();
        await fixture.whenStable();

        expect(directiveElement.nativeElement.focus).toHaveBeenCalled();
    });

    it('should scroll element into view', async () => {
        spyOn(directiveElement.nativeElement, 'scrollIntoView');
        fixture.detectChanges();
        await fixture.whenStable();

        expect(directiveElement.nativeElement.scrollIntoView).toHaveBeenCalledWith(
            { block: 'center' }
        );
    });
});

