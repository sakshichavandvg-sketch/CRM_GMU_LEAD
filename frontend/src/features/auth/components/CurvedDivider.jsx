export default function CurvedDivider() {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-24 md:w-32 lg:w-48 z-30 drop-shadow-[-10px_0_15px_rgba(0,0,0,0.1)] translate-x-[1px]"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path d="M0,0 C100,20 100,80 0,100 L100,100 L100,0 Z" fill="#FDFCF9" />
      <path d="M0,0 C100,20 100,80 0,100" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
    </svg>
  );
}