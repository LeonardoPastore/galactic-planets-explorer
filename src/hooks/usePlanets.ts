import { useEffect, useMemo, useState } from 'react'
import { fetchPlanetsPage } from '../api/swapi'
import { useDebounce } from './useDebounce'
import type { Planet } from '../types/Planet'
import type { NumericFilter } from '../types/NumericFilter'

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

    useEffect(() => {
        loadInitial()
    }, [])

    /**
     * Aplica busca por nome + filtros numéricos
     */
    const filteredPlanets = useMemo(() => {
        let result = planets

        // 🔍 Filtro por nome
        if (debouncedSearch) {
            result = result.filter((planet) =>
                planet.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
        }

        // 🔢 Filtros numéricos
        if (numericFilters.length > 0) {
            result = result.filter((planet) =>
                numericFilters.every(({ column, operator, value }) => {
                    const rawValue = planet[column]

                    // ignora planetas com valor desconhecido
                    if (rawValue === 'unknown') return false

                    const planetValue = Number(rawValue)

                    if (Number.isNaN(planetValue)) return false

                    switch (operator) {
                        case '>':
                            return planetValue > value
                        case '<':
                            return planetValue < value
                        case '=':
                            return planetValue === value
                        default:
                            return true
                    }
                })
            )
        }

        return result
    }, [planets, debouncedSearch, numericFilters])

    function addNumericFilter(filter: NumericFilter) {
        setNumericFilters((prev) => [...prev, filter])
    }

    function removeNumericFilter(column: NumericFilter['column']) {
        setNumericFilters((prev) =>
            prev.filter((filter) => filter.column !== column)
        )
    }

    function clearNumericFilters() {
        setNumericFilters([])
    }

    return {
        planets: filteredPlanets,
        loading,
        error,

        search,
        setSearch,

        numericFilters,
        addNumericFilter,
        removeNumericFilter,
        clearNumericFilters,

        loadMore,
        hasMore: Boolean(nextPage),
        loadingMore,
    }
}