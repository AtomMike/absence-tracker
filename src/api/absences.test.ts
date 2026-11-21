import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Absence } from "../types/absence";
import { fetchAbsences, fetchConflict } from './absences';
import { API_URL, PATH_ABSENCES, PATH_CONFLICT } from "./constants";

const mockAbsence: Absence = {
    id: 0,
    startDate: "2022-05-28T04:39:06.470Z",
    days: 9,
    absenceType: "SICKNESS",
    employee: {
      firstName: "Rahaf",
      lastName: "Deckard",
      id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17"
    },
    approved: true,
}

afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
})

describe('fetchAbsences', () => {
    it('requests absences and returns json data', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [mockAbsence],
        })
        vi.stubGlobal('fetch', fetchMock)

        const result = await fetchAbsences()
        expect(fetchMock).toHaveBeenCalledWith(
            `${API_URL}${PATH_ABSENCES}`
        )
        expect(result).toEqual([mockAbsence])
    })
    it('Throws when response is not ok', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({ok: false, status: 500}),
        )
        await expect(fetchAbsences()).rejects.toThrow('Failed to fetch absences data')
    })
})
describe('fetchConflict', () => {
    it('requests conflict for a given id', async () => {
        
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ conflicts: true}),
        })
        vi.stubGlobal('fetch', fetchMock)

        const result = await fetchConflict(3)
        expect(fetchMock).toHaveBeenCalledWith(
            `${API_URL}${PATH_CONFLICT}3`
        )
        expect(result).toEqual({ conflicts: true})
    })
})