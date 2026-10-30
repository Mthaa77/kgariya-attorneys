"use client";

import { create } from "zustand";

type DialogKind = "booking" | "callback" | "search" | "questions" | null;

type SiteState = {
  dialog: DialogKind;
  /** optional prefill: practice area slug or enquiry target */
  prefill: string | null;
  openDialog: (kind: Exclude<DialogKind, null>, prefill?: string) => void;
  closeDialog: () => void;
};

export const useSite = create<SiteState>((set) => ({
  dialog: null,
  prefill: null,
  openDialog: (kind, prefill) => set({ dialog: kind, prefill: prefill ?? null }),
  closeDialog: () => set({ dialog: null, prefill: null }),
}));
