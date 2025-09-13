"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Filters, { FilterState } from "./components/filters";
import Gallery from "./components/gallery";
import Pagination from "./components/pagination";
import Favorites from "./components/favorites"; 

export interface Photo {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { full_name: string };
  rover: { name: string };
}

interface RawPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { full_name: string };
  rover: { name: string };
}

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    rover: "Curiosity",
    camera: "",
    date: "2020-07-01",
  });
  const [page, setPage] = useState(1);

  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY ?? "DEMO_KEY";

  const fetchPhotos = useCallback(async () => {
    setLoading(true);

    try {
      const url = new URL(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${filters.rover.toLowerCase()}/photos`
      );
      url.searchParams.set("earth_date", filters.date);
      url.searchParams.set("page", String(page));
      url.searchParams.set("api_key", API_KEY);
      if (filters.camera) url.searchParams.set("camera", filters.camera);

      const res = await fetch(url.toString());
      const data = await res.json();

      const rawPhotos: RawPhoto[] = Array.isArray(data?.photos) ? data.photos : [];

      const formattedPhotos: Photo[] = rawPhotos
        .slice(0, 24)
        .map((p) => ({
          id: p.id,
          img_src: p.img_src,
          earth_date: p.earth_date,
          camera: { full_name: p.camera.full_name },
          rover: { name: p.rover.name },
        }));

      setPhotos(formattedPhotos);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [filters, page, API_KEY]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <main className="min-h-screen flex flex-col" id="topo">
      <Header />

      {/* Seção de Exploração */}
      <div className="flex-1 p-6 bg-gray-50" id="exploracao">
        <Filters
          onFilterChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
        />
        <Gallery photos={photos} loading={loading} />
        <Pagination page={page} setPage={setPage} hasMore={photos.length > 0} />
      </div>

      {/* Seção de Favoritos */}
      <div id="favoritos" className="flex-1 p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          ⭐ Fotos Favoritas
        </h2>
        <Favorites />
      </div>

      <Footer />
    </main>
  );
}









