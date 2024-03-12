import Image from "next/image";
import { useEffect, useState } from "react";

import { Resepi } from "@/pages";

function List({ resepi, term }: { term: string; resepi: Resepi[] }) {
  const [filtered, setFiltered] = useState(resepi);
  const [searchTerm, setSearchTerm] = useState(term);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filtered = resepi.filter((item) => {
      const currentRecipe = item.title.toLowerCase();
      return currentRecipe.includes(searchTerm);
    });

    const timeout = setTimeout(() => {
      setFiltered(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const affiliates = [
    {
      name: "Sambal Nyet",
      linkUrl: "https://dub.sh/sambal-nyet",
      photoUrl: "/sambal-nyet.jpeg",
    },
    {
      name: "Dendeng Nyet",
      linkUrl: "https://dub.sh/dendeng-nyet",
      photoUrl: "/dendeng-nyet.jpeg",
    },
  ];

  return (
    <main className="flex flex-col max-w-screen-lg pb-8 mx-auto">
      <div className="flex flex-col w-full p-8 space-y-2">
        <h1 className="text-xl text-center">
          Koleksi Resepi @
          <a
            className="hover:underline"
            href="https://instagram.com/khairulaming"
            target="_blank"
          >
            KhairulAming
          </a>
        </h1>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLocaleLowerCase())}
          placeholder="Cari resepi..."
          className="flex w-full h-10 max-w-sm px-3 py-2 mx-auto text-sm border rounded-md border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <p className="px-8 text-xs sm:px-4">
        Shopee affiliate (Official Product)
      </p>
      <div className="grid grid-cols-1 gap-2 px-8 mt-2 sm:px-4 sm:grid-cols-2">
        {affiliates.map((ad) => (
          <div
            key={ad.linkUrl}
            className="relative flex items-center px-3 py-2 space-x-3 bg-white border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <img
                className="object-cover w-10 h-10 border rounded-md border-primary"
                src={ad.photoUrl}
                alt={`${ad.name} photo`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <a
                href={ad.linkUrl}
                className="focus:outline-none"
                target="_blank"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{ad.name}</p>
              </a>
            </div>
          </div>
        ))}
      </div>

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
            <Image
              width={1000}
              height={1000}
              src={resepi.thumbnail}
              alt={`${resepi.title} thumbnail`}
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
