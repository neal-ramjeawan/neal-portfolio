import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Neal Ramjeawan — Cloud / DevOps / SRE Engineer",
  description:
    "Cloud, DevOps, and SRE engineer. Portfolio of hands-on infrastructure projects: Kubernetes, IaC, identity, observability, and automation, built and stress-tested end to end.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="bg-bg text-text antialiased min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}