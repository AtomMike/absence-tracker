import { describe, expect, it, vi } from 'vitest';
import { formatDate, getEndDate } from './helpers';

describe('formatDate', () => {
    it('returns fomatted ISO date string', () => {
        expect(formatDate('2022-05-28T04:39:06.470Z')).toBe('28 May 2022');
    })
})
describe('getEndDate', () => {
    it('adds the given number of days to the start date', () => {
       const end = getEndDate('2026-11-28T04:39:06.470Z', 9);
       expect(formatDate(end)).toBe('7 Dec 2026');
    })
})