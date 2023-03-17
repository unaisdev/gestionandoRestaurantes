import React, { createContext, useContext, useMemo, useState } from "react";
import { Reserva } from "../../types";
import { View } from "../Themed";
import axios from "axios";
import { ReservaInputsValue } from "./types";
import { useDateContext } from "./DateContext";
import Toast from 'react-native-root-toast';
import { formatearDia } from "../../utils/date";

interface ReservasContext {
    reservas: Reserva[];
    loadingReservas: boolean;
    guardarReserva: (inputValues: ReservaInputsValue) => void;
    poblarArray: () => void;
    eliminarReserva: (reserva: Reserva) => void;
    actualizarReserva: (reserva: Reserva) => void;
}

export const ReservasContext = createContext<ReservasContext>({
    reservas: [],
    loadingReservas: true,
    guardarReserva: () => ({}),
    poblarArray: () => ({}),
    eliminarReserva: () => ({}),
    actualizarReserva: () => ({}),
});

let toast

const toJsonInputs = (data: ReservaInputsValue): string => {
    const json = `{
      "nombre": "${data.nombre}",
      "telefono": "${data.telefono}",
      "personas": ${data.personas},
      "dia": "${data.dia}",
      "hora": "${data.hora}",
      "email": "${data.email}",
      "mas_info": "${(data.mas_info || '').replace(/\n/g, '\\u000A')}"
    }`;
    return json;
};

export const ReservasProvider = ({ children }: { children: React.ReactNode }) => {
    const [reservas, setReservas] = useState<Reserva[]>([])
    const [loadingReservas, setLoadingReservas] = useState(true)
    const [selectedDateDay, setSelectedDate] = useState(new Date())
    const { selectedDay, setSelectedDay } = useDateContext();

    const selectedDayString: string = useMemo<string>((): string => {
        const day = selectedDateDay.getDate();
        const month = selectedDateDay.getMonth() + 1;
        const year = selectedDateDay.getFullYear();

        return formatearDia(day, month, year);

    }, [selectedDay])

    const actualizarReserva = async (reserva: Reserva) => {
        console.log("actualizando reserva: " + JSON.stringify(reserva));
        try {
            const response = await fetch('http://192.168.1.133:3000/api/reservar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reserva),
            });
            const reservaAct: Reserva = await response.json();

            console.log(response.json())
            setReservas(previus => {
                // Buscar y actualizar la reserva existente en la matriz
                const nuevasReservas = previus.map(previa => {
                    if (previa.id === reservaAct.id) {
                        return reservaAct;
                    }
                    return previa;
                });
                console.log(nuevasReservas)

                return nuevasReservas;
            });

        } catch (error) {
            console.error(error);
        }
        // setReservas(reservas)

    }

    const guardarReserva = async (inputValues: ReservaInputsValue) => {
        // reservas?.push(reserva)        
        console.log(toJsonInputs(inputValues));

        try {
            const response = await fetch('http://192.168.1.133:3000/api/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: toJsonInputs(inputValues),
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
            console.log(response.data)

            setReservas(response.data)
            setLoadingReservas(false)
            toast = Toast.show(`Cargadas ${response.data.length} reservas.`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            });
        } catch (error) {
            console.error(error);
        }

    }

    const values = { reservas, selectedDateDay, loadingReservas, guardarReserva, poblarArray, eliminarReserva, actualizarReserva };

    return (
        <ReservasContext.Provider value={values}>
            {children}
        </ReservasContext.Provider>
    )
}


export const useReservas = () => {
    const { reservas, loadingReservas, guardarReserva, poblarArray, eliminarReserva, actualizarReserva } = useContext(ReservasContext)

    return { reservas, loadingReservas, guardarReserva, poblarArray, eliminarReserva, actualizarReserva }
}
