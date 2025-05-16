import { NgModule } from "@angular/core";
import { TimeSlotsComponent } from "./timeslots.component";
import { SharedModule } from "../../shared.module";
import { DatePickerModule } from "../../components/datepicker/datepicker.module";
import { TimeslotsListModule } from "../../components/timeslots-list/timeslots-list.module";
import { NextStepButtonModule } from "../../components/next-step-button/next-step-button.module";

@NgModule({
    declarations: [
      TimeSlotsComponent
    ],
    imports: [
    SharedModule,
    DatePickerModule,
    TimeslotsListModule,
    NextStepButtonModule
]
  })
  export class TimeSlotsModule { }