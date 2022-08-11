import { useState } from "react"

interface UseReverseArgs {
    fromOption: string,
    toOption: string,
    setFromOption: (str: string) => void
    setToOption: (str: string) => void
}

export const useReverse = ({ fromOption, toOption, setFromOption, setToOption }: UseReverseArgs) => {
    const [, setReverse] = useState(false)

    const reverseExchange = () => {
        setReverse(prev => !prev)
        setFromOption(toOption)
        setToOption(fromOption)
    }

    return reverseExchange
}