import React, { createContext, useContext, useMemo, useState } from "react";
import { Reserva } from "../../types";
import { View } from "../Themed";
import axios from "axios";
import { ReservaInputsValue } from "./types";
import { useDateContext } from "./DateContext";

interface ReservasContext {
    reservas: Reserva[];
    loadingReservas: boolean;
    guardarReserva: (inputValues: ReservaInputsValue) => void;
    poblarArray: () => void;
    eliminarReserva: (reserva: Reserva) => void;
}

export const ReservasContext = createContext<ReservasContext>({
    reservas: [],
    loadingReservas: true,
    guardarReserva: () => ({}),
    poblarArray: () => ({}),
    eliminarReserva: () => ({}),
});



export const ReservasProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservas, setReservas] = useState<Reserva[]>([])
    const [loadingReservas, setLoadingReservas] = useState(true)
    const [selectedDateDay, setSelectedDate] = useState(new Date())
    const { selectedDay, setSelectedDay } = useDateContext();

    const selectedDayString: string = useMemo<string>((): string => {
        const day = selectedDateDay.getDate();
        const month = selectedDateDay.getMonth() + 1;
        const year = selectedDateDay.getFullYear();
    
        return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    
      }, [selectedDay])


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

    const poblarArray = async () => {

        setLoadingReservas(true)
        setReservas([])
        try {
            const response = await axios.get<Reserva[]>(
                "http://192.168.1.133:3000/api/reservar",
                {
                    params: {
                        key: "holaquetalestamos",
                    },
                }
            );

            setReservas(response.data)
            setLoadingReservas(false)

        } catch (error) {
            console.error(error);
        }

    }

    const values = { reservas, selectedDateDay, loadingReservas, guardarReserva, poblarArray, eliminarReserva };

    return (
        <ReservasContext.Provider value={values}>
            {children}
        </ReservasContext.Provider>
    )
}


export const useReservas = () => {
    const { reservas, loadingReservas, guardarReserva, poblarArray, eliminarReserva } = useContext(ReservasContext)

    return { reservas, loadingReservas, guardarReserva, poblarArray, eliminarReserva }
}
