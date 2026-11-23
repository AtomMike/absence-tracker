import { useState } from "react";
import { formatDate, getEndDate, sortAbsences } from "../utils/helpers";
import type { Absence } from "../types/absence";
import type { SortDirection, SortType } from "../utils/helpers";

type Props = { absences: Absence[] };

export function AbsencesTable({absences}: Props) {
    const [sortType, setSortType] = useState<SortType>('date');
    const [direction, setDirection] = useState<SortDirection>('asc');

    if (!absences || absences.length === 0) return (
        <p className="text-gray-600">No absences</p>
    )

    const sorted = sortAbsences(absences, sortType, direction);

    function handleSort(next: SortType) {
        if (next === sortType) {
            setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortType(next)
            setDirection('asc')
        }
    }

    return (
        <table className="w-full border-collapse text-left text-sm">
            <thead>
                <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="px-3 py-2 font-semibold" onClick={() => handleSort('date')}>Start</th>
                    <th className="px-3 py-2 font-semibold">End</th>
                    <th className="px-3 py-2 font-semibold" onClick={() => handleSort('name')}>Employee</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                    <th className="px-3 py-2 font-semibold" onClick={() => handleSort('absenceType')}>Type</th>
                </tr>
            </thead>
            <tbody>
                {sorted.map((a) => (
                    <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-3 py-2">{formatDate(a.startDate)}</td>
                        <td className="px-3 py-2">{formatDate(getEndDate(a.startDate, a.days))}</td>
                        <td className="px-3 py-2">{a.employee.firstName} {a.employee.lastName}</td>
                        <td className="px-3 py-2">{a.approved ? 'Approved' : 'Pending'}</td>
                        <td className="px-3 py-2">{a.absenceType}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}