import React from "react";
import { MapPin, Calendar, Percent, Search } from "lucide-react";
import { Benefit } from "../types";
import { ImageCarousel } from "./ImageCarousel";

interface BenefitCardProps {
  benefit: Benefit;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ benefit }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <ImageCarousel
        images={benefit.imagenes}
        restaurant={benefit.restaurant}
      />

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
            {benefit.restaurant.replace("- Descuento", "").trim()}
          </h3>
          <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full ml-3 flex-shrink-0">
            <Percent size={14} className="mr-1" />
            <span className="font-bold text-sm">{benefit.descuento} 🏦 </span>
            <div>Banco {benefit.bank}</div>
          </div>
        </div>

        <p className="text-sm text-blue-600 font-medium mb-3">
          {benefit.titulo}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {benefit.descripcion}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1 text-blue-500" />
            <span>{benefit.days.join(", ")}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={14} className="mr-1 text-blue-500" />
          <span>{benefit.locations.join(", ")}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Search size={14} className="mr-1 text-blue-500" />
          <span>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                benefit.restaurant.replace("- Descuento", "").trim()
              )}`}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              buscar en Google
            </a>
          </span>
        </div>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(
            benefit.restaurant.replace("- Descuento", "").trim()
          )}`}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          buscar en maps
        </a>
      </div>
    </div>
  );
};
