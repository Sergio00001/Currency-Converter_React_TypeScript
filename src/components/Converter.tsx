import React from 'react';
import { CurrInput } from './CurrInput';
import { useFetching } from '../hooks/useFetching';
import { useReverse } from '../hooks/useReverse';
import { useOptionsAndCalcResult } from '../hooks/useOptionsAndCalcResult';

import background from '../assets/background.jpg'

export const Converter = () => {
    const { isLoading, currOptions, date, fromOption, toOption, setFromOption, setToOption } = useFetching()
    const reverseExchange = useReverse({ fromOption, toOption, setFromOption, setToOption })
    const { selectedFrom, selectedTo, fromInput, result, setFromInput } = useOptionsAndCalcResult({ currOptions, fromOption, toOption })

    if (isLoading) {
        return (
            <div className='flex justify-center items-center w-screen h-screen bg-black'>
                <div className="loader"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        <>
            <img src={background} alt="background" className='background__img' />
            <div className="converter flex justify-center items-center w-screen h-screen">
                <div className='sm:shadow-xl rounded py-3 px-5 sm:py-6 sm:px-10 bg-white'>
                    <h1 className=' text-center mb-4 text-4xl'>Currency Converter</h1>
                    <hr />
                    <div className='text-center'>
                        <h3 className='my-6 text-4xl font-bold sm:text-7xl'>{fromInput} {fromOption === 'From' ? '' : selectedFrom?.cc}</h3>
                        <h3 className='text-2xl sm:text-3xl'>IS EQUIVALENT TO</h3>
                        <h1 className='my-6 text-4xl font-bold sm:text-7xl'>{result} {toOption === 'To' ? '' : selectedTo?.cc}</h1>
                        <h4 className='mt-6 sm:mt-0 sm:my-6 text-xl sm:text-xl'> As of {date}</h4>
                    </div>
                    <CurrInput
                        fromInput={fromInput}
                        currOptions={currOptions}
                        fromOption={fromOption}
                        toOption={toOption}
                        setToOption={setToOption}
                        setFromInput={setFromInput}
                        setFromOption={setFromOption}
                        reverseExchange={reverseExchange}
                    />
                </div>
            </div>
        </>
    )
}
