import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-4xl font-bold text-jiffy-dark mb-4">Page Not Found</h1>
        <Link
          href="/"
          className="inline-block bg-jiffy-dark text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest"
        >
          Back To Home
        </Link>
      </div>
    </main>
  );
}
