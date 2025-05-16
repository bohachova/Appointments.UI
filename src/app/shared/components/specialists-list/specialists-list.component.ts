import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Specialist } from '../../../models/specialist.interface';
import { TimeSlot } from '../../../models/timeslot.interface';

@Component({
  selector: 'app-specialists-list',
  templateUrl: './specialists-list.component.html',
  styleUrl: './specialists-list.component.scss'
})
export class SpecialistsListComponent {
  @Input()
  public specialists!: Specialist[] | null;
  @Input()
  public serviceId : number | undefined;

  @Output()
  specialistWithTimeslotSelected = new EventEmitter<TimeSlot>();

  @Output()
  specialistSelected = new EventEmitter<number>();

  selectSpecialist(specialistId : number){
    this.specialistSelected.emit(specialistId);
  }

  onTimeslotWithSpecialistSelected(slot: TimeSlot){
    this.specialistWithTimeslotSelected.emit(slot);
  }

}
