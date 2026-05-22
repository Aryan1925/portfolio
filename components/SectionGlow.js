export default function SectionGlow() {
  return (
    <>
      {/* TOP GLOW */}
      <div
        className="absolute top-0 left-0 w-[450px] h-[450px]
        bg-purple-500/10 dark:bg-purple-500/10
        blur-[120px] rounded-full
        pointer-events-none"
      />

      {/* BOTTOM GLOW */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px]
        bg-blue-500/10 dark:bg-blue-500/10
        blur-[120px] rounded-full
        pointer-events-none"
      />
    </>
  );
}