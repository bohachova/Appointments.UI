import { NgModule } from "@angular/core";
import { AppointmentCompletionComponent } from "./appointment-completion.component";
import { SharedModule } from "../../shared.module";
import { PersonalDataFormModule } from "../../components/personal-data-form/personal-data-form.module";

@NgModule({
    declarations: [
      AppointmentCompletionComponent
    ],
    imports: [
      SharedModule,
      PersonalDataFormModule
    ],
    exports:[
      AppointmentCompletionComponent
    ]
  })
  export class AppointmentCompletionModule { }