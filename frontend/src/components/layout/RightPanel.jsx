export default function RightPanel({ children }) {
  return (
    <section
      className="
        w-full
        min-h-full
        bg-[#FCFCFC]
        flex
        items-center
        justify-center
        py-10
        px-4
        sm:px-6
        lg:px-8
        xl:px-10
      "
    >
      {children}
    </section>
  );
}