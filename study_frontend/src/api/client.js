/**
 * Minimal API client for Study Hub.
 * - Supports token auth (Bearer) when available
 * - Works with DRF Basic auth if backend is configured that way
 * - Centralizes error handling and JSON parsing
 */

const DEFAULT_API_BASE = "/api";

/** Try to parse JSON; fall back to text. */
async function parseResponseBody(res) {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  const text = await res.text();
  return text ? { detail: text } : null;
}

/**
 * Create an API client bound to a base URL and token getter.
 * The backend OpenAPI we downloaded indicates basePath `/api`.
 */
// PUBLIC_INTERFACE
export function createApiClient({ baseUrl = DEFAULT_API_BASE, getToken }) {
  /** Internal request helper. */
  async function request(path, { method = "GET", body, headers } = {}) {
    const token = getToken?.();

    const finalHeaders = {
      "Content-Type": "application/json",
      ...(headers || {}),
    };

    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const data = await parseResponseBody(res);

    if (!res.ok) {
      const message =
        (data && (data.detail || data.error || data.message)) ||
        `Request failed (${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  }

  return {
    // PUBLIC_INTERFACE
    async health() {
      /** Check backend availability. */
      return request("/health/", { method: "GET" });
    },

    // PUBLIC_INTERFACE
    async loginBasic({ username, password }) {
      /**
       * If backend uses Basic auth only, we can't store a token.
       * This helper returns a Basic header value so the caller can keep it as "token".
       */
      const encoded = btoa(`${username}:${password}`);
      return { token: `Basic ${encoded}`, mode: "basic" };
    },

    // PUBLIC_INTERFACE
    async getMe() {
      /**
       * Best-effort "me" endpoint; not present in current swagger.json.
       * Kept for future compatibility when backend adds it.
       */
      return request("/me/", { method: "GET" });
    },
  };
}
