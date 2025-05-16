import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { InputFieldComponent } from './input-field.component';

@NgModule({
  declarations: [
    InputFieldComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [InputFieldComponent]
})
export class InputFieldModule { }