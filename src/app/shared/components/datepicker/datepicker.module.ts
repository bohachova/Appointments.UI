import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { DatePickerComponent } from "./datepicker.component";

@NgModule({
    declarations: [
      DatePickerComponent
    ],
    imports: [
      SharedModule
    ],
    exports: [DatePickerComponent]
  })
  export class DatePickerModule { }