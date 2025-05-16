import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Appointment } from "../../../models/appointment.interface";

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.scss'
})
export class AppointmentsListComponent {
  @Input()
  public appointments!: Appointment[] | null;
  @Input()
  public cancelOption: boolean = false;

  cancelledAppointments = new Set<number>();

  @Output()
  appointmentCancelled = new EventEmitter<number>();

  cancelAppointment(appointmentId: number){
    this.cancelledAppointments.add(appointmentId);
    this.appointmentCancelled.emit(appointmentId);
  }

  isCancelled(id: number) : boolean{
    return this.cancelledAppointments.has(id);
  }
}
