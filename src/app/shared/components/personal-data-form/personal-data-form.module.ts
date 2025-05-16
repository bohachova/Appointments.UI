import { NgModule } from "@angular/core";
import { PersonalDataFormComponent } from "./personal-data-form.component";
import { SharedModule } from "../../shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      PersonalDataFormComponent
    ],
    imports: [
      SharedModule,
      ReactiveFormsModule
    ],
    exports: [PersonalDataFormComponent]
  })
  export class PersonalDataFormModule { }