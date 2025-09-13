"use client";

import { useEffect, useState } from "react";

interface Photo {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { full_name: string };
  rover: { name: string };
}

export default function Gallery({ photos, loading }: { photos: Photo[]; loading: boolean }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  // carregar favoritos do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // salvar favoritos no localStorage
  const toggleFavorite = (photo: Photo) => {
    let updated: number[];
    if (favorites.includes(photo.id)) {
      updated = favorites.filter((id) => id !== photo.id);
      localStorage.removeItem(`photo_${photo.id}`);
    } else {
      updated = [...favorites, photo.id];
      localStorage.setItem(`photo_${photo.id}`, JSON.stringify(photo));
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (loading) return <p className="text-center">Carregando imagens...</p>;

  if (photos.length === 0)
    return <p className="text-center">Nenhuma imagem encontrada 😢</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <img
            src={photo.img_src}
            alt={photo.camera.full_name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4 text-gray-800 dark:text-gray-200">
            <p><strong>Rover:</strong> {photo.rover.name}</p>
            <p><strong>Câmera:</strong> {photo.camera.full_name}</p>
            <p><strong>Data:</strong> {photo.earth_date}</p>

            <button
              onClick={() => toggleFavorite(photo)}
              className={`mt-2 px-3 py-1 rounded text-sm font-medium transition ${
                favorites.includes(photo.id)
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
              }`}
            >
              {favorites.includes(photo.id) ? "★ Favoritado" : "☆ Favoritar"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}







