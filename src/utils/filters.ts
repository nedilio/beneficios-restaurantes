import { Benefit } from "../types";

export const filterBenefits = (
  benefits: Benefit[],
  searchTerm: string,
  selectedDays: string[],
  selectedLocations: string[],
  selectedBanks: string[]
): Benefit[] => {
  return benefits.filter((benefit) => {
    const matchesSearch =
      benefit.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDays =
      selectedDays.length === 0 ||
      benefit.days.some((day) => selectedDays.includes(day));

    const matchesLocations =
      selectedLocations.length === 0 ||
      benefit.locations.some((location) =>
        selectedLocations.includes(location)
      );

    console.log(selectedBanks);

    const matchesBanks =
      selectedBanks.length === 0 || selectedBanks.includes(benefit.bank);

    return matchesSearch && matchesDays && matchesLocations && matchesBanks;
  });
};

export const getUniqueValues = (
  benefits: Benefit[],
  key: "days" | "locations" | "bank"
): string[] => {
  const allValues = benefits.flatMap((benefit) => benefit[key]);
  return [...new Set(allValues)].sort((a, b) => a.localeCompare(b));
};
