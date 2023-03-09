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
        console.log("PRE:" + JSON.stringify(reservas, null, 4));
        reservas?.push(reserva)

        setReservas(reservas)

        console.log("POST:" + JSON.stringify(reservas, null, 4));

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
            console.log("response:" + JSON.stringify(response.data, null, 4));
            console.log("reservas:" + JSON.stringify(reservas, null, 4));
            
            setLoadingReservas(false)
            setReservas(() => {
                return [...response.data]
            })
            console.log("reservasPost:" + JSON.stringify(reservas, null, 4));

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
