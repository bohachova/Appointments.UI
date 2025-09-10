import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Specialist } from '../../../models/specialist.interface';
import { TimeSlot } from '../../../models/timeslot.interface';
import { Grade } from '../../../enums/grades.enum';


@Component({
  selector: 'app-specialists-list',
  templateUrl: './specialists-list.component.html',
  styleUrl: './specialists-list.component.scss'
})
export class SpecialistsListComponent {
  Grade = Grade;
  selectedOption: number | null = null;

  @Input()
  public specialists!: Specialist[] | null;
  @Input()
  public serviceId : number | undefined;
  @Input()
  public timeSelected: boolean = false;

  @Output()
  specialistWithTimeslotSelected = new EventEmitter<TimeSlot>();

  @Output()
  specialistSelected = new EventEmitter<number>();

  selectSpecialist(specialistId : number){
    this.selectedOption = specialistId;
    this.specialistSelected.emit(specialistId);
  }

  onTimeslotWithSpecialistSelected(slot: TimeSlot){
    this.selectedOption = slot.specialistId!;
    this.specialistWithTimeslotSelected.emit(slot);
  }

}
