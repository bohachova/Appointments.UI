import { Grade } from "../enums/grades.enum";

export interface Specialist {
    id: number;
    firstName: string;
    lastName: string;
    grade: Grade;
    price?: number;
}