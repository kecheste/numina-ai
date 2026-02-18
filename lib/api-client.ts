const AUTH_TOKEN_KEY = "numina_access_token";

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return url.replace(/\/$/, "");
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function fetchWithAuth(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const base = getApiBaseUrl();
  const token = typeof window !== "undefined" ? getStoredToken() : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${base}${path}`, { ...options, headers });
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  birth_time?: string | null;
  birth_place?: string | null;
}

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail ?? "Login failed");
  }
  return res.json();
}

export async function apiRegister(payload: RegisterPayload): Promise<LoginResponse> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const detail = (err as { detail?: string | { msg?: string }[] }).detail;
    const message = Array.isArray(detail)
      ? detail.map((d) => (typeof d === "object" && d?.msg ? d.msg : String(d))).join(", ")
      : typeof detail === "string"
        ? detail
        : "Registration failed";
    throw new Error(message);
  }
  return res.json();
}

export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  birth_year: number | null;
  birth_month: number | null;
  birth_day: number | null;
  birth_time: string | null;
  birth_place: string | null;
  is_premium: boolean;
  subscription_status: string;
  is_active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export async function apiGetMe(): Promise<UserProfile | null> {
  const res = await fetchWithAuth("/api/v1/users/me");
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
