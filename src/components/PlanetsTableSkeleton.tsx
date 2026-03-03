import { Skeleton } from './Skeleton'

export function PlanetsTableSkeleton() {
    return (
        <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-slate-700 rounded-lg overflow-hidden">
                <thead className="bg-slate-800">
                    <tr>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <th key={i} className="px-4 py-3">
                                <Skeleton className="h-4 w-24" />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: 6 }).map((_, row) => (
                        <tr key={row} className="border-t border-slate-700">
                            {Array.from({ length: 5 }).map((_, col) => (
                                <td key={col} className="px-4 py-3">
                                    <Skeleton className="h-4 w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}