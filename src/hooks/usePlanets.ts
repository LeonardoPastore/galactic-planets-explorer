import { useEffect, useMemo, useState } from 'react'
import { fetchPlanetsPage } from '../api/swapi'
import { useDebounce } from './useDebounce'
import type { Planet } from '../types/Planet'
import type { NumericFilter } from '../types/NumericFilter'

function toNumber(value: string) {
    if (value === 'unknown') return null
    return Number(value)
}

export function usePlanets() {
    const [planets, setPlanets] = useState<Planet[]>([])
    const [nextPage, setNextPage] = useState<string | null>(null)

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 400)

    const [numericFilters, setNumericFilters] = useState<NumericFilter[]>([])

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

    function addNumericFilter(filter: NumericFilter) {
        setNumericFilters((prev) => [...prev, filter])
    }

    function removeNumericFilter(index: number) {
        setNumericFilters((prev) => prev.filter((_, i) => i !== index))
    }

    useEffect(() => {
        loadInitial()
    }, [])

    const filteredPlanets = useMemo(() => {
        let result = planets

        // filtro por nome (debounce)
        result = result.filter((planet) =>
            planet.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )

        // filtros numéricos
        numericFilters.forEach(({ column, operator, value }) => {
            result = result.filter((planet) => {
                const planetValue = toNumber(planet[column])
                if (planetValue === null) return false

                if (operator === '>') return planetValue > value
                if (operator === '<') return planetValue < value
                return planetValue === value
            })
        })

        return result
    }, [planets, debouncedSearch, numericFilters])

    return {
        planets: filteredPlanets,
        loading,
        error,
        search,
        setSearch,
        loadMore,
        hasMore: Boolean(nextPage),
        loadingMore,
        addNumericFilter,
        removeNumericFilter,
        numericFilters,
    }
}