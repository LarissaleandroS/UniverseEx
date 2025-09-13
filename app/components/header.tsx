'use client';

export default function Header() {
  return (
    <header className="header-bg text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold drop-shadow-md">UniverseEX 🚀</h1>
        <nav className="flex gap-6 items-center text-lg font-medium">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:underline"
          >
            Início
          </button>
          <button
            onClick={() =>
              document.getElementById("exploracao")?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:underline"
          >
            Exploração
          </button>
          <button
            onClick={() =>
              document.getElementById("favoritos")?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:underline"
          >
            Favoritos
          </button>
        </nav>
      </div>
    </header>
  );
}







