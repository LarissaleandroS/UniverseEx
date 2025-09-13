"use client";

import { useEffect, useState } from "react";

interface Photo {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { full_name: string };
  rover: { name: string };
}

export default function Favorites() {
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const storedIds = localStorage.getItem("favorites");
    if (storedIds) {
      const ids: number[] = JSON.parse(storedIds);
      const photos: Photo[] = ids
        .map((id) => {
          const storedPhoto = localStorage.getItem(`photo_${id}`);
          return storedPhoto ? JSON.parse(storedPhoto) : null;
        })
        .filter((p) => p !== null);
      setFavoritePhotos(photos);
    }
  }, []);

  if (favoritePhotos.length === 0)
    return <p className="text-center">Nenhuma foto favoritada ainda ⭐</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favoritePhotos.map((photo) => (
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
          </div>
        </div>
      ))}
    </div>
  );
}
