import { NgModule } from "@angular/core";
import { NearestTimeslotsBarComponent } from "./nearest-timeslots-bar.component";
import { SharedModule } from "../../shared.module";
import { TimeslotsListModule } from "../timeslots-list/timeslots-list.module";

@NgModule({
    declarations: [
      NearestTimeslotsBarComponent
    ],
    imports: [
      SharedModule,
      TimeslotsListModule
    ],
    exports: [NearestTimeslotsBarComponent]
  })
  export class NearestTimeslotsBarModule { }