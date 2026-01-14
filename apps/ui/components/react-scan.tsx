"use client";

import { useEffect } from "react";
import { scan } from "react-scan/all-environments";

export function ReactScan() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    scan({ enabled: true });
  }, []);

  return null;
}
