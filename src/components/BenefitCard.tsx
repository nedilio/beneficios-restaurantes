import React from "react";
import { MapPin, Calendar, Percent, Search, Map } from "lucide-react";
import { Benefit } from "../types";
import { ImageCarousel } from "./ImageCarousel";

interface BenefitCardProps {
  benefit: Benefit;
}

const getBankColors = (bank: string) => {
  switch (bank.toLowerCase()) {
    case "bci":
      return {
        bg: "bg-blue-50",
        bankLabel: "bg-blue-100 text-blue-800",
        accent: "text-blue-600",
      };
    case "santander":
      return {
        bg: "bg-red-50",
        bankLabel: "bg-red-100 text-red-800",
        accent: "text-red-600",
      };
    case "banco de chile":
      return {
        bg: "bg-green-50",
        bankLabel: "bg-green-100 text-green-800",
        accent: "text-green-600",
      };
    default:
      return {
        bg: "bg-gray-50",
        bankLabel: "bg-gray-100 text-gray-800",
        accent: "text-gray-600",
      };
  }
};

export const BenefitCard: React.FC<BenefitCardProps> = ({ benefit }) => {
  const colors = getBankColors(benefit.bank);

  return (
    <div
      className={`${colors.bg} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
    >
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
            <span className="font-bold text-sm">{benefit.descuento}</span>
          </div>
        </div>

        <div
          className={`${colors.bankLabel} inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3`}
        >
          🏦 {benefit.bank.toLocaleUpperCase()}
        </div>

        <p className={`text-sm ${colors.accent} font-medium mb-3`}>
          {benefit.titulo}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {benefit.descripcion}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className={`mr-1 ${colors.accent}`} />
            <span>{benefit.days.join(", ")}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={14} className={`mr-1 ${colors.accent}`} />
          <span>{benefit.locations.join(", ")}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Search size={14} className={`mr-1 ${colors.accent}`} />
          <span>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                benefit.restaurant.replace("- Descuento", "").trim()
              )}`}
              className={`${colors.accent} hover:underline`}
              target="_blank"
              rel="noopener noreferrer"
            >
              buscar en Google
            </a>
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Map size={14} className={`mr-1 ${colors.accent}`} />
          <span>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                benefit.restaurant.replace("- Descuento", "").trim()
              )}`}
              className={`${colors.accent} hover:underline`}
              target="_blank"
              rel="noopener noreferrer"
            >
              buscar en maps
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
