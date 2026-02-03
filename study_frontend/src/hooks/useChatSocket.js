import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Chat WebSocket hook.
 * Note: backend WebSocket URL/path is not present in current swagger.json,
 * so this defaults to `/ws/chat/` which can be updated when backend finalizes.
 */

// PUBLIC_INTERFACE
export function useChatSocket({ isEnabled, token }) {
  const [status, setStatus] = useState("DISCONNECTED");
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  const wsUrl = useMemo(() => {
    const proto = window.location.protocol === "https:" ? "wss" : "ws";
    // Assumption: websocket served from same host as frontend; adjust if backend differs.
    const host = window.location.host;
    const base = `${proto}://${host}/ws/chat/`;
    if (!token) return base;
    // Token passed as query param for compatibility with common WS auth patterns.
    return `${base}?token=${encodeURIComponent(token)}`;
  }, [token]);

  useEffect(() => {
    if (!isEnabled) return;

    setStatus("CONNECTING");
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setStatus("CONNECTED");
    ws.onclose = () => setStatus("DISCONNECTED");
    ws.onerror = () => setStatus("ERROR");
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        setMessages((prev) => [...prev, data]);
      } catch {
        setMessages((prev) => [...prev, { text: String(evt.data) }]);
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [isEnabled, wsUrl]);

  // PUBLIC_INTERFACE
  const sendMessage = (payload) => {
    /** Send a message over the socket if connected. */
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify(payload));
    return true;
  };

  return { status, messages, setMessages, sendMessage };
}
