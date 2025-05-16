import { AppointmentStatus } from "../../enums/appointmentStatuses.enum";

export interface AppointmentsRequest {
    id: number;
    status? : AppointmentStatus;
}