import { useEffect, useState } from "react";

import SEOHead from "@/component/SEAHead";
import { recipes } from "../../public/data/recipes";

export default function Home() {
  const [filtered, setFiltered] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const filtered = recipes.filter((item) => {
      const currentRecipe = item.title.toLowerCase();
      return currentRecipe.includes(searchTerm);
    });

    const timeout = setTimeout(() => {
      setFiltered(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <main
      className={`flex flex-col max-w-screen-lg mx-auto pb-8 ${
        loading ? "animate-pulse" : ""
      }`}
    >
      <SEOHead
        title="Koleksi Resepi Khairulaming | ResepiKA.com"
        description="Koleksi resepi daripada account @khairulaming di Instagram."
        path="/"
        ogPath="/og.png"
      />
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
      <div className="grid grid-cols-1 gap-2 px-4 sm:grid-cols-2 md:grid-cols-3">
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
            <p className="text-sm text-gray-500">{resepi.title}</p>
          </a>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center">Resepi tidak wujud</p>
      )}
    </main>
  );
}
