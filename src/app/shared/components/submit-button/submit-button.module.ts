import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SubmitButtonComponent } from './submit-button.component';

@NgModule({
  declarations: [
    SubmitButtonComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [SubmitButtonComponent]
})
export class SubmitButtonModule { }