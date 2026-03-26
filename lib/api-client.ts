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
  options: RequestInit = {},
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
  full_name?: string | null;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  birth_time?: string | null;
  birth_place?: string | null;
  birth_place_lat?: number | null;
  birth_place_lng?: number | null;
  birth_place_timezone?: string | null;
}

export async function apiLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {
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

export async function apiRegister(
  payload: RegisterPayload,
): Promise<LoginResponse> {
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
      ? detail
          .map((d) => (typeof d === "object" && d?.msg ? d.msg : String(d)))
          .join(", ")
      : typeof detail === "string"
        ? detail
        : "Registration failed";
    throw new Error(message);
  }
  return res.json();
}

export interface ForgotPasswordResponse {
  message: string;
}

export async function apiForgotPassword(
  email: string,
): Promise<ForgotPasswordResponse> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/v1/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail ?? "Request failed");
  }
  return res.json();
}

export async function apiResetPassword(
  token: string,
  newPassword: string,
): Promise<{ message: string }> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/v1/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password: newPassword }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail ?? "Reset failed");
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
  birth_place_lat: number | null;
  birth_place_lng: number | null;
  birth_place_timezone: string | null;
  is_premium: boolean;
  subscription_status: string;
  is_active: boolean;
  role: string;
  life_path_number: number | null;
  mbti_type: string | null;
  mbti_descriptor: string | null;
  strongest_chakra: string | null;
  sun_sign: string | null;
  sun_description: string | null;
  moon_sign: string | null;
  moon_description: string | null;
  rising_sign: string | null;
  rising_description: string | null;
  cosmic_traits_summary: string | null;
  astrology_blueprint: any | null;
  numerology_blueprint: any[] | null;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

export async function apiGetMe(): Promise<UserProfile | null> {
  const res = await fetchWithAuth("/api/v1/users/me");
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export interface CheckoutSessionResponse {
  url: string;
}

export async function apiCreateCheckoutSession(): Promise<CheckoutSessionResponse> {
  const res = await fetchWithAuth(
    "/api/v1/subscription/create-checkout-session",
    {
      method: "POST",
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Could not start checkout",
    );
  }
  return res.json();
}

export interface TestFromApi {
  id: number;
  slug: string;
  title: string;
  category: string;
  category_id: string;
  questions: number;
  auto_generated: boolean;
  premium: boolean;
  already_taken: boolean;
}

export interface TestsListResponse {
  user_is_premium: boolean;
  tests: TestFromApi[];
}

function normalizeTestsResponse(data: unknown): TestsListResponse {
  if (Array.isArray(data)) {
    return {
      user_is_premium: false,
      tests: data.map((t: Record<string, unknown>) => ({
        id: t.id as number,
        slug: (t.slug as string) ?? `test-${t.id}`,
        title: t.title as string,
        category: t.category as string,
        category_id: t.category_id as string,
        questions: t.questions as number,
        auto_generated: (t.auto_generated as boolean) ?? false,
        premium: (t.premium as boolean) ?? false,
        already_taken: (t.already_taken as boolean) ?? false,
      })),
    };
  }
  const obj = data as TestsListResponse;
  if (obj && typeof obj.tests === "object" && Array.isArray(obj.tests)) {
    return {
      user_is_premium: obj.user_is_premium ?? false,
      tests: obj.tests.map((t) => ({
        id: t.id,
        slug: t.slug ?? `test-${t.id}`,
        title: t.title,
        category: t.category,
        category_id: t.category_id,
        questions: t.questions,
        auto_generated: t.auto_generated ?? false,
        premium: t.premium ?? false,
        already_taken: t.already_taken ?? false,
      })),
    };
  }
  return { user_is_premium: false, tests: [] };
}

export async function apiFetchTests(): Promise<TestsListResponse> {
  const res = await fetchWithAuth("/api/v1/tests");
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to fetch tests");
  const data: unknown = await res.json();
  return normalizeTestsResponse(data);
}

/** Show this question only when another question's answer equals value */
export interface ShowWhenFromApi {
  question_id: number;
  value: string;
}

/** Single question from GET /tests/{test_id}/questions */
export interface QuestionFromApi {
  id: number;
  prompt: string;
  answer_type:
    | "text"
    | "date"
    | "time"
    | "single_choice"
    | "multiple_choice"
    | "slider"
    | "color";
  options: string[] | null;
  slider_min: number;
  slider_max: number;
  required: boolean;
  /** Use that question's answer (list) as options for this question */
  options_from_question_id?: number | null;
  /** Only show when answer of question_id equals value */
  show_when?: ShowWhenFromApi | null;
  /** For multiple_choice: allow at most this many selections */
  max_selections?: number | null;
}

export async function apiFetchTestQuestions(
  testIdOrSlug: number | string,
): Promise<QuestionFromApi[]> {
  const res = await fetchWithAuth(`/api/v1/tests/${testIdOrSlug}/questions`);
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 404) return [];
  if (res.status === 409) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ??
        "You have already taken this test.",
    );
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Failed to fetch questions",
    );
  }
  return res.json();
}

