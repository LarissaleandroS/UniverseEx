"use client";

export default function Pagination({
  page,
  setPage,
  hasMore,
}: {
  page: number;
  setPage: (n: number) => void;
  hasMore: boolean;
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-gray-400 text-gray-800 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>Página {page}</span>
      <button
        disabled={!hasMore}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-400 text-gray-800 rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}

