import React from 'react'
import swapIcon from '../assets/swap.png'
import { ICurrency } from '../models/ICurrency'
import { CurrSelect } from './CurrSelect'

interface CurrInputProps {
    fromInput: number,
    setFromInput: (num: number) => void
    currOptions: ICurrency[],
    fromOption: string,
    toOption: string,
    setToOption: (str: string) => void,
    setFromOption: (str: string) => void
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
        <div className='flex justify-center items-center'>
            <div className='sm:mr-5'>
                <div className='mb-2 flex flex-col sm:flex-row items-center'>
                    <div className='block text-center sm:hidden'>
                        <button
                            className='border rounded my-4 py-2 active:scale-95 transition flex justify-center'
                            onClick={reverseExchange}
                        ><img src={swapIcon} alt="icon" className='w-1/2 h-1/2 rotate-90' /></button>
                    </div>
                    <div>
                        <input
                            type="number"
                            className='border outline-none focus:border-green-600 transition-all focus:bg-transparent rounded ml-auto sm:mr-4 px-2 py-4 sm:w-80'
                            value={fromInput}
                            min={0}
                            onChange={e => setFromInput(+e.target.value)}
                        />
                    </div>
                    <div className='flex items-center m-4 sm:m-0 sm:flex-col'>
                        <h2 className='text-center mr-3 sm:mr-0 sm:mb-1'>From</h2>
                        <CurrSelect option={fromOption} setOption={setFromOption} currOptions={currOptions} />
                        <h2 className='sm:m-1 mx-3 sm:mx-0 text-center' >To</h2>
                        <CurrSelect option={toOption} setOption={setToOption} currOptions={currOptions} />
                    </div>
                </div>
            </div>
            <div className='hidden sm:block'>
                <button
                    className='px-1 py-2 active:scale-95 transition flex justify-center'
                    onClick={reverseExchange}
                ><img src={swapIcon} alt="icon" className='w-1/2 h-1/2' /></button>
            </div>
        </div>
    )
}
