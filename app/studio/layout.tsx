import React from "react";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full bg-white text-slate-900"
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        overflow: "auto",
        overscrollBehavior: "none",
      }}
    >
      {children}
    </div>
  );
}
