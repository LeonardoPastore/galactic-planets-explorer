import type { Planet } from '../types/Planet'

interface PlanetsTableProps {
    planets: Planet[]
}

export function PlanetsTable({ planets }: PlanetsTableProps) {
    return (
        <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-slate-700 rounded-lg overflow-hidden">
                <thead className="bg-slate-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm text-slate-300">Nome</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-300">População</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-300">Clima</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-300">Terreno</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-300">Diâmetro</th>
                    </tr>
                </thead>

                <tbody>
                    {planets.map((planet) => (
                        <tr
                            key={planet.name}
                            className="border-t border-slate-700 hover:bg-slate-800/60 transition"
                        >
                            <td className="px-4 py-3 font-medium">{planet.name}</td>
                            <td className="px-4 py-3 text-slate-300">
                                {planet.population}
                            </td>
                            <td className="px-4 py-3 text-slate-300">
                                {planet.climate}
                            </td>
                            <td className="px-4 py-3 text-slate-300">
                                {planet.terrain}
                            </td>
                            <td className="px-4 py-3 text-slate-300">
                                {planet.diameter}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}