/** Response from GET /api/v1/tests/astrology-chart (user birth data). */
export interface AstrologyChartResponse {
  sun_sign: string;
  moon_sign: string;
  rising_sign: string;
  element_distribution: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  sun_description: string | null;
  moon_description: string | null;
  rising_description: string | null;
  cosmic_traits_summary: string | null;
}

/** Fetch current user's astrology chart. Auth required. 404 if birth data incomplete. */
export async function apiFetchAstrologyChart(): Promise<AstrologyChartResponse> {
  const res = await fetchWithAuth("/api/v1/tests/astrology-chart");
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 404) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ??
        "Birth data incomplete. Add birth date and place in profile.",
    );
  }
  if (!res.ok) throw new Error("Failed to load astrology chart");
  return res.json();
}

/** Response from GET /api/v1/tests/numerology (user birth date + name). */
export interface NumerologyResponse {
  life_path: number;
  soul_urge: number;
  birth_day: number;
  expression_number: number;
  life_path_description?: string | null;
  soul_urge_description?: string | null;
  birth_day_description?: string | null;
  expression_description?: string | null;
  items?: NumerologyBlueprintItem[] | null;
}

/** Fetch current user's numerology. Auth required. 404 if birth date or name missing. */
export async function apiFetchNumerology(): Promise<NumerologyResponse> {
  const res = await fetchWithAuth("/api/v1/tests/numerology");
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 404) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ??
        "Birth date and name are required. Add them in your profile.",
    );
  }
  if (!res.ok) throw new Error("Failed to load numerology");
  return res.json();
}

export interface AstrologyBlueprintResponse {
  status: "pending_ai" | "completed";
  result_id?: number;
  sun_description?: string;
  moon_description?: string;
  rising_description?: string;
  cosmic_traits_summary?: string;
  strengths?: string[];
  challenges?: string[];
  avoid_this?: string[];
  overlaps?: AstrologyChartNarrativeOverlap[];
  try_this?: string[];
  spiritual_insight?: string;
}

export async function apiFetchOnboardingAstrologyBlueprint(): Promise<AstrologyBlueprintResponse> {
  const res = await fetchWithAuth(
    "/api/v1/tests/onboarding/astrology-blueprint",
  );
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 404) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Birth data incomplete.",
    );
  }
  if (!res.ok) throw new Error("Failed to load astrology blueprint");
  return res.json();
}

export interface AstrologyChartNarrativeOverlap {
  label: string;
  description: string;
}

export interface AstrologyChartNarrativeResponse {
  status: "pending_ai" | "completed";
  result_id?: number;
  title?: string;
  short_description?: string;
  core_traits?: string[];
  sun_description?: string;
  moon_description?: string;
  rising_description?: string;
  narrative?: string;
  strengths?: string[];
  challenges?: string[];
  avoid_this?: string[];
  overlaps?: AstrologyChartNarrativeOverlap[];
  try_this?: string[];
  spiritual_insight?: string;
  cosmic_traits_summary?: string;
}

export async function apiFetchAstrologyChartNarrative(): Promise<AstrologyChartNarrativeResponse> {
  const res = await fetchWithAuth("/api/v1/tests/astrology-chart-narrative");
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 404) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail ?? "Not found");
  }
  if (!res.ok) throw new Error("Failed to load astrology chart narrative");
  return res.json();
}

export interface NumerologyBlueprintItem {
  number: string;
  title: string;
  description: string;
}

export interface NumerologyBlueprintResponse {
  status: "pending_ai" | "completed";
  result_id?: number;
  items?: NumerologyBlueprintItem[];
}

export async function apiFetchOnboardingNumerologyBlueprint(): Promise<NumerologyBlueprintResponse> {
  const res = await fetchWithAuth(
    "/api/v1/tests/onboarding/numerology-blueprint",
  );
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 404) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Birth date and name required.",
    );
  }
  if (!res.ok) throw new Error("Failed to load numerology blueprint");
  return res.json();
}

