import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Service } from '../../../models/service.interface';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss'
})
export class ServicesListComponent implements OnChanges {

  selectedOption : number | null = null;
  filteredServices: Service [] | null = null;

  @Input()
  public services!: Service[] | null;

  @Output()
  serviceSelected = new EventEmitter<number>();

  ngOnChanges(): void{
    this.applyFilter();
  }

  applyFilter(){
    this.filteredServices = Array.from(
      new Map(this.services?.map(item => [item.id, item])).values()
    );
  }

  selectService(serviceId : number){
    this.selectedOption = serviceId;
    this.serviceSelected.emit(serviceId);
  }
}
