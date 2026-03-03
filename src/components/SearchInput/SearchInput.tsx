import type { ChangeEvent } from 'react'

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value)
    }

    return (
        <input
            type="text"
            placeholder="Buscar planeta pelo nome..."
            value={value}
            onChange={handleChange}
        />
    )
}