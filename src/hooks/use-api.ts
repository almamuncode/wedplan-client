"use client";

import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

type Meta = { total: number; page: number; limit: number; totalPages: number };
type State<T> = { data: T | null; meta: Meta | null; error: string | null; loading: boolean };

/** Small fetch-on-mount hook for dashboard data. Call `reload()` after mutations. */
export function useApi<T>(path: string | null, query?: Record<string, string | number | undefined>) {
  const [state, setState] = useState<State<T>>({ data: null, meta: null, error: null, loading: Boolean(path) });
  const [tick, setTick] = useState(0);
  const key = JSON.stringify(query ?? {});

  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    api<T>(path, { query: JSON.parse(key) })
      .then((res) => {
        if (!cancelled) setState({ data: res.data, meta: res.meta ?? null, error: null, loading: false });
      })
      .catch((err) => {
        if (cancelled) return;
        const message = err instanceof ApiError ? err.message : "Could not load data. Check your connection.";
        setState((s) => ({ ...s, error: message, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [path, key, tick]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    setTick((t) => t + 1);
  }, []);

  return { ...state, reload };
}
