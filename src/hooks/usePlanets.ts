import { useEffect, useState } from 'react'
import { fetchPlanets } from '../api/swapi'
import type { Planet } from '../types/Planet'

export function usePlanets() {
    const [planets, setPlanets] = useState<Planet[]>([])
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

    return { planets, loading, error }
}