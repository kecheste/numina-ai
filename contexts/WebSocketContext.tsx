"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { getWsBaseUrl, getStoredToken } from "@/lib/api-client";
import { useAuth } from "./auth-context";

export interface WebSocketMessage {
  type: string;
  data: any;
}

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  subscribe: (callback: (msg: WebSocketMessage) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const listeners = useRef<Set<(msg: WebSocketMessage) => void>>(new Set());

  const subscribe = useCallback((callback: (msg: WebSocketMessage) => void) => {
    listeners.current.add(callback);
    return () => {
      listeners.current.delete(callback);
    };
  }, []);

  const connect = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const token = getStoredToken();
    if (!token) {
        setIsConnected(false);
        return;
    }

    if (socketRef.current?.readyState === WebSocket.OPEN || socketRef.current?.readyState === WebSocket.CONNECTING) return;

    const wsUrl = `${getWsBaseUrl()}/api/v1/tests/ws/updates?token=${token}`;
    
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      reconnectAttempts.current = 0;
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "heartbeat") return;
        setLastMessage(message);
        listeners.current.forEach(callback => callback(message));
      } catch (err) {
        console.error("Failed to parse WS message", err);
      }
    };

    socket.onclose = (event) => {
      if (reconnectAttempts.current === 0) {
          console.log("WebSocket closed", event.reason);
      }
      setIsConnected(false);
      socketRef.current = null;
      
      if (getStoredToken()) {
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current++;
            connect();
        }, timeout);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      connect();
    } else {
      if (socketRef.current) {
        socketRef.current.close();
      }
    }
    
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (socketRef.current) {
        socketRef.current.onclose = null; 
        socketRef.current.close();
      }
    };
  }, [isAuthenticated, connect]);

  return (
    <WebSocketContext.Provider value={{ isConnected, lastMessage, subscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
