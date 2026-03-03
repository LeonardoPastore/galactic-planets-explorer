import { useEffect, useMemo, useState } from 'react'
import { fetchPlanetsPage } from '../api/swapi'
import type { Planet } from '../types/Planet'

export function usePlanets() {
    const [planets, setPlanets] = useState<Planet[]>([])
    const [nextPage, setNextPage] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function loadInitial() {
        try {
            setLoading(true)
            const data = await fetchPlanetsPage<Planet>()
            setPlanets(data.results)
            setNextPage(data.next)
        } catch {
            setError('Não foi possível carregar os planetas')
        } finally {
            setLoading(false)
        }
    }

    async function loadMore() {
        if (!nextPage) return

        try {
            setLoadingMore(true)
            const data = await fetchPlanetsPage<Planet>(nextPage)
            setPlanets((prev) => [...prev, ...data.results])
            setNextPage(data.next)
        } catch {
            setError('Erro ao carregar mais planetas')
        } finally {
            setLoadingMore(false)
        }
    }

    useEffect(() => {
        loadInitial()
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
        loadMore,
        hasMore: Boolean(nextPage),
        loadingMore,
    }
}