import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICurrency } from '../models/ICurrency'
import swapIcon from '../assets/swap.png'

export const Converter = () => {
    const [currOptions, setCurrOptions] = useState<ICurrency[]>([])
    const [fromOption, setFromOption] = useState('From')
    const [toOption, setToOption] = useState('To')
    const [selectedFrom, setSelectedFrom] = useState<ICurrency>()
    const [selectedTo, setSelectedTo] = useState<ICurrency>()
    const [date, setDate] = useState('')
    const [fromInput, setFromInput] = useState(1)
    const [toInput, setToInput] = useState(0)
    const [result, setResult] = useState('')
    const [reverse, setReverse] = useState(false)

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
    }, [])

    useEffect(() => {
        setOptions()
    }, [fromOption, toOption])

    useEffect(() => {
        calcResult()
    }, [fromInput, selectedFrom, selectedTo])

    return (
        <div className="flex justify-center w-screen h-screen bg-green-100">
            <div className='shadow-xl absolute mt-32 rounded py-6 px-10 bg-white'>
                <h1 className='text-center mb-4 text-4xl'>Currency Converter</h1>
                <hr />
                <h3 className='my-6 text-3xl'>{fromInput} {fromOption === 'From' ? '' : selectedFrom?.cc} is equivalent to</h3>
                <h1 className='my-6 text-6xl'>{result} {toOption === 'To' ? '' : selectedTo?.cc}</h1>
                <h4 className='my-6 text-xl'> As of {date}</h4>
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
                                <select
                                    className='border px-1 py-4 rounded'
                                    value={fromOption}
                                    onChange={e => setFromOption(e.target.value)}
                                >
                                    <option disabled>From</option>
                                    {currOptions.map(curr =>
                                        <option
                                            key={curr.cc}
                                        >{curr.cc}</option>
                                    )}
                                </select>
                                <h2 className='m-1 text-center' >To</h2>
                                <select
                                    className='border px-1 py-4 rounded'
                                    value={toOption}
                                    onChange={e => setToOption(e.target.value)}
                                >
                                    <option disabled>To</option>
                                    {currOptions.map(curr =>
                                        <option
                                            key={curr.cc}
                                        >{curr.cc}</option>
                                    )}
                                </select>
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
            </div>
        </div>
    )
}
