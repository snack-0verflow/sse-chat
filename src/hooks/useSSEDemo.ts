"use client";

import { useState, useEffect, useRef } from "react";

export type UseSSEDemoProps = {
  path: string;
  onMessage(data: string): void;
  onClose(): void;
};

export default function useSSEDemo(props: UseSSEDemoProps) {
  const [eventSource, setEventSource] = useState<EventSource>();

  useEffect(() => {
    if (eventSource) {
      return;
    }

    const source = new EventSource(props.path);
    setEventSource(source);

    source.addEventListener("open", (event) => {
      console.log("Connection was opened", event);
    });

    source.addEventListener("message", (event) => {
      console.log("message received", event);
    });

    source.onmessage = (event) => {
      console.log('on message', event.data);
      props.onMessage(event.data);
    };

    source.onerror = (event) => {
      console.log("Connection was closed due to an error:", event);
      source.close();
      props.onClose();
    };    

    return () => {
      source.close();
    };
  }, []);

  return eventSource;
}
