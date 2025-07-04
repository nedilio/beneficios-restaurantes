export interface Benefit {
  id: string;
  restaurant: string;
  descripcion: string;
  titulo: string;
  descuento: number;
  imagenes: string[];
  days: string[];
  locations: string[];
  bank: "bci" | "banco de chile" | "santander";
}

export interface BenefitComplete extends Benefit {
  bank: "bci" | "banco de chile" | "santander";
}
