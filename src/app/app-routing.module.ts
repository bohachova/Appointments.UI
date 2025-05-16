import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './shared/pages/services/services.component';
import { SpecialistsComponent } from './shared/pages/specialists/specialists.component';
import { TimeSlotsComponent } from './shared/pages/timeslots/timeslots.component';
import { AppointmentCompletionComponent } from './shared/pages/appointment-completion/appointment-completion.component';
import { AuthGuard } from './services/authguard.service';

const routes: Routes = [
  { path: 'services', component: ServicesComponent },
  { path: 'specialists', component: SpecialistsComponent },
  { path: 'authorization', loadChildren: () => import ('./shared/pages/authorization/authorization.module').then(m => m.AuthorizationModule)},
  {path: 'timeslots', component: TimeSlotsComponent},
  {path: 'appointmentCompletion', component: AppointmentCompletionComponent},
  {path: "profile", loadChildren:() => import('./shared/pages/user-profile/user-profile.module').then(m => m.UserProfileModule), canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
