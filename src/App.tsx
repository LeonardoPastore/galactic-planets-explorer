import { NumericFilters } from './components/NumericFilters'
import { SortControls } from './components/SortControls'
import { usePlanets } from './hooks/usePlanets'

function App() {
  const {
    planets,
    loading,
    error,

    search,
    setSearch,

    numericFilters,
    addNumericFilter,
    removeNumericFilter,
    clearNumericFilters,

    sortConfig,
    setSortConfig,
  } = usePlanets()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando planetas...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Título */}
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-wide">
            Galactic Planets Explorer
          </h1>
          <p className="text-slate-400">
            Explore planetas do universo Star Wars
          </p>
        </header>

        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar planeta pelo nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full p-3 rounded-md bg-slate-800 border border-slate-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />

        {/* Ordenação */}
        <div className="bg-slate-800 p-4 rounded-md">
          <SortControls
            value={sortConfig}
            onChange={setSortConfig}
          />
        </div>

        {/* Filtros numéricos */}
        <div className="bg-slate-800 p-4 rounded-md">
          <NumericFilters
            filters={numericFilters}
            onAdd={addNumericFilter}
            onRemove={removeNumericFilter}
            onClear={clearNumericFilters}
          />
        </div>

        {/* Lista de planetas */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {planets.map((planet) => (
            <li
              key={planet.name}
              className="bg-slate-800 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{planet.name}</h2>
              <p className="text-sm text-slate-400">
                População: {planet.population}
              </p>
              <p className="text-sm text-slate-400">
                Clima: {planet.climate}
              </p>
              <p className="text-sm text-slate-400">
                Terreno: {planet.terrain}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App