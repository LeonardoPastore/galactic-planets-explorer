import type { Planet } from './Planet'

export type NumericColumn = keyof Pick<
    Planet,
    'population' | 'diameter' | 'surface_water'
>

export type NumericOperator = '>' | '<' | '='

export interface NumericFilter {
    column: NumericColumn
    operator: NumericOperator
    value: number
}