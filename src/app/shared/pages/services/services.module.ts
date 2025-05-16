import { NgModule } from '@angular/core';
import { ServicesComponent } from './services.component';
import { SharedModule } from '../../shared.module';
import { ServicesListModule } from '../../components/services-list/services-list.module';
import { NextStepButtonModule } from '../../components/next-step-button/next-step-button.module';

@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    SharedModule,
    ServicesListModule,
    NextStepButtonModule
  ]
})
export class ServicesModule { }
