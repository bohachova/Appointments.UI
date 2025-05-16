import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { Appointment } from "../../../models/appointment.interface";
import { AuthService } from "../../../services/auth.service";
import { AppointmentStatus } from "../../../enums/appointmentStatuses.enum";

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.scss'
  })
  export class AppointmentsComponent implements OnInit{
    public appointments: Appointment[] = [];
    cancelOption: boolean = false;
    AppointmentStatus = AppointmentStatus;
    selectedStatus: AppointmentStatus = AppointmentStatus.Active;
    userId: number;

    constructor(private apiService: ApiService, private authService: AuthService){
        this.userId = Number(this.authService.getUserId());
    }
    
    ngOnInit(){
        this.loadAppointments();
    }

    loadAppointments(){
        const request = {
            id: this.userId,
            status : this.selectedStatus
        };
        this.apiService.viewCustomersAppointments(request).subscribe(
            (result) => {this.appointments = result}
        );
        if(this.selectedStatus == AppointmentStatus.Active){
            this.cancelOption = true;
        }
        else{
            this.cancelOption = false;
        }
    }

    changeSelectedStatus(status : AppointmentStatus){
        this.selectedStatus = status;
        this.loadAppointments();
    }

    onAppointmentCancelled(appointmentId: number){
        this.apiService.cancelAppointment({id: appointmentId}).subscribe();
    }
}
  