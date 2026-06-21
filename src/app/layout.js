import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Neal Portfolio",
  description: "DevOps / Cloud Engineer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b1220] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}