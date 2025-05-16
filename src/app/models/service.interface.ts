export interface Service {
    id: number;
    serviceName: string;
    timing: number;
    specialistId?: number;
    prices?: number[];
}