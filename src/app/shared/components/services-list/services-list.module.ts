import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ServicesListComponent } from './services-list.component';

@NgModule({
  declarations: [
    ServicesListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [ServicesListComponent]
})
export class ServicesListModule { }

