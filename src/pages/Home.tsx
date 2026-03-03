import { usePlanets } from '../hooks/usePlanets'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { NumericFilters } from '../components/Filters/NumericFilters'

export function Home() {
    const {
        planets,
        loading,
        error,
        search,
        setSearch,
        loadMore,
        hasMore,
        loadingMore,
        addNumericFilter,
        numericFilters,
        removeNumericFilter,
    } = usePlanets()

    if (loading) return <p>Carregando planetas...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>🌌 Galactic Planets Explorer</h1>

            <SearchInput value={search} onChange={setSearch} />

            <NumericFilters onAdd={addNumericFilter} />

            {numericFilters.map((filter) => (
                <button
                    key={filter.column}
                    onClick={() => removeNumericFilter(filter.column)}
                >
                    Remover
                </button>
            ))}

            <ul>
                {planets.map((planet) => (
                    <li key={planet.name}>
                        <strong>{planet.name}</strong> — {planet.population}
                    </li>
                ))}
            </ul>

            {hasMore && (
                <button onClick={loadMore} disabled={loadingMore}>
                    {loadingMore ? 'Carregando...' : 'Carregar mais'}
                </button>
            )}
        </div>
    )
}