import type { Absence } from "../types/absence";
import type { ConflictResponse } from "../types/conflict";

export async function fetchAbsences(): Promise<Absence[]> {
    const response = await fetch(
        'https://front-end-kata.brighthr.workers.dev/api/absences'
    );
    if (!response.ok) throw new Error("Failed to fetch absences data");

    return response.json();
}

export async function fetchConflict(id: number): Promise<ConflictResponse> {
    const response = await fetch(
        `https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`
    );

    if (!response.ok) throw new Error("Failed to fetch conflict data");

    return response.json();
}