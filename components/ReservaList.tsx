import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext, useReservas } from "./context/ReservasContext";
import { View, Text } from "./Themed";
import { useDateContext } from "./context/DateContext";
import { formatearDia } from "../utils/date";

// const initial: Reserva[] = [{ "dia": "09/03/2023", "email": "rqwereq", "hora": "werqwerqwe", "id": 40, "mas_info": "", "nombre": "pepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "eqweqwe", "hora": "qweqweqw", "id": 41, "mas_info": "", "nombre": "pepepepepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "wewqeqwe", "hora": "qweqweq", "id": 42, "mas_info": "", "nombre": "alfonso", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "", "hora": "qwqeqwe", "id": 43, "mas_info": "", "nombre": "qwerqwer", "personas": 0, "telefono": "" }]

const ReservaList = () => {
  const { reservas, poblarArray, loadingReservas, eliminarReserva } = useReservas();
  const { selectedDay, setSelectedDay } = useDateContext();
  const [reservasDia, setReservasDia] = useState<Reserva[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {

    poblarArray()

  }, [])

  // Formateamos los valores en el formato "dd/mm/yyyy"
  const selectedDayString: string = useMemo<string>((): string => {
    const day = selectedDay.getDate();
    const month = selectedDay.getMonth() + 1;
    const year = selectedDay.getFullYear();

    return formatearDia(day, month, year);

  }, [selectedDay])

  useEffect(() => {

    setReservasDia(reservas.filter((item) => item.dia === selectedDayString));
    console.log(reservasDia);

  }, [selectedDayString, reservas]);

  return (
    <View style={{ display: "flex", flex: 1, zIndex: -1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              poblarArray()
              setRefreshing(false);
            }} />
        }
      >
        {loadingReservas ? (
          <ActivityIndicator
            size="large"
            style={{
              marginBottom: 30,
              marginTop: 30,
            }}
          />
        ) : reservasDia.length !== 0 ? (
          <SafeAreaView>
            <FlatList
              style={styles.flatList}
              data={reservasDia}
              renderItem={({ item }) => <ReservaCard reserva={item} />}
              keyExtractor={item => String(item.id)}
            />
          </SafeAreaView>

        ) : <Text>NO HAY RESERVAS PARA ESTE DIA</Text>}
      </ScrollView>


    </View>

  )
}

const styles = StyleSheet.create({
  flatList: {
     marginBottom: 30,
  }
})

export default ReservaList;