import Image from "next/image";
import { IMAGES } from "../../constants/images";

export default function LeftPanel() {
  return (
    <section
      className="
        relative
        w-full
        h-full
        overflow-hidden
        px-8
        lg:px-10
        py-8
        text-white
        flex
        flex-col
        justify-between
      "
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <Image
        src={IMAGES.BACKGROUND}
        alt="GM University Campus"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover object-center"
      />

      {/* ================= OVERLAYS ================= */}
      <div className="absolute inset-0 bg-[#4a171e]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Logo unchanged */}
        <div className="flex items-center gap-4 mt-1">
          <Image
            src={IMAGES.LOGO}
            alt="GM University Logo"
            width={56}
            height={56}
            priority
            className="rounded-full border border-white/20 shadow-lg"
          />
          <div>
            <h1 className="text-xl font-semibold tracking-wide font-inter">
              GM University
            </h1>
            <p className="text-xs text-white/70 font-inter">
              Lead Management ERP Portal
            </p>
          </div>
        </div>

        {/* Footer unchanged */}
        <div className="flex-1 min-h-0 flex flex-col justify-end pb-12 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)] font-inter">
            Official ERP Portal
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight font-lora">
            Empowering Administration,
            <br className="hidden sm:block" />
            Shaping Futures.
          </h2>
          <p className="max-w-md text-sm text-white/70 leading-relaxed font-inter">
            Official Lead Management Platform built for admissions,
            telecalling, and administrative workflows.
          </p>
        </div>
      </div>
    </section>
  );
}