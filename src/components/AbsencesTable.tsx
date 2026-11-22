import type { Absence } from "../types/absence"
import { formatDate, getEndDate } from "../utils/helpers";

type Props = { absences: Absence[] };

export function AbsencesTable({absences}: Props) {
    if (!absences || absences.length === 0) return (
        <p>No absences</p>
    )

    return (
        <table>
            <thead>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Employee</th>
                    <th>Status</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {absences.map((a) => (
                    <tr key={a.id}>
                        <td>{formatDate(a.startDate)}</td>
                        <td>{formatDate(getEndDate(a.startDate, a.days))}</td>
                        <td>{a.employee.firstName} {a.employee.lastName}</td>
                        <td>{a.approved ? 'Approved' : 'Pending'}</td>
                        <td>{a.absenceType}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}