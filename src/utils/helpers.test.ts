import { describe, expect, it, vi } from 'vitest';
import { formatDate, getEndDate, sortAbsences } from './helpers';
import type { Absence } from "../types/absence";

describe('formatDate', () => {
    it('returns fomatted ISO date string', () => {
        expect(formatDate('2022-05-28T04:39:06.470Z')).toBe('28 May 2022');
    })
    it('returns fomatted ISO date string for different date', () => {
        expect(formatDate('2026-11-22T04:39:06.470Z')).toBe('22 Nov 2026');
    })
})

describe('getEndDate', () => {
    it('adds the given number of days to the start date', () => {
       const end = getEndDate('2026-11-28T04:39:06.470Z', 9);
       expect(formatDate(end)).toBe('7 Dec 2026');
    })
    it('returns the same calendar day when days is 0', () => {
      expect(formatDate(getEndDate('2026-11-22T04:39:06.470Z', 0))).toBe(
        '22 Nov 2026',
      )
    })
    it('crosses a month boundary', () => {
        expect(formatDate(getEndDate('2026-11-22T04:39:06.470Z', 9))).toBe(
        '1 Dec 2026',
      )
    })
    it('crosses a year boundary', () => {
        expect(formatDate(getEndDate('2026-12-30T12:00:00.000Z', 2))).toBe(
        '1 Jan 2027',
      )
    })
})

function mockSortableAbsence(overrides: Partial<Absence> & Pick<Absence, 'id' | 'employee'>): Absence {
    return {
        startDate: '2022-01-01T00:00:00.000Z',
        days: 1,
        absenceType: 'SICKNESS',
        approved: true,
        ...overrides,
    }
}

describe('sortAbsences', () => {
    it('sorts by name ascending', () => {
        const zane = mockSortableAbsence({
            id: 1,
            employee: { id: 'a', firstName: 'Zane', lastName: 'Young'},
        });
        const albert = mockSortableAbsence({
            id: 2,
            employee: { id: 'b', firstName: 'Albert', lastName: 'Adams'},
        });
        const result = sortAbsences([zane, albert], 'name', 'asc');
        expect(result.map((a) => a.id)).toEqual([2, 1]);
    })

    it('sorts by name descending', () => {
        const zane = mockSortableAbsence({
            id: 1,
            employee: { id: 'a', firstName: 'Zane', lastName: 'Young'},
        });
        const albert = mockSortableAbsence({
            id: 2,
            employee: { id: 'b', firstName: 'Albert', lastName: 'Adams'},
        });
        const result = sortAbsences([zane, albert], 'name', 'desc');
        expect(result.map((a) => a.id)).toEqual([1, 2]);
    })
})