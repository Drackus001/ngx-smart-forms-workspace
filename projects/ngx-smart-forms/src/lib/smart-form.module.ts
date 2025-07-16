import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SmartFormDirective } from './directives/smart-form.directive';
import { SmartInputDirective } from './directives/smart-input.directive';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SmartFormDirective,
        SmartInputDirective
    ],
    exports: [
        SmartFormDirective,
        SmartInputDirective
    ]
})
export class SmartFormModule { }