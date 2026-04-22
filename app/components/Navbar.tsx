import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(10,10,22,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
          style={{ background: "var(--purple)", color: "#fff" }}
        >
          F
        </div>
        <span className="font-bold text-lg" style={{ color: "var(--text)" }}>
          Flex<span style={{ color: "var(--purple)" }}>Lab</span>
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/play"
          className="text-sm font-medium transition-colors hover:opacity-100 opacity-70"
          style={{ color: "var(--text)" }}
        >
          Levels
        </Link>
        <Link
          href="/sandbox"
          className="text-sm font-medium transition-colors hover:opacity-100 opacity-70"
          style={{ color: "var(--text)" }}
        >
          Sandbox
        </Link>
        <Link
          href="/play/1"
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
          style={{ background: "var(--purple)", color: "#fff" }}
        >
          Play Now
        </Link>
      </div>
    </nav>
  );
}
