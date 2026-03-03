import type { Planet } from './Planet'

export type SortColumn = keyof Pick<
    Planet,
    'name' | 'population' | 'diameter'
>

export type SortOrder = 'asc' | 'desc'

export interface SortConfig {
    column: SortColumn
    order: SortOrder
}