import Image from "next/image";

const logoImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upgrade_and_enhance_logo_a5226ba5_2K-GGoJ66U7QdS7Z97xF8tXi8WdLOAK1T.jpg";
const filmSource = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Creating_3D_law_firm_logo_89d6da7e-iz4wg6aMPps1Dj1VopFigp1K1E3d9a.mp4";

export function WelcomeFilm() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28" aria-labelledby="welcome-film-title">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(198,165,92,0.14),transparent_58%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] border border-gold-400/30" />
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-black shadow-[0_30px_90px_-25px_rgba(198,165,92,0.42)]">
            <video
              className="aspect-[16/10] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={logoImage}
              preload="metadata"
              aria-label="Animated Kgariya law firm logo"
            >
              <source src={filmSource} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-950/35 via-transparent to-gold-200/10" />
            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-navy-950/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-200 backdrop-blur-md">
              Kgariya Attorneys Inc.
            </div>
          </div>
          <div className="absolute -bottom-7 -right-4 hidden w-36 rotate-3 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-luxe-lg sm:block lg:-right-8">
            <Image src={logoImage} alt="Kgariya Attorneys 3D gold and blue mark" width={320} height={420} className="aspect-[4/5] object-cover" unoptimized />
          </div>
        </div>

        <div className="max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300">A considered welcome</p>
          <h2 id="welcome-film-title" className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Welcome to a practice built for the <span className="gold-text italic">serious mandate.</span>
          </h2>
          <div className="mt-6 h-px w-24 bg-gold-500" />
          <p className="mt-7 text-[15px] leading-relaxed text-white/65">
            Kgariya Attorneys Inc. brings together commercial judgement, disciplined legal craft and a clear understanding of how institutions make decisions. Every matter begins with listening, then moves with purpose.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            Explore a firm where evidence carries the room, relationships are handled with care and the work is designed to hold up long after the first instruction.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-200">
            <span className="rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-2">Evidence over slogans</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/65">Built for institutions</span>
          </div>
        </div>
      </div>
    </section>
  );
}
