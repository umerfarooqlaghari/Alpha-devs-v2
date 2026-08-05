/**
 * Direct SalesAgent embed client (publishable key — browser-safe).
 * Used by ChatBot; extracted for unit/integration tests with mocks.
 */

export type SalesAgentConfig = {
  baseUrl: string;
  publishableKey: string;
};

export type EmbedSession = {
  ok?: boolean;
  tenant_id: string;
  org_name: string;
  console_thread_id: string;
  vapi_public_key: string;
  vapi_assistant_id: string;
  warmup?: {
    ok?: boolean;
    cached?: boolean;
    chars?: number;
    status?: "ready" | "warming" | string;
  };
  metadata?: {
    tenant_id?: string;
    org_name?: string;
    console_thread_id?: string;
  };
  message?: string;
  error?: string;
  detail?: string;
};

export type QueryResult =
  | { ok: true; answer: string; tenantId?: string; elapsedMs: number }
  | { ok: false; error: string; status?: number; elapsedMs: number };

export type SessionResult =
  | { ok: true; session: EmbedSession; elapsedMs: number }
  | { ok: false; error: string; status?: number; elapsedMs: number; body?: unknown };

function normalizeBaseUrl(url: string): string {
  return (url || "").replace(/\/$/, "");
}

export function getSalesAgentConfigFromEnv(
  env: Record<string, string | undefined> = typeof process !== "undefined"
    ? (process.env as Record<string, string | undefined>)
    : {}
): SalesAgentConfig {
  return {
    baseUrl: normalizeBaseUrl(
      env.NEXT_PUBLIC_SALES_AGENT_URL || "http://127.0.0.1:8765"
    ),
    publishableKey: env.NEXT_PUBLIC_SALES_AGENT_PUBLISHABLE_KEY || "",
  };
}

export async function querySalesAgent(
  question: string,
  config: SalesAgentConfig,
  fetchImpl: typeof fetch = fetch,
  context = "Alpha-Devs sales inquiry"
): Promise<QueryResult> {
  const started = performance.now();
  if (!config.publishableKey) {
    return {
      ok: false,
      error: "Missing NEXT_PUBLIC_SALES_AGENT_PUBLISHABLE_KEY",
      elapsedMs: performance.now() - started,
    };
  }
  if (!question.trim()) {
    return {
      ok: false,
      error: "Question is required",
      elapsedMs: performance.now() - started,
    };
  }

  try {
    const response = await fetchImpl(`${config.baseUrl}/api/widget/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.publishableKey}`,
      },
      body: JSON.stringify({ question, context }),
    });
    const elapsedMs = performance.now() - started;

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return {
        ok: false,
        error: text || `SalesAgent query failed (${response.status})`,
        status: response.status,
        elapsedMs,
      };
    }

    const data = (await response.json()) as {
      answer?: string;
      response?: string;
      tenant_id?: string;
    };
    return {
      ok: true,
      answer:
        data.answer ||
        data.response ||
        "I'm still learning about that. Could you ask another question?",
      tenantId: data.tenant_id,
      elapsedMs,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      elapsedMs: performance.now() - started,
    };
  }
}

export async function createEmbedSession(
  config: SalesAgentConfig,
  fetchImpl: typeof fetch = fetch,
  body: Record<string, unknown> = {}
): Promise<SessionResult> {
  const started = performance.now();
  if (!config.publishableKey) {
    return {
      ok: false,
      error: "Missing NEXT_PUBLIC_SALES_AGENT_PUBLISHABLE_KEY",
      elapsedMs: performance.now() - started,
    };
  }

  try {
    const response = await fetchImpl(`${config.baseUrl}/api/embed/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.publishableKey}`,
      },
      body: JSON.stringify(body),
    });
    const elapsedMs = performance.now() - started;
    const data = (await response.json().catch(() => ({}))) as EmbedSession & {
      detail?: string;
      error?: string;
      message?: string;
    };

    if (!response.ok) {
      return {
        ok: false,
        error: data?.detail || data?.message || data?.error || "Failed to initiate call",
        status: response.status,
        elapsedMs,
        body: data,
      };
    }

    // Best-effort: ensure FAQ/knowledge is hot before Vapi's first LLM turn
    if (data.warmup?.status !== "ready") {
      try {
        await fetchImpl(`${config.baseUrl}/api/embed/warmup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.publishableKey}`,
          },
          body: "{}",
        });
      } catch {
        /* non-fatal */
      }
    }

    return { ok: true, session: data, elapsedMs: performance.now() - started };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      elapsedMs: performance.now() - started,
    };
  }
}

/** True when session has everything needed to start Vapi with tenant metadata. */
export function isVoiceSessionReady(session: EmbedSession): boolean {
  const apiKey = (session.vapi_public_key || "").trim();
  const assistantId = (session.vapi_assistant_id || "").trim();
  const tenantId = (session.tenant_id || session.metadata?.tenant_id || "").trim();
  return Boolean(apiKey && assistantId && tenantId);
}

export function buildVapiMetadata(session: EmbedSession): {
  tenant_id: string;
  org_name: string;
  console_thread_id: string;
} {
  return {
    tenant_id: session.tenant_id || session.metadata?.tenant_id || "",
    org_name: session.org_name || session.metadata?.org_name || "Alpha Devs",
    console_thread_id:
      session.console_thread_id ||
      session.metadata?.console_thread_id ||
      "",
  };
}
