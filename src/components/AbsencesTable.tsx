import type { Absence } from "../types/absence"
import { formatDate, getEndDate } from "../utils/helpers";

type Props = { absences: Absence[] };

export function AbsencesTable({absences}: Props) {
    if (!absences || absences.length === 0) return (
        <p className="text-gray-600">No absences</p>
    )

    return (
        <table className="w-full border-collapse text-left text-sm">
            <thead>
                <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="px-3 py-2 font-semibold">Start</th>
                    <th className="px-3 py-2 font-semibold">End</th>
                    <th className="px-3 py-2 font-semibold">Employee</th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                    <th className="px-3 py-2 font-semibold">Type</th>
                </tr>
            </thead>
            <tbody>
                {absences.map((a) => (
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