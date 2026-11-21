export type AbsenceType = 'SICKNESS' | 'MEDICAL' | 'ANNUAL_LEAVE' | 'FAMILY';

export interface Employee {
    firstName: string,
    lastName: string,
    id: string
};

export interface Absence {
    id: number,
    startDate: string,
    days: number,
    absenceType: AbsenceType | string,
    employee: Employee,
    approved: boolean,
};