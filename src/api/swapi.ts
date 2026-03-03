const BASE_URL = 'https://swapi.dev/api'

interface PlanetsResponse<T> {
    results: T[]
    next: string | null
}

export async function fetchPlanetsPage<T>(url = `${BASE_URL}/planets/`) {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Erro ao buscar planetas')
    }

    const data: PlanetsResponse<T> = await response.json()
    return data
}