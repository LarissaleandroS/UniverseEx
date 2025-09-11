"use client";

import { useState } from "react";

// Definindo tipos
interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  rover: "Curiosity" | "Opportunity" | "Spirit";
  camera: "" | "FHAZ" | "RHAZ" | "MAST" | "CHEMCAM" | "NAVCAM";
  date: string;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [rover, setRover] = useState<FilterState["rover"]>("Curiosity");
  const [camera, setCamera] = useState<FilterState["camera"]>("");
  const [date, setDate] = useState<string>("2020-07-01");

  const handleChange = (field: keyof FilterState, value: string) => {
    const newFilters: FilterState = { rover, camera, date, [field]: value } as FilterState;

    if (field === "rover") setRover(value as FilterState["rover"]);
    if (field === "camera") setCamera(value as FilterState["camera"]);
    if (field === "date") setDate(value);

    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtros de Exploração</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rover */}
        <select
          value={rover}
          onChange={(e) => handleChange("rover", e.target.value)}
          className="p-2 rounded border border-gray-300 bg-gray-100 text-gray-800"
        >
          <option value="Curiosity">Curiosity</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Spirit">Spirit</option>
        </select>

        {/* Câmera */}
        <select
          value={camera}
          onChange={(e) => handleChange("camera", e.target.value)}
          className="p-2 rounded border border-gray-300 bg-gray-100 text-gray-800"
        >
          <option value="">Todas as câmeras</option>
          <option value="FHAZ">Front Hazard</option>
          <option value="RHAZ">Rear Hazard</option>
          <option value="MAST">Mast Camera</option>
          <option value="CHEMCAM">ChemCam</option>
          <option value="NAVCAM">NavCam</option>
        </select>

        {/* Data */}
        <input
          type="date"
          value={date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="p-2 rounded border border-gray-300 bg-gray-100 text-gray-800"
        />
      </div>
    </div>
  );
}
