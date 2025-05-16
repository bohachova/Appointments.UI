import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AuthorizationComponent } from './authorization.component';
import { InputFieldModule } from '../../components/input-field/input-field.module';
import { SubmitButtonModule } from '../../components/submit-button/submit-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { PersonalDataFormModule } from '../../components/personal-data-form/personal-data-form.module';

const routes: Routes = [
  { path: '', component: AuthorizationComponent},
  { path: 'registration', component: RegistrationComponent}
];

@NgModule({
  declarations: [
    AuthorizationComponent,
    RegistrationComponent
  ],
  imports: [
    SharedModule,
    InputFieldModule,
    SubmitButtonModule,
    PersonalDataFormModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RegistrationComponent
  ]
})
export class AuthorizationModule { }