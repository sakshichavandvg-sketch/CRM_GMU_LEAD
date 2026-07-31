export default function LeftPanel({ children, className = "" }) {
  return (
    <section
      className={`relative w-full h-full overflow-hidden flex flex-col justify-between ${className}`}
    >
      {children}
    </section>
  );
}