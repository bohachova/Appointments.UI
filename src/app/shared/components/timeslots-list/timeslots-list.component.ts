import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TimeSlot } from "../../../models/timeslot.interface";

@Component({
    selector: 'app-timeslots-list',
    templateUrl: './timeslots-list.component.html',
    styleUrl: './timeslots-list.component.scss'
  })
  export class TimeslotsListComponent {
    timeslotsUnits : string[] = [];

    @Input()
    timeslots!: TimeSlot[] | null;

    @Output()
    timeslotSelected = new EventEmitter<TimeSlot[]>();

    ngOnInit(): void {
      this.applyFilter();
    }

    applyFilter(){
      const datetimeNow = new Date();
      this.timeslotsUnits = Array.from(
        new Set(
          this.timeslots?.map(item => item.start)
        )
      );
    }

    selectTimeslot(timeslot : string, event : MouseEvent){
      event.stopPropagation();
      const slots = this.timeslots?.filter(item => item.start == timeslot);
      this.timeslotSelected.emit(slots);
    }

  }