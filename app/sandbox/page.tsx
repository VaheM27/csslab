import Navbar from "@/app/components/Navbar";
import SandboxClient from "./SandboxClient";

export const metadata = {
  title: "Sandbox — CSSLab",
  description: "Free-play sandbox to experiment with CSS Flexbox, Grid, and @media queries. Live preview, property reference, and quick snippets.",
};

export default function SandboxPage() {
  return (
    <>
      <Navbar />
      <SandboxClient />
    </>
  );
}
