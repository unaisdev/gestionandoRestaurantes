import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext } from "../navigation";

interface Props {
  selectedDate: Date;
}

const ReservaList = ({ selectedDate }: Props) => {
  const [data, setData] = useState<Reserva[]>([]);
  const { res, addReserva } = useContext(ReservasContext);

  console.log(res);
  console.log(data)
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