import React, { createContext, useContext, useState } from "react";
import { Reserva } from "../../types";
import { View } from "../Themed";
import axios from "axios";

interface ReservasContext {
    reservas: Reserva[];
    loadingReservas: boolean;
    guardarReserva: (reserva: Reserva) => void;
    poblarLista: (fecha: string) => void;
}

export const ReservasContext = createContext<ReservasContext>({
    reservas: [],
    loadingReservas: true,
    guardarReserva: () => ({}),
    poblarLista: () => ({}),
});


export const ReservasProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservas, setReservas] = useState<Reserva[]>([])
    const [loadingReservas, setLoadingReservas] = useState(true)
    
    const guardarReserva = (reserva: Reserva) => {
        // reservas?.push(reserva)

        // setReservas(reservas)

        setReservas((previus) => {
            return [...previus, reserva]
        })
    }

    const poblarLista = async (fecha: string) => {
        console.log("poblando lista: " + fecha)

        setLoadingReservas(true)
        setReservas([])

        try {
            const response = await axios.get<Reserva[]>(
                "http://192.168.1.133:3000/api/reservar",
                {
                    params: {
                        key: "holaquetalestamos",
                        fecha: fecha,
                    },
                }
            );

            setReservas(response.data)
            setLoadingReservas(false)

        } catch (error) {
            console.error(error);
        }

    }



    const values = { reservas, loadingReservas, guardarReserva, poblarLista };

    return (
        <ReservasContext.Provider value={values}>
            {children}
        </ReservasContext.Provider>
    )
}


export const useReservas = () => {
    const { reservas, loadingReservas, guardarReserva, poblarLista } = useContext(ReservasContext)

    return { reservas, loadingReservas, guardarReserva, poblarLista }
}
