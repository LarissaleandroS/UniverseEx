"use client";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    img_src: string;
    earth_date: string;
    camera: { full_name: string };
    rover: { name: string };
  } | null;
}

export default function Modal({ isOpen, onClose, image }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 text-2xl"
        >
          ✖
        </button>

        {/* Imagem */}
        <img
          src={image.img_src}
          alt="Mars Rover"
          className="w-full h-[400px] object-cover rounded-t-lg"
        />

        {/* Informações */}
        <div className="p-4 text-gray-800">
          <p><strong>Rover:</strong> {image.rover.name}</p>
          <p><strong>Câmera:</strong> {image.camera.full_name}</p>
          <p><strong>Data terrestre:</strong> {image.earth_date}</p>
        </div>
      </div>
    </div>
  );
}
