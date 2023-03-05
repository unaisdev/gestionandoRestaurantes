import axios from "axios";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";

interface Props {
    selectedDate: Date;
}

async function loadReservaList (date: Date, setData: React.Dispatch<React.SetStateAction<Reserva[]>>): Promise<React.SetStateAction<Reserva[]>> {
    let fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
    console.log(fecha)
    try {
        const response = await axios.get('http://192.168.1.133:3000/api/reservar', {
            params: {
                key: "holaquetalestamos",
                fecha: fecha,
            }
        });

        const array = await response.data;
        setData(array)
        return array;

    } catch (error) {
        console.error(error);
    } finally {

    }

    return []
        
}


const ReservaList = ({ selectedDate }: Props) => {
    const [data, setData] = useState<Reserva[]>([]);
    // const reservas = loadReservaList(selectedDate, setData)

    useEffect(() => {
        async function loadReservaList() {
            let fecha = selectedDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            console.log(fecha);
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
      
              setData(response.data);
            } catch (error) {
              console.error(error);
            }
          }
          loadReservaList();

    }, [selectedDate])

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ReservaCard reserva={item} />}
            keyExtractor={item => item.email}
        />
    )
}

export default ReservaList;