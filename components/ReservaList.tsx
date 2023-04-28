import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext, useReservasContext } from "./context/ReservasContext";
import { useDateContext } from "./context/DateContext";
import { formatearDia } from "../utils/date";
import Animated, { FadeIn } from "react-native-reanimated";

// const initial: Reserva[] = [{ "dia": "09/03/2023", "email": "rqwereq", "hora": "werqwerqwe", "id": 40, "mas_info": "", "nombre": "pepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "eqweqwe", "hora": "qweqweqw", "id": 41, "mas_info": "", "nombre": "pepepepepep", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "wewqeqwe", "hora": "qweqweq", "id": 42, "mas_info": "", "nombre": "alfonso", "personas": 0, "telefono": "" }, { "dia": "09/03/2023", "email": "", "hora": "qwqeqwe", "id": 43, "mas_info": "", "nombre": "qwerqwer", "personas": 0, "telefono": "" }]

const ReservaList = () => {
  const { reservas, poblarArray, loadingReservas, eliminarReserva } = useReservasContext();
  const { selectedDay, setSelectedDay } = useDateContext();
  const [reservasDia, setReservasDia] = useState<Reserva[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {

    poblarArray()

  }, [])

  // Formateamos los valores "dd/mm/yyyy"
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
    <View style={{ display: "flex", flex: 1, flexGrow: 1, zIndex: -1, backgroundColor: 'white' }}>
      {loadingReservas ? (
        <ActivityIndicator
          size="large"
          style={{
            marginBottom: 30,
            marginTop: 30,
          }}
        />
      ) : reservasDia.length !== 0 ? (
        <SafeAreaView
          style={{
            flex: 1,
          }}>

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  poblarArray()
                  setRefreshing(false);
                }} />
            }
            style={styles.flatList}
            data={reservasDia}
            renderItem={({ item }) => <ReservaCard reserva={item} />}
            keyExtractor={item => String(item.id)}
          />

        </SafeAreaView>

      ) : <ScrollView
        style={{ flex: 1 }}
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
        <Animated.View
          style={styles.card}
          entering={FadeIn.duration(2000)}>

          <Text>NO HAY RESERVAS PARA ESTE DIA</Text>
        </Animated.View>

      </ScrollView>}


    </View>

  )
}

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 1,
    marginBottom: 30,
  },
  card: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 10,
      height: 14,
    },
    shadowRadius: 30,
    color: '#253b56',
    margin: 12,
    padding: 20,
  }
})

export default ReservaList;