import { useState, useEffect } from "react";
import { apiGetTestResult, TestResultResponse } from "@/lib/api-client";
import { FlowState } from "@/components/test/types";
import { useWebSocket } from "@/contexts/WebSocketContext";

const POLL_INTERVAL_MS = 2500;
const MAX_POLL_ATTEMPTS = 24;

export function useTestResultPolling(
  resultId: number | null,
  enabled: boolean,
  setFlowState: (state: FlowState) => void
) {
  const [result, setResult] = useState<TestResultResponse | null>(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const { subscribe } = useWebSocket();


  useEffect(() => {
    if (!enabled || resultId == null || result) return;

    let cancelled = false;

    // 1. Initial check (in case it's already done)
    apiGetTestResult(resultId)
      .then((res) => {
        if (!cancelled && res.status === "completed") {
          setResult(res);
          setFlowState("completed");
        }
      })
      .catch(() => {});

    // 2. Subscribe to real-time updates
    const unsubscribe = subscribe((msg) => {
      if (msg.type === "TestResult" && msg.data.result_id === resultId) {
        if (msg.data.status === "completed") {
          apiGetTestResult(resultId)
            .then((res) => {
              if (!cancelled) {
                setResult(res);
                setFlowState("completed");
              }
            })
            .catch(console.error);
        } else if (msg.data.status === "failed") {
          if (!cancelled) {
            setFlowState("failed");
          }
        }
      }
    });

    // 3. Simple safety timeout (e.g. 60 seconds)
    const timeoutId = setTimeout(() => {
      if (!cancelled && !result) {
        setIsTimeout(true);
        setFlowState("failed");
      }
    }, 60000);

    return () => {
      cancelled = true;
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [enabled, resultId, result, setFlowState, subscribe]);

  return {
    result,
    isTimeout,
    isProcessing: enabled && !result && !isTimeout,
  };
}
