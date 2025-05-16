import { NgModule } from "@angular/core";
import { TimeslotsListComponent } from "./timeslots-list.component";
import { SharedModule } from "../../shared.module";

@NgModule({
    declarations: [
      TimeslotsListComponent
    ],
    imports: [
      SharedModule
    ],
    exports: [TimeslotsListComponent]
  })
  export class TimeslotsListModule { }