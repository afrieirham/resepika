import { useEffect, useState } from "react";
import { recipes } from "../../public/data/recipes";

export default function Home() {
  const [filtered, setFiltered] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = recipes.filter((item) => {
      const currentRecipe = item.title.toLowerCase();
      return currentRecipe.includes(searchTerm);
    });

    setFiltered(filtered);
  }, [searchTerm]);

  return (
    <main className="flex flex-col max-w-screen-lg mx-auto ">
      <div className="flex flex-col w-full p-8 space-y-2">
        <h1 className="text-lg font-bold text-center sm:text-xl">
          Koleksi Resepi KhairulAming
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
    </main>
  );
}
