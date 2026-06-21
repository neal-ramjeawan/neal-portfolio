import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-5xl mx-auto px-6 py-6 flex justify-between text-gray-300">
      
      <div className="font-bold text-white">
        Neal Ramjeawan
      </div>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

    </nav>
  );
}