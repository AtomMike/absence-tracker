import { AbsencesTable } from './components/AbsencesTable';
import {useAbsences} from './hooks/useAbsences';
import { useConflicts } from './hooks/useConflicts';

function App() {
  const { absences, status, error } = useAbsences();
  const { conflictsById } = useConflicts(absences);

  if (status === 'loading') return <main><p>Loading data</p></main>;
  if (status === 'error') return <main><p>{error}</p></main>;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900">Absence TrackerTron</h1>
      <AbsencesTable absences={absences} conflictsById={conflictsById} />
    </main>
  )
}

export default App
