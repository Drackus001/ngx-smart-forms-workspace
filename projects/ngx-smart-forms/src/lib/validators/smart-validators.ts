import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SmartValidators {
    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const minLength = value.length >= 8;

            const valid = hasUpper && hasLower && hasNumber && hasSpecial && minLength;

            if (!valid) {
                return {
                    strongPassword: {
                        hasUpper,
                        hasLower,
                        hasNumber,
                        hasSpecial,
                        minLength
                    }
                };
            }
            return null;
        };
    }

    static noSpaces(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            return value.includes(' ') ? { noSpaces: true } : null;
        };
    }

    static phoneNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(value) ? null : { phoneNumber: true };
        };
    }

    static creditCard(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            // Luhn algorithm
            let sum = 0;
            let isEven = false;

            for (let i = value.length - 1; i >= 0; i--) {
                let digit = parseInt(value.charAt(i), 10);

                if (isEven) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }

                sum += digit;
                isEven = !isEven;
            }

            return sum % 10 === 0 ? null : { creditCard: true };
        };
    }
}