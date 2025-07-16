import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SmartFieldConfig } from '../interfaces/smart-form.interface';

@Directive({
    selector: '[smartInput]',
    standalone: true
})
export class SmartInputDirective implements OnInit {
    @Input() smartInput!: FormControl;
    @Input() fieldConfig: SmartFieldConfig = {};

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        this.setupFieldEnhancements();
        this.addErrorContainer();
    }

    private setupFieldEnhancements(): void {
        const input = this.el.nativeElement;

        // Add placeholder if configured
        if (this.fieldConfig.placeholder) {
            this.renderer.setAttribute(input, 'placeholder', this.fieldConfig.placeholder);
        }

        // Add input type if configured
        if (this.fieldConfig.type) {
            this.renderer.setAttribute(input, 'type', this.fieldConfig.type);
        }

        // Add visual feedback classes
        this.renderer.addClass(input, 'smart-input');

        // Add focus/blur effects
        this.renderer.listen(input, 'focus', () => {
            this.renderer.addClass(input, 'smart-input-focused');
        });

        this.renderer.listen(input, 'blur', () => {
            this.renderer.removeClass(input, 'smart-input-focused');
        });
    }

    private addErrorContainer(): void {
        const errorDiv = this.renderer.createElement('div');
        this.renderer.addClass(errorDiv, 'smart-input-error');
        this.renderer.setStyle(errorDiv, 'color', '#e74c3c');
        this.renderer.setStyle(errorDiv, 'font-size', '12px');
        this.renderer.setStyle(errorDiv, 'margin-top', '5px');
        this.renderer.setStyle(errorDiv, 'display', 'none');

        const fieldName = this.el.nativeElement.getAttribute('name') || 'field';
        this.renderer.setAttribute(errorDiv, 'data-error', fieldName);

        // Use appendChild to parent or insertBefore with nextSibling
        const parent = this.el.nativeElement.parentNode;
        const nextSibling = this.el.nativeElement.nextSibling;

        if (nextSibling) {
            this.renderer.insertBefore(parent, errorDiv, nextSibling);
        } else {
            this.renderer.appendChild(parent, errorDiv);
        }
    }
}