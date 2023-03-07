import React, { createContext, useContext, useState } from "react";
import { Reserva } from "../../types";
import { View } from "../Themed";
import axios from "axios";

interface ReservasContext {
    reservas: Reserva[];
    guardarReserva: (reserva: Reserva) => void;
    poblarLista: (reserva: Reserva[], fecha: string) => void;
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
            console.log(previus)
            return [...previus, reserva]
        })
    }

    const poblarLista = async (reservas: Reserva[], fecha: string) => {
        console.log("CARGANDO RESERVAS DIA: " + fecha);
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

            console.log(response.data);

            setReservas(() => {
                return [...response.data]
            })

            return response.data

        } catch (error) {
            console.error(error);
        }

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
