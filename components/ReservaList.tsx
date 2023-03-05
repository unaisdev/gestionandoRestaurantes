import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext, useReservas } from "./context/ReservasContext";

interface Props {
  selectedDate: Date;
}

const ReservaList = ({ selectedDate }: Props) => {
  // const [data, setData] = useState<Reserva[]>([]);
  const { reservas, guardarReserva, poblarLista } = useReservas();

  // const reservas = loadReservaList(selectedDate, setData)

  useEffect(() => {
    async function loadReservaList() {
      const dia = selectedDate.getDate();
      const mes = selectedDate.getMonth() + 1;
      const anio = selectedDate.getFullYear();

      // Formateamos los valores en el formato "dd/mm/yyyy"
      const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${anio}`;

      let fecha = selectedDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      console.log("load dia: " + fechaFormateada);
      try {
        const response = await axios.get<Reserva[]>(
          "http://192.168.1.133:3000/api/reservar",
          {
            params: {
              key: "holaquetalestamos",
              fecha: fechaFormateada,
            },
          }
        );

        console.log("load dia: " + response.status);

        poblarLista(response.data)
        // setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadReservaList();

  }, [selectedDate])



  return (
    <FlatList
      data={reservas}
      renderItem={({ item }) => <ReservaCard reserva={item} />}
      keyExtractor={item => item.id}
    />
  )
}

export default ReservaList;