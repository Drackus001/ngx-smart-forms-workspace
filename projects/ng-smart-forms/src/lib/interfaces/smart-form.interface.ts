export interface SmartFormConfig {
    autoSave?: boolean;
    autoSaveDelay?: number;
    showErrorsOnTouch?: boolean;
    validateOnChange?: boolean;
    customValidators?: { [key: string]: any };
    errorMessages?: { [key: string]: string };
}

export interface SmartFieldConfig {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customValidators?: any[];
    errorMessages?: { [key: string]: string };
    placeholder?: string;
    debounceTime?: number;
}

export interface ValidationResult {
    valid: boolean;
    errors: { [key: string]: any };
    touched: boolean;
    dirty: boolean;
}