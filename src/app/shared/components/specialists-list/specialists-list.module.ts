import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SpecialistsListComponent } from './specialists-list.component';
import { NearestTimeslotsBarModule } from '../nearest-timeslots-bar/nearest-timeslots-bar.module';

@NgModule({
  declarations: [
    SpecialistsListComponent
  ],
  imports: [
    SharedModule,
    NearestTimeslotsBarModule
  ],
  exports: [SpecialistsListComponent]
})
export class SpecialistsListModule { }

