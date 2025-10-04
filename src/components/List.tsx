import { useEffect, useState } from "react";

import { Resepi } from "@/types";
import { useRedirectPopunder } from "@/hooks/useRedirectPopunder";

function List({ resepi, term }: { term: string; resepi: Resepi[] }) {
  const [filtered, setFiltered] = useState(resepi);
  const [searchTerm, setSearchTerm] = useState(term);
  const [loading, setLoading] = useState(false);

  const { onOpenPopunder } = useRedirectPopunder();

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
      linkUrl: "https://go.resepika.com/sambal-nyet",
      photoUrl: "/sambal-nyet.jpeg",
    },
    {
      name: "Dendeng Nyet",
      linkUrl: "https://go.resepika.com/dendeng-nyet",
      photoUrl: "/dendeng-nyet.jpeg",
    },
  ];

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col pb-8">
      <div className="flex w-full flex-col space-y-2 p-8">
        <h1 className="text-center text-xl">
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
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mx-auto flex h-10 w-full max-w-sm rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="text-center">
          <a
            target="_blank"
            className="mt-2 text-xs hover:underline"
            href="https://donate.stripe.com/00gcNN0oc7uId5SaEH"
          >
            belanja saya nasi ayam gepuk 🍗
          </a>
        </div>
      </div>
      <p className="mt-2 px-8 text-xs sm:px-4">
        Shopee affiliate (Official Product)
      </p>
      <div className="mt-2 grid grid-cols-1 gap-2 px-8 sm:grid-cols-2 sm:px-4">
        {affiliates.map((ad) => (
          <div
            key={ad.linkUrl}
            className="focus-within:ring-primary relative flex items-center space-x-3 rounded-lg border bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <img
                className="border-primary h-10 w-10 rounded-md border object-cover"
                src={ad.photoUrl}
                alt={`${ad.name} photo`}
              />
            </div>
            <div className="min-w-0 flex-1">
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
        className={`mt-6 grid grid-cols-1 gap-2 px-4 sm:grid-cols-2 sm:px-0 md:grid-cols-3 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        {filtered.map((resepi) => (
          <a
            key={resepi.postUrl}
            href={resepi.postUrl}
            target="_blank"
            onClick={() => {
              onOpenPopunder();
            }}
            className="relative flex flex-col space-y-2 rounded-xl p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-gray-100"
          >
            <img
              loading="lazy"
              src={resepi.thumbnail}
              alt={`${resepi.title} thumbnail`}
              className="aspect-square max-h-[200px] rounded-md object-cover"
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
