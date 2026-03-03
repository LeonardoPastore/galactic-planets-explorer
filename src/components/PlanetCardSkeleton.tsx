import { Skeleton } from './Skeleton'

export function PlanetCardSkeleton() {
    return (
        <li className="bg-slate-800 p-4 rounded-lg space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
        </li>
    )
}