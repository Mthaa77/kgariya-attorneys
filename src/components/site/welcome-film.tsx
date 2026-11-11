"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

export function WelcomeFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => setIsPlaying(!video.paused);

    video.addEventListener("play", syncPlayback);
    video.addEventListener("pause", syncPlayback);

    if (motionPreference.matches) {
      video.pause();
    } else {
      void video.play().catch(() => setIsPlaying(false));
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        video.pause();
      }
    };

    motionPreference.addEventListener("change", handleMotionPreference);

    return () => {
      video.removeEventListener("play", syncPlayback);
      video.removeEventListener("pause", syncPlayback);
      motionPreference.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28"
      aria-labelledby="welcome-film-title"
    >
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(198,165,92,0.14),transparent_58%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] border border-gold-400/30" />
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-black shadow-[0_30px_90px_-25px_rgba(198,165,92,0.42)]">
            <video
              ref={videoRef}
              id="kgariya-welcome-film"
              className="aspect-[16/10] w-full object-cover"
              muted
              loop
              playsInline
              poster="/images/kgariya-mark.webp"
              preload="metadata"
              aria-label="Animated Kgariya Attorneys Incorporated logo"
            >
              <source src="/videos/kgariya-welcome-film.mp4" type="video/mp4" />
              Your browser does not support the video element.
            </video>

            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause welcome film" : "Play welcome film"}
              aria-controls="kgariya-welcome-film"
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-navy-950/75 text-white shadow-lg backdrop-blur-md transition-colors hover:border-gold-300 hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-950/35 via-transparent to-gold-200/10" />
            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-navy-950/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-200 backdrop-blur-md">
              Kgariya Attorneys Incorporated
            </div>
          </div>

          <div className="absolute -bottom-7 -right-4 hidden w-36 rotate-3 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-luxe-lg sm:block lg:-right-8">
            <Image
              src="/images/kgariya-mark.webp"
              alt="Official Kgariya Attorneys emblem"
              width={384}
              height={358}
              className="aspect-[4/5] object-contain"
              unoptimized
            />
          </div>
        </div>

        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300">
            A considered welcome
          </p>
          <h2
            id="welcome-film-title"
            className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
          >
            Welcome to a practice built for the{" "}
            <span className="gold-text italic">serious mandate.</span>
          </h2>
          <div className="mt-6 h-px w-24 bg-gold-500" />
          <p className="mt-7 text-[15px] leading-relaxed text-white/65">
            Kgariya Attorneys Incorporated brings together commercial judgement,
            disciplined legal craft and a clear understanding of how institutions
            make decisions. Every matter begins with listening, then moves with purpose.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            Explore a firm where evidence carries the room, relationships are handled
            with care and the work is designed to hold up long after the first instruction.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-200">
            <span className="rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-2">
              Evidence over slogans
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/65">
              Built for institutions
            </span>
          </div>
          <p className="sr-only" aria-live="polite">
            Welcome film {isPlaying ? "playing" : "paused"}.
          </p>
        </div>
      </div>
    </section>
  );
}
