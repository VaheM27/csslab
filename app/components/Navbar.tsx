import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5">
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: "rgba(17, 24, 39, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 mr-2 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            F
          </div>
          <span className="font-bold text-sm" style={{ color: "var(--text)" }}>
            Flex<span style={{ color: "var(--accent-light)" }}>Lab</span>
          </span>
        </Link>

        <div
          className="w-px h-4 mx-1"
          style={{ background: "var(--border)" }}
        />

        <Link
          href="/play"
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:text-white"
          style={{ color: "var(--muted-lt)" }}
        >
          Levels
        </Link>
        <Link
          href="/sandbox"
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:text-white"
          style={{ color: "var(--muted-lt)" }}
        >
          Sandbox
        </Link>

        <Link
          href="/play/1"
          className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          Play Now
        </Link>
      </div>
    </nav>
  );
}
