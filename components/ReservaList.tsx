import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext, useReservas } from "./context/ReservasContext";
import { View, Text } from "./Themed";

interface Props {
  selectedDate: Date;
}

// const initial: Reserva[] = [{ "dia": "09/03/2023", "email": "rqwereq", "hora": "werqwerqwe", "id": 40, "mas_info": "", "nombre": "pepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "eqweqwe", "hora": "qweqweqw", "id": 41, "mas_info": "", "nombre": "pepepepepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "wewqeqwe", "hora": "qweqweq", "id": 42, "mas_info": "", "nombre": "alfonso", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "", "hora": "qwqeqwe", "id": 43, "mas_info": "", "nombre": "qwerqwer", "personas": 0, "telefono": "" }]

const ReservaList = ({ selectedDate }: Props) => {
  const { reservas, guardarReserva, poblarLista, loadingReservas, eliminarReserva } = useReservas();

  // Formateamos los valores en el formato "dd/mm/yyyy"
  const selectedDay: string = useMemo<string>((): string => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

  }, [selectedDate])

  useEffect(() => {

    poblarLista(selectedDay)

  }, [selectedDay])

  console.log({ reservas })


  return (
    <View style={{ display: "flex", flex: 1 }}>
      {loadingReservas && (
        <ActivityIndicator
          size="large"
          style={{
            marginBottom: 30,
            marginTop: 30,
          }}
        />
      )}
      <FlatList
        data={reservas}
        renderItem={({ item }) => <ReservaCard reserva={item} />}
        extraData={reservas}
        keyExtractor={item => String(item.id)}
      />

    </View>

  )
}

export default ReservaList;