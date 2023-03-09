import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext, useReservas } from "./context/ReservasContext";
import { View } from "./Themed";

interface Props {
  selectedDate: Date;
}

const ReservaList = ({ selectedDate }: Props) => {
  const { reservas, guardarReserva, poblarLista, loadingReservas } = useReservas();

  // Formateamos los valores en el formato "dd/mm/yyyy"
  const selectedDay: string = useMemo<string>((): string => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

  }, [selectedDate])

  useEffect(() => {

    poblarLista(selectedDay)
    
  }, [selectedDate])




  return (
    <View style={{ display: "flex"}}>
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
        keyExtractor={item => item.id}
      />

    </View>

  )
}

export default ReservaList;