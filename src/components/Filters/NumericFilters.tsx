import { useState } from 'react'
import type { NumericFilter, NumericOperator } from '../../types/NumericFilter'

interface Props {
    onAdd: (filter: NumericFilter) => void
}

export function NumericFilters({ onAdd }: Props) {
    const [column, setColumn] = useState<NumericFilter['column']>('population')
    const [operator, setOperator] = useState<NumericOperator>('>')
    const [value, setValue] = useState(0)

    function handleAdd() {
        onAdd({ column, operator, value })
    }

    return (
        <div>
            <select value={column} onChange={(e) => setColumn(e.target.value as any)}>
                <option value="population">População</option>
                <option value="diameter">Diâmetro</option>
                <option value="surface_water">Água na superfície</option>
            </select>

            <select value={operator} onChange={(e) => setOperator(e.target.value as NumericOperator)}>
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
        </div>
    )
}