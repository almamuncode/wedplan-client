import "server-only";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/** Public (no auth) GET from a Server Component. Returns null instead of throwing. */
export async function publicGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(new URL(path, API_URL), { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}
