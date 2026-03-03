import type { SortConfig, SortColumn, SortOrder } from '../types/Sort'

interface SortControlsProps {
    value: SortConfig | null
    onChange: (config: SortConfig) => void
}

const COLUMN_LABELS: Record<SortColumn, string> = {
    name: 'Nome',
    population: 'População',
    diameter: 'Diâmetro',
}

export function SortControls({ value, onChange }: SortControlsProps) {
    const column: SortColumn = value?.column ?? 'name'
    const order: SortOrder = value?.order ?? 'asc'

    return (
        <div className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col">
                <label className="text-xs text-slate-400 mb-1">Ordenar por</label>
                <select
                    value={column}
                    onChange={(e) =>
                        onChange({
                            column: e.target.value as SortColumn,
                            order,
                        })
                    }
                    className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                >
                    {Object.entries(COLUMN_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-slate-400 mb-1">Ordem</label>
                <select
                    value={order}
                    onChange={(e) =>
                        onChange({
                            column,
                            order: e.target.value as SortOrder,
                        })
                    }
                    className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                >
                    <option value="asc">Crescente</option>
                    <option value="desc">Decrescente</option>
                </select>
            </div>
        </div>
    )
}