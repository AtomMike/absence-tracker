import { useEffect, useState } from "react";
import { fetchConflict } from "../api/absences";
import type { Absence } from "../types/absence";

type Status = 'loading' | 'success' | 'error';

export function useConflicts(absences: Absence[]) {
    const [conflictsById, setConflictsById] = useState<Record<number, boolean>>({});
    const [status, setStatus] = useState<Status>('loading');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        if (absences.length === 0) {
            setConflictsById({});
            setStatus('loading');
            return;
        };

        async function load() {
            setStatus('loading');
            setError(null);

            try {
                const results = await Promise.all(
                    absences.map(async (a) => {
                        const { conflicts } = await fetchConflict(a.id);
                        return [a.id, conflicts] as const;
                    })
                )
                const map = Object.fromEntries(results);

                if (!cancelled) {
                    setConflictsById(map);
                    setStatus('success');
                }
            } catch(err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load conflict');
                    setStatus('error');
                }
            }
        }
        void load();

        return () => {
            cancelled = true;
        }
        
    }, [absences]);

    return { conflictsById, status, error };
}