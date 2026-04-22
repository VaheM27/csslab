import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5">
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: "var(--glass-nav)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--border-accent)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 mr-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            F
          </div>
          <span className="font-bold text-sm" style={{ color: "var(--text)" }}>
            Flex<span style={{ color: "var(--accent)" }}>Lab</span>
          </span>
        </Link>

        <div className="w-px h-4 mx-1" style={{ background: "var(--border)" }} />

        <Link href="/play" className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:opacity-70" style={{ color: "var(--muted)" }}>
          Levels
        </Link>
        <Link href="/sandbox" className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:opacity-70" style={{ color: "var(--muted)" }}>
          Sandbox
        </Link>

        <div className="w-px h-4 mx-1" style={{ background: "var(--border)" }} />

        <ThemeToggle />

        <Link
          href="/play/1"
          className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 glow-accent"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Play Now
        </Link>
      </div>
    </nav>
  );
}
