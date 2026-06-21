export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1220] text-white">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-20">

        <p className="text-green-400 font-mono">
          {">"} whoami
        </p>

        <h1 className="text-5xl font-bold mt-4">
          Neal Ramjeawan
        </h1>

        <p className="text-xl text-gray-300 mt-3">
          Platform Engineer • DevOps • Systems Engineering
        </p>

        <p className="text-gray-400 mt-6 max-w-2xl">
          I design, automate, and maintain secure and scalable infrastructure across cloud and hybrid environments.
          Focused on DevOps practices, infrastructure as code, and platform reliability.
        </p>

        <div className="mt-8 flex gap-4">
          <a className="bg-blue-600 px-4 py-2 rounded" href="#">
            GitHub
          </a>
          <a className="border border-gray-600 px-4 py-2 rounded" href="#">
            Download CV
          </a>
        </div>

      </section>

      {/* SKILLS */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-800">

        <p className="text-green-400 font-mono">
          {">"} skills --list
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-gray-300">
          <div>☁ AWS</div>
          <div>☁ Azure</div>
          <div>🐧 Linux</div>
          <div>🪟 Windows Server</div>
          <div>🧠 Active Directory</div>
          <div>⚙ Terraform</div>
          <div>🐍 Python</div>
          <div>⚡ Powershell/Bash</div>
          <div>🐳 Docker</div>
          <div>🔁 CI/CD</div>
          <div>📦 Kubernetes</div>
          <div>🔐 Security</div>
          <div>📊 Monitoring</div>
        </div>

      </section>

      {/* PROJECTS */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-800">

        <p className="text-green-400 font-mono">
          {">"} ls projects/
        </p>

        <div className="mt-6 space-y-6">

          {/* PROJECT 1 */}
          <div className="p-6 border border-gray-800 rounded bg-[#0f1a2e]">
            <h3 className="text-xl font-bold text-blue-400">
              Terraform AWS Infrastructure Lab
            </h3>
            <p className="text-gray-400 mt-2">
              Designed and deployed cloud infrastructure using Infrastructure as Code principles.
              Includes networking, compute, and security components.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Stack: Terraform • AWS • Git
            </p>
          </div>

          {/* PROJECT 2 */}
          <div className="p-6 border border-gray-800 rounded bg-[#0f1a2e]">
            <h3 className="text-xl font-bold text-blue-400">
              Active Directory Enterprise Lab
            </h3>
            <p className="text-gray-400 mt-2">
              Built a Windows Server domain environment with Group Policy, users, OUs, and security structure.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Stack: Windows Server • AD DS • GPO • DNS
            </p>
          </div>

        </div>

      </section>

      {/* METRICS */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-800">

        <p className="text-green-400 font-mono">
          {">"} system status
        </p>

        <div className="mt-6 grid grid-cols-2 gap-6 text-gray-300">

          <div>
            <p className="text-2xl font-bold text-white">6+</p>
            <p>Years of Professional Engineering Experience</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">100+</p>
            <p>Infrastructure Projects</p>
          </div>

        </div>

      </section>

      {/* CONTACT */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-800 text-center">

        <p className="text-green-400 font-mono">
          {">"} contact --init
        </p>

        <p className="text-gray-400 mt-4">
          neal.email@email.com
        </p>

      </section>

    </main>
  );
}