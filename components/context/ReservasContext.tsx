import React, { createContext, useContext, useState } from "react";
import { Reserva } from "../../types";
import { View } from "../Themed";
import axios from "axios";
import { ReservaInputsValue } from "./types";

interface ReservasContext {
    reservas: Reserva[];
    loadingReservas: boolean;
    guardarReserva: (inputValues: ReservaInputsValue) => void;
    poblarLista: (fecha: string) => void;
    eliminarReserva: (reserva: Reserva) => void;
}

export const ReservasContext = createContext<ReservasContext>({
    reservas: [],
    loadingReservas: true,
    guardarReserva: () => ({}),
    poblarLista: () => ({}),
    eliminarReserva: () => ({}),
});


export const ReservasProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservas, setReservas] = useState<Reserva[]>([])
    const [loadingReservas, setLoadingReservas] = useState(true)
    
    const guardarReserva = async (inputValues: ReservaInputsValue) => {
        // reservas?.push(reserva)        
        try {
            const response = await fetch('http://192.168.1.133:3000/api/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputValues),
            });
            const newReserva: Reserva = await response.json();
            
            setReservas((previus) => {
                return [...previus, newReserva]
            })
            
        } catch (error) {
            console.error(error);
        }
        // setReservas(reservas)

        
    }

    const eliminarReserva = async (reserva: Reserva) => {
        console.log("eliminar:; " + JSON.stringify(reserva));
        
        try {
            const responseAxios = await axios.delete(
                "http://192.168.1.133:3000/api/reservar",
                {   
                    params: {
                        key: "holaquetalestamos",
                        id: reserva.id,

                    },
                }
            );

             setReservas(reservas.filter(item => item !== reserva))

            // const response = await fetch('http://192.168.1.133:3000/api/reservar', {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //     }),
            // });
            // const data = await response.json();
        } catch (error) {
            console.error(error);
        }
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



    const values = { reservas, loadingReservas, guardarReserva, poblarLista, eliminarReserva };

    return (
        <ReservasContext.Provider value={values}>
            {children}
        </ReservasContext.Provider>
    )
}


export const useReservas = () => {
    const { reservas, loadingReservas, guardarReserva, poblarLista, eliminarReserva } = useContext(ReservasContext)

    return { reservas, loadingReservas, guardarReserva, poblarLista, eliminarReserva }
}
