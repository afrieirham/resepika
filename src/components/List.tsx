import Image from "next/image";
import Link from "next/link";
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
      linkUrl: "https://go.resepika.com/sambal-nyet",
      photoUrl: "/sambal-nyet.jpeg",
    },
    {
      name: "Dendeng Nyet",
      linkUrl: "https://go.resepika.com/dendeng-nyet",
      photoUrl: "/dendeng-nyet.jpeg",
    },
  ];

  type Sponsored = {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
    photoUrlDesktop: string;
    expiredAt: null | Date;
  };

  const adSpotAd = {
    title: "Iklankan produk anda disini.",
    subtitle:
      "Website ini telah menerima lebih kurang 2,800 page views dalam 28 hari lepas. Iklankan produk anda disini dan produk anda akan tampil dihadapan ribuan pengunjung.",
    ctaText: "Iklankan produk saya",
    ctaUrl: "https://buy.stripe.com/aEUdRRgnaeXa5Dq8wC",
    photoUrlDesktop: "/ads-desktop.png",
    expiredAt: null,
  };

  // sample
  const paid = {
    title: "Sample Ads",
    subtitle: "This is sample subtitle",
    ctaText: "Subscribe",
    ctaUrl: "https://resepika.com/ayam",
    photoUrlDesktop: "/og.png",
    expiredAt: new Date("2024-01-01T00:00:00+08:00"),
  };

  const hasExpired = paid.expiredAt < new Date();

  const sponsored: Sponsored = hasExpired ? adSpotAd : paid;

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

      <p className="mt-8 px-8 text-xs sm:px-4">Sponsored</p>

      <div className="mt-4 w-full">
        <div className="mx-auto sm:px-4">
          <div className="flex flex-col items-center justify-between space-y-8 border-y bg-white p-8 sm:flex-row sm:space-y-0 sm:rounded-xl sm:border">
            <div className="block max-h-[320px] max-w-[320px] sm:hidden sm:w-[30%]">
              <a href={sponsored.photoUrlDesktop} target="_blank">
                <img
                  src={sponsored.photoUrlDesktop}
                  className="mx-auto h-full rounded-lg border shadow-lg"
                />
              </a>
            </div>
            <div className="w-full space-y-6 sm:w-[60%]">
              <div className="flex flex-col space-y-2">
                <p className="text-2xl font-bold">{sponsored.title}</p>
                <p>{sponsored.subtitle}</p>
              </div>
              <Link
                type="button"
                href={sponsored.ctaUrl}
                className="rounded-md bg-[#ffdd00] px-3.5 py-2.5 text-sm font-bold text-black shadow-sm hover:bg-[#ffdd00]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffdd00]"
              >
                {sponsored.ctaText}
              </Link>
            </div>
            <div className="hidden max-h-[320px] max-w-[320px] sm:block sm:w-[30%]">
              <a href={sponsored.photoUrlDesktop} target="_blank">
                <img
                  src={sponsored.photoUrlDesktop}
                  className="mx-auto h-full rounded-lg border shadow-lg"
                />
              </a>
            </div>
          </div>
        </div>
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
            className="relative flex flex-col space-y-2 rounded-xl p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-gray-100"
          >
            <Image
              width={1000}
              height={1000}
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