export async function apiFinishOnboarding(): Promise<{ message: string }> {
  const res = await fetchWithAuth("/api/v1/tests/onboarding/finish", {
    method: "POST",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Failed to finish onboarding",
    );
  }
  return res.json();
}

export interface QuestionAnswerItem {
  question_id: number;
  prompt: string;
  answer_type?: string;
  answer: string | number | string[];
}

export interface SubmitTestRequest {
  test_id: number;
  test_title: string;
  category: string;
  answers: QuestionAnswerItem[];
}

export interface SubmitTestResponse {
  result_id: number;
  status: string;
  message?: string;
}

export interface TestResultResponse {
  id: number;
  user_id: number;
  test_id: number;
  test_title: string;
  category: string;
  completed_at: string;
  answers: QuestionAnswerItem[] | Record<string, unknown>;
  status: string;
  score: number | null;
  personality_type: string | null;
  insights: string[] | null;
  recommendations: string[] | null;
  narrative: string | null;
  extracted_json?: any | null;
  llm_result_json?: {
    title?: string;
    summary?: string;
    shortDescription?: string;
    narrative?: string;
    overview?: string;
    energyBlueprint?: string;
    decisionGuidance?: string;
    coreTraits?: string[];
    strengths?: string[];
    challenges?: string[];
    spiritualInsight?: string;
    tryThis?: string[];
    avoidThis?: string[];
    personalityConscious?: string[];
    designUnconscious?: string[];
    synchronicities?: {
      test?: string;
      connection?: string;
      label?: string;
      description?: string;
    }[];
    confidence?: Record<string, number>;
    chartData?: unknown[];
    strongestChakra?: string;
    needsRebalancing?: string;
    statusSummary?: string;
    chakras?: {
      id: string;
      name: string;
      status: string;
      description: string;
      tryItems?: string | null;
      avoidItems?: string | null;
    }[];
    howItShowsUp?: string;
    hiddenStrength?: string;
    growthEdge?: string;
    shadowPattern?: string;
    secondaryPattern?: string;
    lifePath?: string;
    soulUrge?: string;
    expression?: string;
    birthday?: string;
    numerology_blueprint?: any[];
    extracted_json?: any;
    mentalPattern?: string;
    emotionalTone?: string;
    currentImbalance?: string;
    hiddenInsight?: string;
    growthDirection?: string;
    primary_archetype?: string;
    secondary_archetype?: string;
    balance_score?: number;
    scores?: Record<string, number>;
    consciousVsUnconscious?: string;
    cognitiveStyle?: string;
    sunSign?: string;
    moonSign?: string;
    risingSign?: string;
    astrologicalPattern?: string;
  } | null;
}

export interface SynthesisResponse {
  type: "preview" | "full";
  completed_count: number;
  result: {
    youAre?: string;
    sureThings?: string[];
    identitySummary?: string;
    growthAreas?: string[];
    nextFocus?: string;
    themes?: string[];
    strengths?: string[];
    shadowPatterns?: string[];
  };
}

export interface DailyMessageResponse {
  message: string;
  quote: string;
}

export async function apiGetDailyMessage(): Promise<DailyMessageResponse> {
  const res = await fetchWithAuth("/api/v1/daily-message");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Failed to load daily message",
    );
  }
  return res.json();
}

export async function apiGetSynthesis(): Promise<SynthesisResponse | null> {
  const res = await fetchWithAuth("/api/v1/synthesis");
  if (res.status === 401) throw new Error("Unauthorized");
  if (res.status === 404) return null;
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Failed to load synthesis",
    );
  }
  return res.json();
}

export async function apiSubmitTest(
  body: SubmitTestRequest,
): Promise<SubmitTestResponse> {
  const res = await fetchWithAuth("/api/v1/tests/submit", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Failed to submit test",
    );
  }
  return res.json();
}

export async function apiListTestResults(
  testId?: number,
): Promise<TestResultResponse[]> {
  const qs = testId != null ? `?test_id=${testId}` : "";
  const res = await fetchWithAuth(`/api/v1/tests/results${qs}`);
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: string }).detail ?? "Failed to load results",
    );
  }
  return res.json();
}

export async function apiGetTestResult(
  resultId: number,
): Promise<TestResultResponse> {
  const res = await fetchWithAuth(`/api/v1/tests/results/${resultId}`);
  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail ?? "Result not found");
  }
  return res.json();
}
