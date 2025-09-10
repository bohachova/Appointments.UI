import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ServicesListComponent } from './services-list.component';
import { NextStepButtonModule } from '../next-step-button/next-step-button.module';

@NgModule({
  declarations: [
    ServicesListComponent
  ],
  imports: [
    SharedModule,
    NextStepButtonModule
  ],
  exports: [ServicesListComponent]
})
export class ServicesListModule { }

