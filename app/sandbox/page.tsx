import Navbar from "@/app/components/Navbar";
import SandboxClient from "./SandboxClient";

export const metadata = {
  title: "Sandbox — FlexLab",
  description: "Free-play sandbox to experiment with CSS Flexbox properties.",
};

export default function SandboxPage() {
  return (
    <>
      <Navbar />
      <SandboxClient />
    </>
  );
}
