import { JetBrains_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";
import ViewModeGate from "./components/ViewModeGate";
import { ThemeModeProvider } from "./context/ThemeMode";
import { site } from "./data/site";

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
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="bg-bg text-text antialiased min-h-screen flex flex-col">
        <ScrollProgress />
        <ThemeModeProvider>
          <ViewModeGate>{children}</ViewModeGate>
        </ThemeModeProvider>
        <Analytics />
      </body>
    </html>
  );
}