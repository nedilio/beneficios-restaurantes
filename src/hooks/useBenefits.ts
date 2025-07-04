import { useState, useEffect, useCallback } from "react";
import { Benefit, BenefitComplete } from "../types";
import bciData from "../db/bci.json";
import santanderData from "../db/santander.json";

// Mock data
const bci = bciData as BenefitComplete[];
const santander = santanderData as BenefitComplete[];
// const mockBenefits: BenefitComplete[] = [
//   {
//     id: "6865a789ce95218975b855e7",
//     restaurant: "Holy Moly Tobalaba",
//     descripcion:
//       "Disfruta de un 40% de cashback todos los jueves en Holy Moly Tobalaba, con un tope de $40.000. Disponible en Santiago.",
//     titulo: "Todos los jueves",
//     descuento: 40,
//     imagenes: [
//       "https://www.bciplus.cl/storages/loyalty/campaigns-images/Holy-Moly-Tobalaba_75b855e7_21-41_1.png",
//       "https://www.bciplus.cl/storages/loyalty/campaigns-images/Holy-Moly-Tobalaba_75b855e7_21-41_2.png",
//       "https://www.bciplus.cl/storages/loyalty/campaigns-images/Holy-Moly-Tobalaba_75b855e7_21-41_3.png",
//     ],
//     days: ["jueves"],
//     locations: ["Santiago"],
//     bank: "bci",
//   },
//   {
//     id: "ed409736-be19-4828-a28a-7125a5576131",
//     restaurant: "INFERNO BURGER",
//     descripcion:
//       "Disfruta de un 20% de descuento en INFERNO BURGER, ubicado en Las Condes, de lunes a miércoles. Aplica solo al pagar con tarjetas del Banco de Chile.",
//     titulo: "INFERNO BURGER",
//     descuento: 20,
//     imagenes: [
//       "https://assets.bancochile.cl/uploads/000/027/739/ad0fd438-1c70-48ff-8e7c-baefd603ad63/original/banner-web-INFERNO-BURGER.jpg",
//       "https://assets.bancochile.cl/uploads/000/027/738/3c3e4216-34c3-45e4-86cc-44b7d3528a02/original/logo-web-INFERNO-BURGER.jpg",
//     ],
//     days: ["lunes", "martes", "miércoles"],
//     locations: ["Las Condes"],
//     bank: "banco de chile",
//   },
//   {
//     id: "5118",
//     restaurant: "Sushi Nikkei 17",
//     descripcion:
//       "Disfruta de un 40% de descuento todos los miércoles en Sushi Nikkei 17, ubicado en Providencia, con un descuento máximo de $40.000 por pedido.",
//     titulo: "40% dcto.",
//     descuento: 40,
//     imagenes: [
//       "https://banco.santander.cl/uploads/000/053/330/96285d92-68d5-49c7-b2c5-90c01916fe19/original/Logo_SushiNikkei17.png",
//       "https://banco.santander.cl/uploads/000/053/331/2d05a5d1-62fd-43b3-ae47-e6857064a817/original/Detalle_SushiNikkei17.png",
//     ],
//     days: ["miércoles"],
//     locations: ["Providencia"],
//     bank: "santander",
//   },
// ];

const mockBenefits: Benefit[] = [...bci, ...santander];
export const useBenefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBenefits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setBenefits(mockBenefits);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBenefits();
  }, [fetchBenefits]);

  return { benefits, loading, error, refetch: fetchBenefits };
};
