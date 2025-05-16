import { RegistrationStatus } from "../enums/registrationStatuses.enum";

export interface RegistrationStatusResponse{
    status: RegistrationStatus;
    id: number;
}