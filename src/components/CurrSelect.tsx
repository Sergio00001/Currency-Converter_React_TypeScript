import React from 'react'
import { ICurrency } from '../models/ICurrency'

interface CurrSelectProps {
    option: string,
    setOption: (e: string) => void,
    currOptions: ICurrency[]
}

export const CurrSelect = ({ option, setOption, currOptions }: CurrSelectProps) => {
    return (
        <select
            className='border px-1 py-4 rounded'
            value={option}
            onChange={e => setOption(e.target.value)}
        >
            <option disabled>From</option>
            {currOptions.map(curr =>
                <option
                    key={curr.cc}
                >{curr.cc}</option>
            )}
        </select>
    )
}
