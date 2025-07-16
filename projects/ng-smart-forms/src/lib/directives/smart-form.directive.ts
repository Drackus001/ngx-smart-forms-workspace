import { Directive, Input, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SmartFormConfig } from '../interfaces/smart-form.interface';
import { AutoSaveService } from '../services/auto-save.service';

@Directive({
    selector: '[smartForm]',
    standalone: true
})
export class SmartFormDirective implements OnInit, OnDestroy {
    @Input() smartForm!: FormGroup;
    @Input() config: SmartFormConfig = {};

    private destroy$ = new Subject<void>();
    private defaultConfig: SmartFormConfig = {
        autoSave: true,
        autoSaveDelay: 2000,
        showErrorsOnTouch: true,
        validateOnChange: true,
        errorMessages: {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            minlength: 'Minimum length not met',
            maxlength: 'Maximum length exceeded',
            pattern: 'Invalid format',
            strongPassword: 'Password must contain uppercase, lowercase, number, and special character',
            noSpaces: 'Spaces are not allowed',
            phoneNumber: 'Please enter a valid phone number',
            creditCard: 'Please enter a valid credit card number'
        }
    };

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private autoSaveService: AutoSaveService
    ) { }

    ngOnInit(): void {
        this.config = { ...this.defaultConfig, ...this.config };
        this.setupAutoSave();
        this.setupValidation();
        this.addStatusIndicator();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setupAutoSave(): void {
        if (this.config.autoSave) {
            this.smartForm.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe(value => {
                    if (this.smartForm.valid) {
                        this.autoSaveService.triggerSave(value);
                    }
                });
        }
    }

    private setupValidation(): void {
        if (this.config.validateOnChange) {
            this.smartForm.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.updateErrorDisplay();
                });
        }

        this.smartForm.statusChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.updateErrorDisplay();
            });
    }

    private updateErrorDisplay(): void {
        Object.keys(this.smartForm.controls).forEach(key => {
            const control = this.smartForm.get(key);
            const errorElement = this.el.nativeElement.querySelector(`[data-error="${key}"]`);

            if (control && errorElement) {
                const shouldShow = control.errors && (control.touched || !this.config.showErrorsOnTouch);

                if (shouldShow) {
                    const errorMessage = this.getErrorMessage(control.errors);
                    errorElement.textContent = errorMessage;
                    this.renderer.setStyle(errorElement, 'display', 'block');
                } else {
                    this.renderer.setStyle(errorElement, 'display', 'none');
                }
            }
        });
    }

    private getErrorMessage(errors: any): string {
        const errorKey = Object.keys(errors)[0];
        return this.config.errorMessages?.[errorKey] || 'Invalid input';
    }

    private addStatusIndicator(): void {
        if (this.config.autoSave) {
            const statusEl = this.renderer.createElement('div');
            this.renderer.addClass(statusEl, 'smart-form-status');
            this.renderer.setStyle(statusEl, 'font-size', '12px');
            this.renderer.setStyle(statusEl, 'color', '#666');
            this.renderer.setStyle(statusEl, 'margin-top', '5px');
            this.renderer.appendChild(this.el.nativeElement, statusEl);

            this.autoSaveService.getSaveStatus()
                .pipe(takeUntil(this.destroy$))
                .subscribe(status => {
                    const messages = {
                        idle: '',
                        saving: '💾 Saving...',
                        saved: '✅ Saved',
                        error: '❌ Save failed'
                    };
                    statusEl.textContent = messages[status];
                });
        }
    }
}