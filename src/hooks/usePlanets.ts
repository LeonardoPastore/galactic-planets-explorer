import { useEffect, useMemo, useState } from 'react'
import { fetchPlanetsPage } from '../api/swapi'
import { useDebounce } from './useDebounce'

import type { Planet } from '../types/Planet'
import type { NumericFilter } from '../types/NumericFilter'
import type { SortConfig } from '../types/Sort'

export function usePlanets() {
    const [planets, setPlanets] = useState<Planet[]>([])
    const [nextPage, setNextPage] = useState<string | null>(null)

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 400)

    const [numericFilters, setNumericFilters] = useState<NumericFilter[]>([])
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

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
     * 🔍 Busca + 🔢 filtros + 🔃 ordenação
     */
    const filteredPlanets = useMemo(() => {
        let result = [...planets]

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

        // 🔃 Ordenação
        if (sortConfig) {
            const { column, order } = sortConfig

            result.sort((a, b) => {
                const aValue = a[column]
                const bValue = b[column]

                // unknown sempre no final
                if (aValue === 'unknown') return 1
                if (bValue === 'unknown') return -1

                if (column === 'name') {
                    return order === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue)
                }

                const numA = Number(aValue)
                const numB = Number(bValue)

                return order === 'asc' ? numA - numB : numB - numA
            })
        }

        return result
    }, [planets, debouncedSearch, numericFilters, sortConfig])

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

        sortConfig,
        setSortConfig,

        loadMore,
        hasMore: Boolean(nextPage),
        loadingMore,
    }
}