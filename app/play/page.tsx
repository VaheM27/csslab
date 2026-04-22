import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { levels } from "@/app/data/levels";
import LevelSelectClient from "./LevelSelectClient";

export const metadata = {
  title: "Choose a Level — FlexLab",
  description: "Pick a CSS Flexbox challenge and start learning.",
};

export default function PlayPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl font-black mb-2"
            style={{ color: "var(--text)" }}
          >
            Choose a Level
          </h1>
          <p className="mb-10" style={{ color: "var(--muted)" }}>
            Complete them in order or jump to any chapter.
          </p>
          <LevelSelectClient levels={levels} />
        </div>
      </main>
    </>
  );
}
