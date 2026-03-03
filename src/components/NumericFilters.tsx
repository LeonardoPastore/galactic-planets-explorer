import { useState } from 'react'
import type {
    NumericFilter,
    NumericOperator,
    NumericColumn,
} from '../types/NumericFilter'

interface NumericFiltersProps {
    filters: NumericFilter[]
    onAdd: (filter: NumericFilter) => void
    onRemove: (column: NumericColumn) => void
    onClear: () => void
}

const NUMERIC_COLUMNS: NumericColumn[] = [
    'population',
    'diameter',
    'surface_water',
]

const COLUMN_LABELS: Record<NumericColumn, string> = {
    population: 'População',
    diameter: 'Diâmetro',
    surface_water: 'Água na superfície',
}

export function NumericFilters({
    filters,
    onAdd,
    onRemove,
    onClear,
}: NumericFiltersProps) {
    const [column, setColumn] = useState<NumericColumn>('population')
    const [operator, setOperator] = useState<NumericOperator>('>')
    const [value, setValue] = useState<number>(0)

    const usedColumns = filters.map((f) => f.column)
    const availableColumns = NUMERIC_COLUMNS.filter(
        (col) => !usedColumns.includes(col)
    )

    function handleAdd() {
        onAdd({ column, operator, value })
        setValue(0)
    }

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-100">
                Filtros Numéricos
            </h3>

            {/* Linha de controles */}
            <div className="flex flex-wrap gap-3 items-end">
                <div className="flex flex-col">
                    <label className="text-xs text-slate-400 mb-1">Coluna</label>
                    <select
                        value={column}
                        onChange={(e) => setColumn(e.target.value as NumericColumn)}
                        className="
              bg-slate-700 border border-slate-600 rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
                    >
                        {availableColumns.map((col) => (
                            <option key={col} value={col}>
                                {COLUMN_LABELS[col]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs text-slate-400 mb-1">Operador</label>
                    <select
                        value={operator}
                        onChange={(e) =>
                            setOperator(e.target.value as NumericOperator)
                        }
                        className="
              bg-slate-700 border border-slate-600 rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
                    >
                        <option value=">">Maior que</option>
                        <option value="<">Menor que</option>
                        <option value="=">Igual a</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs text-slate-400 mb-1">Valor</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="
              bg-slate-700 border border-slate-600 rounded-md px-3 py-2 w-28
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
                    />
                </div>

                <button
                    onClick={handleAdd}
                    disabled={availableColumns.length === 0}
                    className="
            bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600
            text-white px-4 py-2 rounded-md transition
          "
                >
                    Adicionar
                </button>
            </div>

            {/* Chips de filtros ativos */}
            {filters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <span
                            key={filter.column}
                            className="
                flex items-center gap-2 bg-slate-700 px-3 py-1
                rounded-full text-sm
              "
                        >
                            {COLUMN_LABELS[filter.column]} {filter.operator}{' '}
                            {filter.value}
                            <button
                                onClick={() => onRemove(filter.column)}
                                className="
                  text-slate-400 hover:text-red-400 transition
                "
                            >
                                ✕
                            </button>
                        </span>
                    ))}

                    <button
                        onClick={onClear}
                        className="text-sm text-red-400 hover:underline ml-2"
                    >
                        Limpar tudo
                    </button>
                </div>
            )}
        </section>
    )
}