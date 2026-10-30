"use client";

import {
  Scale,
  Building2,
  Pickaxe,
  Sprout,
  Landmark,
  KeyRound,
  BadgeCheck,
  ShieldCheck,
  Lock,
  Briefcase,
  Map,
  GraduationCap,
  Construction,
  Handshake,
  Clock,
  Package,
  RefreshCw,
  HeartHandshake,
  Users,
  Network,
  BookOpen,
  TrendingUp,
  BarChart3,
  Gavel,
  ScrollText,
  Stamp,
  BookOpenCheck,
  Award,
  Fingerprint,
  FileBadge,
  Medal,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  scale: Scale,
  building: Building2,
  pickaxe: Pickaxe,
  sprout: Sprout,
  landmark: Landmark,
  key: KeyRound,
  "badge-check": BadgeCheck,
  shield: ShieldCheck,
  lock: Lock,
  briefcase: Briefcase,
  map: Map,
  "graduation-cap": GraduationCap,
  crane: Construction,
  handshake: Handshake,
  clock: Clock,
  package: Package,
  refresh: RefreshCw,
  "heart-handshake": HeartHandshake,
  users: Users,
  network: Network,
  book: BookOpen,
  "trending-up": TrendingUp,
  chart: BarChart3,
  /* — SA legal ecosystem — */
  gavel: Gavel,
  "scroll-text": ScrollText,
  stamp: Stamp,
  "book-open-check": BookOpenCheck,
  award: Award,
  fingerprint: Fingerprint,
  "file-badge": FileBadge,
  medal: Medal,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = MAP[name] ?? Scale;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
