import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { config } from "../../environments/environment";
import { Observable } from "rxjs";
import { Specialist } from "../models/specialist.interface";
import {Service} from "../models/service.interface";
import { Customer } from "../models/customer.interface";
import { RegistrationStatusRequest } from "../models/requests/registrationStatusRequest.interface";
import { TimeSlot } from "../models/timeslot.interface";
import { GetAvailableServicesRequest } from "../models/requests/getAvailableServicesRequest.interface";
import { TimeSlotsRequest } from "../models/requests/timeslotsRequest.interface";
import { AppointmentData } from "../models/appointmentData.interface";
import { AppointmentsRequest } from "../models/requests/appointmentsRequest.interface";
import { Appointment } from "../models/appointment.interface";
import { EditCustomerAccountRequest } from "../models/requests/editCustomerAccountRequest.interface";
import { Response } from "../responses/response.interface";
import { RegistrationStatusResponse } from "../responses/registratiobStatusResponse.interface";

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient) {
    }

    public getAllSpecialists(): Observable<Specialist[]> {
        const url = `${config.apiEndpoint}/api/specialists/all`;
        return this.httpClient.get<Specialist[]>(url);
    }

    public getSpecialistsByService(serviceId : number) : Observable<Specialist[]>{
        const url = `${config.apiEndpoint}/api/specialists/${serviceId}`;
        return this.httpClient.get<Specialist[]>(url);
    }

    public getAvailableSpecialists(serviceCode: number, requestedSpecialists : Specialist[]) : Observable<Specialist[]>{
        const url = `${config.apiEndpoint}/api/specialists/${serviceCode}/available`;
        return this.httpClient.post<Specialist[]>(url, requestedSpecialists);
    }

    public getAllServices(): Observable<Service[]>{
        const url = `${config.apiEndpoint}/api/services/all`;
        return this.httpClient.get<Service[]>(url);
    }

    public getSpecialistsServices(specialistId : number): Observable<Service[]>{
        const url = `${config.apiEndpoint}/api/services/${specialistId}`;
        return this.httpClient.get<Service[]>(url);
    }

    public getAvailableServicesByTime(request : GetAvailableServicesRequest): Observable<Service[]>{
        const url = `${config.apiEndpoint}/api/services/time`;
        return this.httpClient.post<Service[]>(url, request);
    }

    public checkRegistrationStatus(customerData : RegistrationStatusRequest): Observable<RegistrationStatusResponse>{
        const url = `${config.apiEndpoint}/api/authorization/status`;
        return this.httpClient.post<RegistrationStatusResponse>(url, customerData);
    }

    public getAllTimeslots(date : Date) : Observable<TimeSlot[]>{
        const url = `${config.apiEndpoint}/api/timeslots/all`;
        return this.httpClient.post<TimeSlot[]>(url, date);
    }

    public getRequestedTimeslots(request : TimeSlotsRequest) : Observable<TimeSlot[]>{
        const url = `${config.apiEndpoint}/api/timeslots/requested`;
        return this.httpClient.post<TimeSlot[]>(url, request);
    }

    public createAppointment (data : AppointmentData) : Observable<Response>{
        const url = `${config.apiEndpoint}/api/appointments/create`;
        return this.httpClient.post<Response>(url, data);
    }
    
    public viewCustomersAppointments (request : AppointmentsRequest): Observable<Appointment[]>{
        const url = `${config.apiEndpoint}/api/appointments/list`;
        return this.httpClient.post<Appointment[]>(url, request);
    }

    public cancelAppointment (request : AppointmentsRequest) : Observable<Response>{
        const url = `${config.apiEndpoint}/api/appointments/cancel`;
        return this.httpClient.post<Response>(url, request);
    }

    public viewCustomerAccount () : Observable<Customer>{
        const url = `${config.apiEndpoint}/api/profiles/profile`;
        return this.httpClient.get<Customer>(url);
    }

    public editCustomerAccount(request : EditCustomerAccountRequest) : Observable<Customer>{
        const url = `${config.apiEndpoint}/api/profiles/edit`;
        return this.httpClient.post<Customer>(url, request);
    }

    public viewSpecialistsWorkingDays(id : number) : Observable<number[]>{
        const url = `${config.apiEndpoint}/api/schedule/${id}`;
        return this.httpClient.get<number[]>(url);
    }
}