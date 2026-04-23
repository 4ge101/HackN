import { useState, useEffect } from "react";
import { fetchUser } from "../services/hnApi";
import useStore from "../store/useStore";

export function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getUser, setUser: cacheUser } = useStore();

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        let u = getUser(id);
        if (!u) {
          u = await fetchUser(id);
          cacheUser(u);
        }
        if (!cancelled) setUser(u);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { user, loading, error };
}
