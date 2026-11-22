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

export function sortAbsences(absences: Absence[], sortType: string, direction: string) {
    return [...absences];
}