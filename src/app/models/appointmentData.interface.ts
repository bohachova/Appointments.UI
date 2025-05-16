import { Customer } from "./customer.interface";

export interface AppointmentData{
    customer : Customer;
    serviceId : number;
    specialistId : number;
    dateTime: Date;
}