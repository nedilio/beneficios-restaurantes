import { useState, useMemo } from "react";
import { CreditCard, AlertCircle, RefreshCw } from "lucide-react";
import { BenefitCard } from "./components/BenefitCard";
import { SearchBar } from "./components/SearchBar";
import { FilterChips } from "./components/FilterChips";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useBenefits } from "./hooks/useBenefits";
import { filterBenefits, getUniqueValues } from "./utils/filters";
const ordenSemana = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];
function App() {
  const { benefits, loading, error, refetch } = useBenefits();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

  const uniqueDays = useMemo(
    () => getUniqueValues(benefits, "days"),
    [benefits]
  );
  const uniqueLocations = useMemo(
    () => getUniqueValues(benefits, "locations"),
    [benefits]
  );
  const uniqueBanks = useMemo(
    () => getUniqueValues(benefits, "bank"),
    [benefits]
  );

  const filteredBenefits = useMemo(
    () =>
      filterBenefits(
        benefits,
        searchTerm,
        selectedDays,
        selectedLocations,
        selectedBanks
      ),
    [benefits, searchTerm, selectedDays, selectedLocations, selectedBanks]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CreditCard className="text-blue-600 mr-3" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
              Beneficios en Restaurantes con tu banco
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra más rapido tus beneficios en restaurantes, ofertas y
            ubicaciones con nuestra herramienta de búsqueda y filtros.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="mb-6">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar por restaurante o ubicación"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {uniqueDays.length > 0 && (
              <FilterChips
                label="Días de la semana"
                options={uniqueDays.sort((a, b) => {
                  return ordenSemana.indexOf(a) - ordenSemana.indexOf(b);
                })}
                selected={selectedDays}
                onChange={setSelectedDays}
              />
            )}
            {uniqueLocations.length > 0 && (
              <FilterChips
                label="Ubicaciones"
                options={uniqueLocations}
                selected={selectedLocations}
                onChange={setSelectedLocations}
              />
            )}
            {uniqueBanks.length > 0 && (
              <FilterChips
                label="Bancos"
                options={uniqueBanks}
                selected={selectedBanks}
                onChange={setSelectedBanks}
              />
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredBenefits.length} de {benefits.length} beneficios
          </p>
        </div>

        {/* Benefits Grid */}
        {filteredBenefits.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBenefits.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No benefits found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more benefits.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
