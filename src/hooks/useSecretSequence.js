import { useEffect, useRef } from "react";

const isTypingTarget = (target) => {
  if (!target) return false;
  const tagName = target.tagName?.toLowerCase();
  return tagName === "input" || tagName === "textarea" || target.isContentEditable;
};

const nextBuffer = (buffer, key, sequence) => {
  const candidate = `${buffer}${key}`.slice(-sequence.length);

  if (sequence.startsWith(candidate)) {
    return candidate;
  }

  return sequence.startsWith(key) ? key : "";
};

export const useSecretSequence = (sequence, onMatch, resetDelay = 2500) => {
  const bufferRef = useRef("");
  const timerRef = useRef(null);

  useEffect(() => {
    const clearBufferSoon = () => {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        bufferRef.current = "";
      }, resetDelay);
    };

    const handleKeyDown = (event) => {
      if (isTypingTarget(event.target) || event.key.length !== 1) return;

      const key = event.key.toLowerCase();
      bufferRef.current = nextBuffer(bufferRef.current, key, sequence);

      if (bufferRef.current === sequence) {
        bufferRef.current = "";
        window.clearTimeout(timerRef.current);
        onMatch();
        return;
      }

      clearBufferSoon();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timerRef.current);
    };
  }, [onMatch, resetDelay, sequence]);
};
