# Angular Smart Forms

Zero-config reactive forms with built-in validation, auto-save, and smart error handling for Angular.

## Features

- 🚀 **Zero Configuration**: Works out of the box
- 💾 **Auto-Save**: Automatically saves form data as user types
- ✅ **Smart Validation**: Built-in validators + custom validation support
- 🎨 **Visual Feedback**: Real-time error display and status indicators
- 🔧 **TypeScript**: Full TypeScript support with interfaces
- 📱 **Responsive**: Works on all devices
- 🎯 **Performance**: Optimized with debouncing and change detection

## Installation

```bash
npm install ng-smart-forms
```

## Quick Start

```typescript
// app.module.ts
import { SmartFormModule } from "ng-smart-forms";

@NgModule({
  imports: [SmartFormModule],
  // ...
})
export class AppModule {}
```

```typescript
// component.ts
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SmartValidators } from "ng-smart-forms";

@Component({
  selector: "app-example",
  template: `
    <form [formGroup]="userForm" smartForm [config]="formConfig">
      <input formControlName="email" smartInput [fieldConfig]="{ type: 'email', placeholder: 'Enter email' }" name="email" />

      <input formControlName="password" smartInput [fieldConfig]="{ type: 'password', placeholder: 'Enter password' }" name="password" />

      <button type="submit" [disabled]="!userForm.valid">Submit</button>
    </form>
  `,
})
export class ExampleComponent {
  userForm: FormGroup;
  formConfig = {
    autoSave: true,
    autoSaveDelay: 1000,
    showErrorsOnTouch: true,
  };

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, SmartValidators.strongPassword()]],
    });
  }
}
```

## API Reference

### SmartFormDirective

- `smartForm`: FormGroup instance
- `config`: SmartFormConfig options

### SmartInputDirective

- `smartInput`: FormControl instance
- `fieldConfig`: SmartFieldConfig options

### Built-in Validators

- `SmartValidators.strongPassword()`
- `SmartValidators.noSpaces()`
- `SmartValidators.phoneNumber()`
- `SmartValidators.creditCard()`

## License

MIT
