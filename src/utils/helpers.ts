import type { Absence, AbsenceType } from "../types/absence";

export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

export function getEndDate(isoStart: string, days: number): string {
    const startDate = new Date(isoStart);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days);

    return endDate.toISOString();
}

export type SortDirection = 'asc' | 'desc';
export type SortType = 'name' | 'date' | 'absenceType';

export function sortAbsences(absences: Absence[], sortType: SortType, direction: SortDirection): Absence[] {
    const sorted = [...absences];
    
    sorted.sort((a, b) => {
        let rowA: string;
        let rowB: string;

        if (sortType === 'name') {
            rowA = `${a.employee.firstName} ${a.employee.lastName}`;
            rowB = `${b.employee.firstName} ${b.employee.lastName}`;
        } else if (sortType === 'date') {
            rowA = a.startDate;
            rowB = b.startDate;
        } else if (sortType === 'absenceType') {
            rowA = String(a.absenceType);
            rowB = String(b.absenceType);
        } else {
            return 0;
        }
        const result = rowA.localeCompare(rowB);
        return direction === 'asc' ? result : -result;
    });

    return sorted;
}

export function filterAbsencesByEmployee(absences: Absence[], employeeId: string | null): Absence[] {
    
}