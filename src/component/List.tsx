import React from "react";

import { Resepi } from "../../public/data/recipes";

function List({ filtered, loading }: { filtered: Resepi[]; loading: boolean }) {
  return (
    <main>
      <div
        className={`grid grid-cols-1 gap-2 px-4 mt-6 sm:px-0 sm:grid-cols-2 md:grid-cols-3 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        {filtered.map((resepi) => (
          <a
            key={resepi.postUrl}
            href={resepi.postUrl}
            target="_blank"
            className="relative flex flex-col p-4 space-y-2 transition-all duration-300 ease-out rounded-xl hover:bg-gray-100 hover:-translate-y-1"
          >
            <img
              src={`/thumbnails/${resepi.thumbnail}`}
              className="object-cover aspect-square max-h-[200px] rounded-md"
            />
            <p className="text-sm font-medium text-gray-900">{resepi.title}</p>
          </a>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center">Resepi tidak wujud</p>
      )}
    </main>
  );
}

export default List;
