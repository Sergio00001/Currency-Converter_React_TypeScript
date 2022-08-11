import { useMemo, useState } from "react"
import { ICurrency } from "../models/ICurrency"

interface UseOptionsAndCalcResultArgs {
    currOptions: ICurrency[],
    fromOption: string,
    toOption: string,
}

export const useOptionsAndCalcResult = ({ currOptions, fromOption, toOption }: UseOptionsAndCalcResultArgs) => {
    const [selectedFrom, setSelectedFrom] = useState<ICurrency>()
    const [selectedTo, setSelectedTo] = useState<ICurrency>()
    const [result, setResult] = useState('')
    const [fromInput, setFromInput] = useState(1)


    const setOptions = useMemo(() => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromOption, toOption])

    const calcResult = useMemo(() => {
        const forOne = fromInput * (Number(selectedFrom?.rate))
        const calc = forOne / (Number(selectedTo?.rate))
        if (calc < 1) {
            setResult(calc.toFixed(4))
        } else {
            setResult(calc.toFixed(2))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromInput, selectedFrom, selectedTo])

    return { selectedFrom, selectedTo, setOptions, result, fromInput, setFromInput, calcResult }
}