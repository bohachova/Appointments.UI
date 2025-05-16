export interface TimeSlotsRequest{
    specialistId: number;
    date: Date;
    serviceSelected: boolean;
    serviceId?: number;
    intervalsCount?: number;
}