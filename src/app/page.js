export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-8 py-12">

      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-400">
          Neal Ramjeawan
        </h1>

        <p className="mt-2 text-gray-300">
          Cloud Engineer | DevOps | Systems Engineer
        </p>

        <p className="mt-6 text-gray-400">
          Building and automating secure, scalable infrastructure across cloud and on-prem environments.
        </p>
      </section>

      <section className="max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-bold">Skills</h2>

        <div className="grid grid-cols-2 gap-2 mt-3 text-gray-300">
          <div>AWS</div>
          <div>Azure</div>
          <div>Linux</div>
          <div>Windows Server</div>
          <div>Active Directory</div>
          <div>Terraform</div>
          <div>Docker</div>
          <div>CI/CD</div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-bold">Projects</h2>

        <div className="mt-4 space-y-3">

          <div className="p-4 border border-gray-800 rounded">
            <h3 className="text-blue-300 font-bold">Terraform AWS Lab</h3>
            <p className="text-gray-400">
              Infrastructure as Code using Terraform on AWS.
            </p>
          </div>

          <div className="p-4 border border-gray-800 rounded">
            <h3 className="text-blue-300 font-bold">Active Directory Lab</h3>
            <p className="text-gray-400">
              Windows Server domain, users, and Group Policy setup.
            </p>
          </div>

        </div>
      </section>

      <section className="max-w-3xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="text-gray-400 mt-2">
          your.email@example.com
        </p>
      </section>

    </main>
  );
}