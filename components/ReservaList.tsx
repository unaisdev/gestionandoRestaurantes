import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext, useReservas } from "./context/ReservasContext";
import { View, Text } from "./Themed";
import { useDateContext } from "./context/DateContext";

// const initial: Reserva[] = [{ "dia": "09/03/2023", "email": "rqwereq", "hora": "werqwerqwe", "id": 40, "mas_info": "", "nombre": "pepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "eqweqwe", "hora": "qweqweqw", "id": 41, "mas_info": "", "nombre": "pepepepepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "wewqeqwe", "hora": "qweqweq", "id": 42, "mas_info": "", "nombre": "alfonso", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "", "hora": "qwqeqwe", "id": 43, "mas_info": "", "nombre": "qwerqwer", "personas": 0, "telefono": "" }]

const ReservaList = () => {
  const { reservas, poblarArray, loadingReservas, eliminarReserva } = useReservas();
  const { selectedDay, setSelectedDay } = useDateContext();
  const [reservasDia, setReservasDia] = useState<Reserva[]>([]);

  useEffect(() => {

    poblarArray()

  }, [])

  // Formateamos los valores en el formato "dd/mm/yyyy"
  const selectedDayString: string = useMemo<string>((): string => {
    const day = selectedDay.getDate();
    const month = selectedDay.getMonth() + 1;
    const year = selectedDay.getFullYear();

    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

  }, [selectedDay])

  useEffect(() => {
    console.log(reservas);
    console.log(reservasDia);

    setReservasDia(reservas.filter((item) => item.dia === selectedDayString));

  }, [selectedDay, reservas]);

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
        data={reservasDia}
        renderItem={({ item }) => <ReservaCard reserva={item} />}
        keyExtractor={item => String(item.id)}
      />

    </View>

  )
}

export default ReservaList;