import React from 'react'
import swapIcon from '../assets/swap.png'
import { ICurrency } from '../models/ICurrency'
import { CurrSelect } from './CurrSelect'

interface CurrInputProps {
    fromInput: number,
    setFromInput: (e: number) => void
    currOptions: ICurrency[],
    fromOption: string,
    toOption: string,
    setToOption: (e: string) => void,
    setFromOption: (e: string) => void
    reverseExchange: () => void
}

export const CurrInput = ({
    fromInput,
    setFromInput,
    currOptions,
    fromOption,
    toOption,
    setToOption,
    reverseExchange,
    setFromOption }: CurrInputProps) => {
    return (
        <div className='flex items-center'>
            <div className='mr-5'>
                <div className='mb-2 flex items-center'>
                    <div>
                        <input
                            type="number"
                            className=' bg-gray-100 focus:bg-transparent rounded mr-4 px-2 py-4 w-80'
                            value={fromInput}
                            min={0}
                            onChange={e => setFromInput(+e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-center mb-1'>From</h2>
                        <CurrSelect option={fromOption} setOption={setFromOption} currOptions={currOptions} />
                        <h2 className='m-1 text-center' >To</h2>
                        <CurrSelect option={toOption} setOption={setToOption} currOptions={currOptions} />
                    </div>
                </div>
            </div>
            <div>
                <button
                    className='px-1 py-2 active:scale-95 transition flex justify-center'
                    onClick={reverseExchange}
                ><img src={swapIcon} alt="icon" className='w-1/2 h-1/2' /></button>
            </div>
        </div>
    )
}
