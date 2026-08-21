"use client";

import { useCallback, useState } from "react";
import type { Lead } from "@/lib/lead";

export type LeadSubmitStatus = "idle" | "sending" | "ok" | "error";

export type UseLeadSubmitResult = {
  submit: (lead: Lead) => Promise<"ok" | "error">;
  status: LeadSubmitStatus;
};

/**
 * Shared `POST /api/lead` flow. Both the builder's review step and the
 * contact page's demo form submit leads through this hook so the request,
 * response handling and status machine live in exactly one place.
 */
export function useLeadSubmit(): UseLeadSubmitResult {
  const [status, setStatus] = useState<LeadSubmitStatus>("idle");

  const submit = useCallback(async (lead: Lead): Promise<"ok" | "error"> => {
    setStatus("sending");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
      } | null;

      if (!response.ok || !payload?.ok) {
        setStatus("error");
        return "error";
      }

      setStatus("ok");
      return "ok";
    } catch {
      setStatus("error");
      return "error";
    }
  }, []);

  return { submit, status };
}

export default useLeadSubmit;
