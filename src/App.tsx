import { AbsencesTable } from './components/AbsencesTable';
import {useAbsences} from './hooks/useAbsences';

function App() {
  const { absences, status, error } = useAbsences();
  if (status === 'loading') return <main><p>Loading data</p></main>;
  if (status === 'error') return <main><p>{error}</p></main>;

  return (
    <main>
      <h1>Absence TrackerTron</h1>
      <AbsencesTable absences={absences} />
    </main>
  )
}

export default App
