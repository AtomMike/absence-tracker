import type { Absence } from "../types/absence";
import type { ConflictResponse } from "../types/conflict";
import { API_URL, PATH_ABSENCES, PATH_CONFLICT } from "./constants";

export async function fetchAbsences(): Promise<Absence[]> {
    const response = await fetch(
        `${API_URL}${PATH_ABSENCES}`
    );
    if (!response.ok) throw new Error("Failed to fetch absences data");

    return response.json();
}

export async function fetchConflict(id: number): Promise<ConflictResponse> {
    const response = await fetch(
        `${API_URL}${PATH_CONFLICT}${id}`
    );

    if (!response.ok) throw new Error("Failed to fetch conflict data");

    return response.json();
}