import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../../../models/service.interface';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss'
})
export class ServicesListComponent {
  @Input()
  public services!: Service[] | null;

  @Output()
  serviceSelected = new EventEmitter<number>();

  selectService(serviceId : number){
    this.serviceSelected.emit(serviceId);
  }
}
