import { useEffect, useState } from "react";
import type { Absence } from "../types/absence";
import { fetchAbsences } from "../api/absences";

type Status = 'loading' | 'success' | 'error';

export function useAbsences() {
    const [absences, setAbsences] = useState<Absence[]>([]);
    const [status, setStatus] = useState<Status>('loading');
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        let cancelled = false;

        async function load() {
            setStatus('loading');
            setError(null);

            try {
                const data = await fetchAbsences();

                if (!cancelled) {
                    setAbsences(data);
                    setStatus('success');
                }
            } catch(err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load absences');
                    setStatus('error');
                }
            }
        }
        void load();
        return () => {
            cancelled = true;
        }
    }, [])

    return { absences, status, error};
}