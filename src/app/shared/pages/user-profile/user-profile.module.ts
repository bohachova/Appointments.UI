import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./user-profile.component";
import { SharedModule } from "../../shared.module";
import { PersonalDataFormModule } from "../../components/personal-data-form/personal-data-form.module";
import { AppointmentsComponent } from "../appointments/appointments.component";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentsListModule } from "../../components/appointments-list/appointments-list.module";

const routes: Routes = [
  { path: '', component: UserProfileComponent},
  { path: 'appointments', component: AppointmentsComponent}
];

@NgModule({
    declarations: [
      UserProfileComponent,
      AppointmentsComponent
    ],
    imports: [
      SharedModule,
      PersonalDataFormModule,
      AppointmentsListModule,
      RouterModule.forChild(routes)
    ],
    exports:[
      AppointmentsComponent
    ]
  })
  export class UserProfileModule { }