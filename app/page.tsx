"use client";

import { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Filters from "./components/filters";
import Gallery from "./components/gallery";
import Pagination from "./components/pagination";

export default function Home() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ rover: "Curiosity", camera: "", date: "2020-07-01" });
  const [page, setPage] = useState(1);

  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

  const fetchPhotos = async () => {
    setLoading(true);
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${filters.rover.toLowerCase()}/photos?earth_date=${filters.date}&page=${page}&api_key=${API_KEY}`;
    if (filters.camera) url += `&camera=${filters.camera}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPhotos((data.photos || []).slice(0, 24)); // 🔥 pega só 24
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, [filters, page]);

  return (
    <main className="min-h-screen flex flex-col" id="topo">
      <Header />
      <div className="flex-1 p-6 bg-gray-50" id="exploracao">
        <Filters onFilterChange={(f) => { setFilters(f); setPage(1); }} />
        <Gallery photos={photos} loading={loading} />
        <Pagination page={page} setPage={setPage} hasMore={photos.length > 0} />
      </div>
      <Footer />
    </main>
  );
}


