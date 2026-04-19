"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Soepele typewriter-stream:
 * - chunks worden in een ref-buffer gepushed
 * - een rAF-loop reveal't karakters met constante snelheid
 * - render gebeurt max 1x per frame (niet per chunk)
 * - bij snelle binnenkomst: snelheid schaalt mee zodat we niet achterlopen
 */
export function useStreamingText(charsPerSecond = 80) {
  const [visibleText, setVisibleText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bufferRef = useRef("");          // alles wat nog onthuld moet worden
  const revealedRef = useRef("");        // wat al getoond is
  const finishedRef = useRef(false);     // network klaar?
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  const tick = useCallback(
    (now: number) => {
      const dt = lastTickRef.current ? (now - lastTickRef.current) / 1000 : 0;
      lastTickRef.current = now;

      // Hoeveel karakters moeten we deze frame onthullen?
      // Als buffer groot is, schalen we snelheid op (catch-up).
      const pending = bufferRef.current.length;
      const baseRate = charsPerSecond;
      const catchUp = Math.min(4, 1 + pending / 80); // max 4x sneller bij grote backlog
      const charsThisFrame = Math.max(1, Math.floor(dt * baseRate * catchUp));

      if (pending > 0) {
        const take = bufferRef.current.slice(0, charsThisFrame);
        bufferRef.current = bufferRef.current.slice(charsThisFrame);
        revealedRef.current += take;
        setVisibleText(revealedRef.current);
      }

      if (bufferRef.current.length === 0 && finishedRef.current) {
        // Klaar
        rafRef.current = null;
        lastTickRef.current = 0;
        setIsStreaming(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [charsPerSecond]
  );

  const ensureLoop = useCallback(() => {
    if (rafRef.current == null) {
      lastTickRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const start = useCallback(() => {
    bufferRef.current = "";
    revealedRef.current = "";
    finishedRef.current = false;
    setVisibleText("");
    setIsStreaming(true);
    ensureLoop();
  }, [ensureLoop]);

  const push = useCallback(
    (chunk: string) => {
      if (!chunk) return;
      bufferRef.current += chunk;
      ensureLoop();
    },
    [ensureLoop]
  );

  const finish = useCallback(() => {
    finishedRef.current = true;
    ensureLoop();
  }, [ensureLoop]);

  const reset = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    bufferRef.current = "";
    revealedRef.current = "";
    finishedRef.current = false;
    lastTickRef.current = 0;
    setVisibleText("");
    setIsStreaming(false);
  }, []);

  // Vervang complete tekst direct (voor cached / restored content)
  const setInstant = useCallback((text: string) => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    bufferRef.current = "";
    revealedRef.current = text;
    finishedRef.current = true;
    setVisibleText(text);
    setIsStreaming(false);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { visibleText, isStreaming, start, push, finish, reset, setInstant };
}
