import { useState, useEffect } from "react"
import axios, { AxiosError } from "axios"
import { ICurrency } from "../models/ICurrency"

export const useFetching = () => {
    const [currOptions, setCurrOptions] = useState<ICurrency[]>([])
    const [fromOption, setFromOption] = useState('From')
    const [toOption, setToOption] = useState('To')
    const [date, setDate] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    async function fetchOptions() {
        try {
            const { data } = await axios.get<ICurrency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            setDate(data[0].exchangedate)
            const UAH = [{ cc: 'UAH', exchangedate: data[0].exchangedate, txt: 'UAH', r030: 40, rate: 1 }]
            setCurrOptions([...UAH, ...data])
            setFromOption(data[25].cc)
            setToOption(UAH[0].cc)
        } catch (e: unknown) {
            const error = e as AxiosError
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { isLoading, currOptions, date, fromOption, toOption, setFromOption, setToOption }
}