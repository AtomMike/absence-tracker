import { useState } from "react";
import { filterAbsencesByEmployee, formatDate, getEndDate, sortAbsences } from "../utils/helpers";
import type { Absence } from "../types/absence";
import type { SortDirection, SortType } from "../utils/helpers";

type Props = { 
    absences: Absence[], 
    conflictsById: Record<number, boolean>
};

export function AbsencesTable({absences, conflictsById}: Props) {
    const [sortType, setSortType] = useState<SortType>('date');
    const [direction, setDirection] = useState<SortDirection>('asc');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

    if (!absences || absences.length === 0) return (
        <p className="text-gray-600">No absences</p>
    )

    const filtered = filterAbsencesByEmployee(absences, selectedEmployeeId);
    const sorted = sortAbsences(filtered, sortType, direction);

    function handleSort(next: SortType) {
        if (next === sortType) {
            setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortType(next)
            setDirection('asc')
        }
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {selectedEmployeeId && filtered[0] && (
                <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="text-sm text-gray-700">
                        Showing absences for{' '}
                        <span className="font-semibold text-gray-900">
                        {filtered[0].employee.firstName} {filtered[0].employee.lastName}
                        </span>
                        <span className="text-gray-500"> ({filtered.length})</span>
                    </p>
                    <button
                        type="button"
                        className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        onClick={() => setSelectedEmployeeId(null)}
                    >
                        Show all
                    </button>
                </div>
            )}
            <table className="w-full border-collapse text-left text-sm text-gray-800">
                <thead>
                    <tr className="border-b border-gray-300 bg-gray-50 text-gray-600">
                        <th className="px-4 py-3 font-semibold">
                            <button type="button" className="font-semibold text-gray-700 hover:text-gray-900 cursor-pointer" onClick={() => handleSort('date')}>Start</button>
                        </th>
                        <th className="px-4 py-3 font-semibold">End</th>
                        <th className="px-4 py-3 font-semibold">
                            <button className="font-semibold text-gray-700 hover:text-gray-900 cursor-pointer" onClick={() => handleSort('name')}>Employee</button>
                        </th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">
                            <button className="font-semibold text-gray-700 hover:text-gray-900 cursor-pointer" onClick={() => handleSort('absenceType')}>Type</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((a) => {
                        const hasConflict = conflictsById[a.id] === true;

                        return(
                            <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3">{formatDate(a.startDate)}</td>
                                <td className="px-4 py-3">{formatDate(getEndDate(a.startDate, a.days))}</td>
                                <td className="px-4 py-3">
                                    <button 
                                        type="button" 
                                        className="font-semibold text-gray-700 hover:text-gray-900 cursor-pointer" 
                                        onClick={() => setSelectedEmployeeId(a.employee.id)}
                                    >
                                        {a.employee.firstName} {a.employee.lastName}
                                    </button>
                                </td>
                                <td className="px-4 py-3">
                                    <span>{a.approved ? 'Approved' : 'Pending'}</span>
                                    {hasConflict && (
                                        <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">
                                            Conflict
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3">{a.absenceType}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}