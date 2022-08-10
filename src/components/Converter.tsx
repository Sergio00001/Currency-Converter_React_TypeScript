import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICurrency } from '../models/ICurrency'
import { CurrInput } from './CurrInput';

export const Converter = () => {
    const [currOptions, setCurrOptions] = useState<ICurrency[]>([])
    const [fromOption, setFromOption] = useState('From')
    const [toOption, setToOption] = useState('To')
    const [selectedFrom, setSelectedFrom] = useState<ICurrency>()
    const [selectedTo, setSelectedTo] = useState<ICurrency>()
    const [date, setDate] = useState('')
    const [fromInput, setFromInput] = useState(1)
    const [result, setResult] = useState('')
    const [, setReverse] = useState(false)

    const fetching = async () => {
        try {
            const { data } = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            setDate(data[0].exchangedate)
            const UAH = [{ cc: 'UAH', exchangedate: date, txt: 'UAH', r030: 40, rate: 1 }]
            setCurrOptions([...UAH, ...data])
            setFromOption(data[25].cc)
            setToOption(UAH[0].cc)
        } catch (e) {
            console.log(e);
        }
    }

    const setOptions = () => {
        const options = currOptions
        options.filter((obj: any) => {
            if (obj.cc.includes(fromOption)) {
                setSelectedFrom(obj)
            }
            if (obj.cc.includes(toOption)) {
                setSelectedTo(obj)
            }
            return obj
        })
    }

    const calcResult = () => {
        const forOne = fromInput * (Number(selectedFrom?.rate))
        const calc = forOne / (Number(selectedTo?.rate))
        if (calc < 1) {
            setResult(calc.toFixed(4))
        } else {
            setResult(calc.toFixed(2))
        }
    }

    const reverseExchange = () => {
        setReverse(prev => !prev)
        setFromOption(toOption)
        setToOption(fromOption)
    }

    useEffect(() => {
        fetching()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setOptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromOption, toOption])

    useEffect(() => {
        calcResult()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromInput, selectedFrom, selectedTo])

    return (
        <div className="flex justify-center w-screen h-screen bg-green-100">
            <div className='shadow-xl absolute mt-32 rounded py-6 px-10 bg-white'>
                <h1 className='text-center mb-4 text-4xl'>Currency Converter</h1>
                <hr />
                <h3 className='my-6 text-3xl'>{fromInput} {fromOption === 'From' ? '' : selectedFrom?.cc} is equivalent to</h3>
                <h1 className='my-6 text-6xl'>{result} {toOption === 'To' ? '' : selectedTo?.cc}</h1>
                <h4 className='my-6 text-xl'> As of {date}</h4>
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
    )
}
