import { NumericFilters } from '../components/Filters/NumericFilters'
import { usePlanets } from '../hooks/usePlanets'

function App() {
    const {
        planets,
        numericFilters,
        addNumericFilter,
        removeNumericFilter,
        clearNumericFilters,
    } = usePlanets()

    return (
        <>
            <NumericFilters
                filters={numericFilters}
                onAdd={addNumericFilter}
                onRemove={removeNumericFilter}
                onClear={clearNumericFilters}
            />

            <ul>
                {planets.map((planet) => (
                    <li key={planet.name}>{planet.name}</li>
                ))}
            </ul>
        </>
    )
}

export default App