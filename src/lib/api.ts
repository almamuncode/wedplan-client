"use client";

import { authClient } from "./auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export type Paginated<T> = { data: T[]; meta: { total: number; page: number; limit: number; totalPages: number } };

// The Better Auth JWT lives only in memory (never localStorage) and is
// refreshed shortly before it expires.
let cachedToken: { value: string; exp: number } | null = null;
let inflight: Promise<string | null> | null = null;

function decodeExp(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export async function getApiToken(force = false): Promise<string | null> {
  if (!force && cachedToken && cachedToken.exp - Date.now() > 60_000) return cachedToken.value;
  if (!inflight) {
    inflight = authClient
      .token()
      .then(({ data }) => {
        const token = data?.token ?? null;
        cachedToken = token ? { value: token, exp: decodeExp(token) } : null;
        return token;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function clearApiToken() {
  cachedToken = null;
}

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
  query?: Record<string, string | number | boolean | undefined | null>;
};

/** Fetch wrapper for the Express API. Throws ApiError with the server's message. */
export async function api<T = unknown>(path: string, { body, auth = true, query, headers, ...init }: ApiOptions = {}) {
  const url = new URL(path.startsWith("/") ? path : `/${path}`, API_URL);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const send = async (token: string | null) => {
    const isForm = typeof FormData !== "undefined" && body instanceof FormData;
    return fetch(url, {
      ...init,
      headers: {
        ...(isForm || body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
    });
  };

  let token = auth ? await getApiToken() : null;
  let res = await send(token);

  // Token may have expired between checks: refresh once and retry.
  if (res.status === 401 && auth) {
    token = await getApiToken(true);
    if (token) res = await send(token);
  }

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(res.status, json?.message ?? `Request failed (${res.status})`, json?.details);
  }
  return json as { success: true; message?: string; data: T; meta?: Paginated<T>["meta"] };
}

/** Uploads a single image through the API (ImgBB key stays on the server). */
export async function uploadImage(file: File) {
  const form = new FormData();
  form.append("image", file);
  const res = await api<{ url: string }>("/api/uploads/image", { method: "POST", body: form, auth: false });
  return res.data.url;
}
