import type { Absence } from "../types/absence";

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

export function sortAbsences(absences: Absence[], sortType: string, direction: SortDirection): Absence[] {
    const sorted = [...absences];
    
    sorted.sort((a, b) => {
        if (sortType === 'name') {
            const nameA = `${a.employee.firstName} ${a.employee.lastName}`;
            const nameB = `${b.employee.firstName} ${b.employee.lastName}`;
            const result = nameA.localeCompare(nameB);
            return direction === 'asc' ? result : -result;
        }
        return 0;
    });

    return sorted;
}