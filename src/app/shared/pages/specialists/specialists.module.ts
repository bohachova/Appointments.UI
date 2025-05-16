import { NgModule } from '@angular/core';
import { SpecialistsComponent } from './specialists.component';
import { SharedModule } from '../../shared.module';
import { SpecialistsListModule } from '../../components/specialists-list/specialists-list.module';
import { CommonModule } from '@angular/common';
import { NearestTimeslotsBarModule } from '../../components/nearest-timeslots-bar/nearest-timeslots-bar.module';
import { NextStepButtonModule } from '../../components/next-step-button/next-step-button.module';

@NgModule({
  declarations: [
    SpecialistsComponent
  ],
  imports: [
    SharedModule,
    SpecialistsListModule,
    NearestTimeslotsBarModule,
    NextStepButtonModule
  ]
})
export class SpecialistsModule { }

