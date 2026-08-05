import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildVapiMetadata,
  createEmbedSession,
  getSalesAgentConfigFromEnv,
  isVoiceSessionReady,
  querySalesAgent,
  type EmbedSession,
  type SalesAgentConfig,
} from "./salesAgentClient";

const CONFIG: SalesAgentConfig = {
  baseUrl: "http://salesagent.test:8765",
  publishableKey: "pk_live_test_key_abc",
};

function jsonResponse(body: unknown, status = 200, delayMs = 0): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(JSON.stringify(body), {
          status,
          headers: { "Content-Type": "application/json" },
        })
      );
    }, delayMs);
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getSalesAgentConfigFromEnv", () => {
  it("reads publishable URL + key (positive)", () => {
    const cfg = getSalesAgentConfigFromEnv({
      NEXT_PUBLIC_SALES_AGENT_URL: "http://127.0.0.1:8765/",
      NEXT_PUBLIC_SALES_AGENT_PUBLISHABLE_KEY: "pk_live_x",
    });
    expect(cfg.baseUrl).toBe("http://127.0.0.1:8765");
    expect(cfg.publishableKey).toBe("pk_live_x");
  });

  it("defaults URL when missing (negative key empty)", () => {
    const cfg = getSalesAgentConfigFromEnv({});
    expect(cfg.baseUrl).toBe("http://127.0.0.1:8765");
    expect(cfg.publishableKey).toBe("");
  });
});

describe("querySalesAgent", () => {
  it("positive: returns answer and uses Bearer pk_", async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      jsonResponse({
        status: "success",
        answer: "We build AI ERP and computer vision.",
        tenant_id: "alpha_devs_c12c3774",
      })
    );

    const result = await querySalesAgent("What do you build?", CONFIG, fetchMock as unknown as typeof fetch);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.answer).toContain("AI ERP");
      expect(result.tenantId).toBe("alpha_devs_c12c3774");
      expect(result.elapsedMs).toBeLessThan(500);
    }
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://salesagent.test:8765/api/widget/query");
    expect((init as RequestInit).method).toBe("POST");
    expect((init as RequestInit).headers).toMatchObject({
      Authorization: "Bearer pk_live_test_key_abc",
    });
    const body = JSON.parse(String((init as RequestInit).body));
    expect(body.question).toBe("What do you build?");
    expect(body.context).toBe("Alpha-Devs sales inquiry");
  });

  it("negative: missing publishable key", async () => {
    const fetchMock = vi.fn();
    const result = await querySalesAgent("hi", { ...CONFIG, publishableKey: "" }, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/PUBLISHABLE_KEY/);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("negative: empty question", async () => {
    const fetchMock = vi.fn();
    const result = await querySalesAgent("   ", CONFIG, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/required/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("negative: upstream 401", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("Invalid or inactive API key", { status: 401 })
    );
    const result = await querySalesAgent("hi", CONFIG, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(401);
      expect(result.error).toMatch(/Invalid|failed/i);
    }
  });

  it("negative: network failure", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Failed to fetch"));
    const result = await querySalesAgent("hi", CONFIG, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/Failed to fetch/);
  });

  it("latency: mock fast path stays under 200ms", async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      jsonResponse({ answer: "fast" }, 200, 5)
    );
    const result = await querySalesAgent("ping", CONFIG, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(true);
    expect(result.elapsedMs).toBeLessThan(200);
  });
});

describe("createEmbedSession", () => {
  const goodSession: EmbedSession = {
    ok: true,
    tenant_id: "alpha_devs_c12c3774",
    org_name: "Alpha Devs",
    console_thread_id: "embed_abc123",
    vapi_public_key: "vapi_public_xyz",
    vapi_assistant_id: "asst_123",
    warmup: { ok: true, cached: true, chars: 1200, status: "ready" },
    metadata: {
      tenant_id: "alpha_devs_c12c3774",
      org_name: "Alpha Devs",
      console_thread_id: "embed_abc123",
    },
  };

  it("positive: session includes tenant metadata + vapi keys", async () => {
    const fetchMock = vi.fn().mockImplementation(() => jsonResponse(goodSession));
    const result = await createEmbedSession(CONFIG, fetchMock as unknown as typeof fetch);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(isVoiceSessionReady(result.session)).toBe(true);
      expect(result.session.warmup?.status).toBe("ready");
      expect(result.elapsedMs).toBeLessThan(500);
      const meta = buildVapiMetadata(result.session);
      expect(meta.tenant_id).toBe("alpha_devs_c12c3774");
      expect(meta.console_thread_id).toBe("embed_abc123");
    }
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://salesagent.test:8765/api/embed/session");
    expect((init as RequestInit).headers).toMatchObject({
      Authorization: "Bearer pk_live_test_key_abc",
    });
  });

  it("negative: missing key", async () => {
    const fetchMock = vi.fn();
    const result = await createEmbedSession(
      { ...CONFIG, publishableKey: "" },
      fetchMock as unknown as typeof fetch
    );
    expect(result.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("negative: incomplete Vapi config is not voice-ready", async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      jsonResponse({
        ...goodSession,
        vapi_public_key: "",
        vapi_assistant_id: "",
        message: "Vapi not configured",
      })
    );
    const result = await createEmbedSession(CONFIG, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(isVoiceSessionReady(result.session)).toBe(false);
    }
  });

  it("negative: 401 from SalesAgent", async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      jsonResponse({ detail: "Authentication required" }, 401)
    );
    const result = await createEmbedSession(CONFIG, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(401);
      expect(result.error).toMatch(/Authentication/);
    }
  });

  it("latency: session mock does not wait on slow catalog (client elapsed)", async () => {
    // Server returns immediately with status=warming — client must not add delay
    const fetchMock = vi.fn().mockImplementation(() =>
      jsonResponse(
        {
          ...goodSession,
          warmup: { ok: true, cached: false, chars: 0, status: "warming" },
        },
        200,
        10
      )
    );
    const result = await createEmbedSession(CONFIG, fetchMock as unknown as typeof fetch);
    expect(result.ok).toBe(true);
    expect(result.elapsedMs).toBeLessThan(200);
    if (result.ok) {
      expect(result.session.warmup?.status).toBe("warming");
    }
  });
});

describe("isVoiceSessionReady / buildVapiMetadata", () => {
  it("negative: missing tenant_id", () => {
    expect(
      isVoiceSessionReady({
        tenant_id: "",
        org_name: "X",
        console_thread_id: "c",
        vapi_public_key: "k",
        vapi_assistant_id: "a",
      })
    ).toBe(false);
  });

  it("positive: metadata fallbacks", () => {
    const meta = buildVapiMetadata({
      tenant_id: "",
      org_name: "",
      console_thread_id: "",
      vapi_public_key: "k",
      vapi_assistant_id: "a",
      metadata: {
        tenant_id: "t1",
        org_name: "Org",
        console_thread_id: "thread1",
      },
    });
    expect(meta).toEqual({
      tenant_id: "t1",
      org_name: "Org",
      console_thread_id: "thread1",
    });
  });
});
