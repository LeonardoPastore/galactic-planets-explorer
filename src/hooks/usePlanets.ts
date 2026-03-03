import { useEffect, useMemo, useState } from 'react'
import { fetchPlanets } from '../api/swapi'
import type { Planet } from '../types/Planet'

export function usePlanets() {
    const [planets, setPlanets] = useState<Planet[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadPlanets() {
            try {
                const data = await fetchPlanets()
                setPlanets(data)
            } catch {
                setError('Não foi possível carregar os planetas')
            } finally {
                setLoading(false)
            }
        }

        loadPlanets()
    }, [])

    const filteredPlanets = useMemo(() => {
        return planets.filter((planet) =>
            planet.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [planets, search])

    return {
        planets: filteredPlanets,
        loading,
        error,
        search,
        setSearch,
    }
}