import Link from "next/link";

export default function Projects() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold">Projects</h1>

      <div className="mt-10 space-y-6">

        <Link href="/projects/terraform-aws" className="block p-6 border border-gray-800 rounded hover:bg-[#111c33]">
          <h2 className="text-xl text-blue-400 font-bold">
            Terraform AWS Infrastructure Lab
          </h2>
          <p className="text-gray-400">
            Infrastructure as Code project using Terraform and AWS.
          </p>
        </Link>

        <Link href="/projects/ad-lab" className="block p-6 border border-gray-800 rounded hover:bg-[#111c33]">
          <h2 className="text-xl text-blue-400 font-bold">
            Active Directory Lab
          </h2>
          <p className="text-gray-400">
            Windows Server domain with GPO and AD structure.
          </p>
        </Link>

      </div>

    </main>
  );
}