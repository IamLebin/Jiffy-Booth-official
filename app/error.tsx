"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-bold text-jiffy-dark mb-4">Something went wrong</h1>
        <button
          type="button"
          onClick={reset}
          className="bg-jiffy-dark text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
