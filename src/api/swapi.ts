const BASE_URL = 'https://swapi.dev/api'

export async function fetchPlanets() {
    const response = await fetch(`${BASE_URL}/planets/`)

    if (!response.ok) {
        throw new Error('Erro ao buscar planetas')
    }

    const data = await response.json()
    return data.results
}