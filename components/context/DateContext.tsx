import { createContext, useContext, useState } from "react"

interface DateContext {
    selectedDay: Date;
    setSelectedDay: (day: Date) => void;
}

export const DateContext = createContext<DateContext>({
    selectedDay: new Date(),
    setSelectedDay: () => ({}),
    
});

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedDay, setSelectedDayDate] = useState<Date>(new Date())

    const setSelectedDay = (date: Date) => {
        setSelectedDayDate(date)
    }

    const values = { selectedDay, setSelectedDay };

    return (
        <DateContext.Provider value={values}>
            {children}
        </DateContext.Provider>
    )
}

export const useDateContext = () => {
    const { selectedDay, setSelectedDay } = useContext(DateContext)

    return { selectedDay, setSelectedDay }
}