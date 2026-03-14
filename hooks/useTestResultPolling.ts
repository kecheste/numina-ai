import { useState, useEffect, useRef } from "react";
import { apiGetTestResult, TestResultResponse } from "@/lib/api-client";
import { FlowState } from "@/components/test/types";

const POLL_INTERVAL_MS = 2500;
const MAX_POLL_ATTEMPTS = 24;

export function useTestResultPolling(
  resultId: number | null,
  enabled: boolean,
  setFlowState: (state: FlowState) => void
) {
  const [result, setResult] = useState<TestResultResponse | null>(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const pollAttemptsRef = useRef(0);
  const pollIntervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!enabled || resultId == null) return;

    setIsTimeout(false);
    pollAttemptsRef.current = 0;

    const intervalId = setInterval(() => {
      pollAttemptsRef.current += 1;
      if (pollAttemptsRef.current > MAX_POLL_ATTEMPTS) {
        if (pollIntervalIdRef.current) {
          clearInterval(pollIntervalIdRef.current);
          pollIntervalIdRef.current = null;
        }
        setIsTimeout(true);
        setFlowState("failed");
        return;
      }

      apiGetTestResult(resultId)
        .then((res) => {
          if (res.status === "completed") {
            if (pollIntervalIdRef.current) {
              clearInterval(pollIntervalIdRef.current);
              pollIntervalIdRef.current = null;
            }
            setResult(res);
            setFlowState("completed");
          }
        })
        .catch(() => {});
    }, POLL_INTERVAL_MS);

    pollIntervalIdRef.current = intervalId;

    return () => {
      if (pollIntervalIdRef.current) {
        clearInterval(pollIntervalIdRef.current);
        pollIntervalIdRef.current = null;
      }
    };
  }, [enabled, resultId, setFlowState]);

  return {
    result,
    isTimeout,
    isProcessing: enabled && !result && !isTimeout,
  };
}
