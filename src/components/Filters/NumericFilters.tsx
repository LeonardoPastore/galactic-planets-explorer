import { useState } from 'react'
import type { NumericFilter, NumericOperator, NumericColumn } from '../../types/NumericFilter'

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
        <section>
            <h3>Filtros Numéricos</h3>

            <select
                value={column}
                onChange={(e) => setColumn(e.target.value as NumericColumn)}
            >
                {availableColumns.map((col) => (
                    <option key={col} value={col}>
                        {COLUMN_LABELS[col]}
                    </option>
                ))}
            </select>

            <select
                value={operator}
                onChange={(e) => setOperator(e.target.value as NumericOperator)}
            >
                <option value=">">Maior que</option>
                <option value="<">Menor que</option>
                <option value="=">Igual a</option>
            </select>

            <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
            />

            <button onClick={handleAdd}>Adicionar filtro</button>

            {filters.length > 0 && (
                <>
                    <ul>
                        {filters.map((filter) => (
                            <li key={filter.column}>
                                {COLUMN_LABELS[filter.column]} {filter.operator} {filter.value}
                                <button onClick={() => onRemove(filter.column)}>✕</button>
                            </li>
                        ))}
                    </ul>

                    <button onClick={onClear}>Limpar filtros</button>
                </>
            )}
        </section>
    )
}