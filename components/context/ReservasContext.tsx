import React, { createContext, useContext, useState } from "react";
import { Reserva } from "../../types";
import { View } from "../Themed";

interface ReservasContext {
    reservas: Reserva[];
    guardarReserva: (reserva: Reserva) => void;
    poblarLista: (reserva: Reserva[]) => void;
}

export const ReservasContext = createContext<ReservasContext>({
    reservas: [],
    guardarReserva: () => ({}),
    poblarLista: () => ({}),
});


export const ReservasProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservas, setReservas] = useState<Reserva[]>([])

    const guardarReserva = (reserva: Reserva) => {
        setReservas(previus => {
            return [...previus, reserva]
        })
    }

    const poblarLista = (reservas: Reserva[]) => {
        setReservas(previus => {
            return [...previus, ...reservas]
        })
    }

    const values = { reservas, guardarReserva, poblarLista };

    return (
        <ReservasContext.Provider value={values}>
            {children}
        </ReservasContext.Provider>
    )
}


export const useReservas = () => {
    const { reservas, guardarReserva, poblarLista } = useContext(ReservasContext)

    return { reservas, guardarReserva, poblarLista }
}
