"use client";

interface Photo {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { full_name: string };
  rover: { name: string };
}

export default function Gallery({ photos, loading }: { photos: Photo[]; loading: boolean }) {
  if (loading) return <p className="text-center">Carregando imagens...</p>;

  if (photos.length === 0)
    return <p className="text-center">Nenhuma imagem encontrada 😢</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <img
            src={photo.img_src}
            alt={photo.camera.full_name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4 text-gray-800">
            <p><strong>Rover:</strong> {photo.rover.name}</p>
            <p><strong>Câmera:</strong> {photo.camera.full_name}</p>
            <p><strong>Data:</strong> {photo.earth_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}



