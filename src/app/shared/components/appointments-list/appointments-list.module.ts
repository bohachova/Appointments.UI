import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { AppointmentsListComponent } from "./appointments-list.component";

@NgModule({
  declarations: [
    AppointmentsListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [AppointmentsListComponent]
})
export class AppointmentsListModule { }