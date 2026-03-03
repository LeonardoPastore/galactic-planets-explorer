import { usePlanets } from '../hooks/usePlanets'

export function Home() {
    const { planets, loading, error } = usePlanets()

    if (loading) return <p>Carregando planetas...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>🌌 Galactic Planets Explorer</h1>
            <ul>
                {planets.map((planet) => (
                    <li key={planet.name}>
                        <strong>{planet.name}</strong> — {planet.climate}
                    </li>
                ))}
            </ul>
        </div>
    )
}