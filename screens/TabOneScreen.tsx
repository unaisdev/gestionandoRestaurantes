import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Reserva, RootTabScreenProps } from '../types';
import axios from "axios"


const ReservaCard = ({ reserva }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Text>{reserva.nombre}</Text>
      <Text>{reserva.personas}</Text>
    </View>
    <View style={styles.row}>
      <Text>{reserva.dia}</Text>
      <Text>{reserva.hora}</Text>
    </View>
  </View>
);

function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = useState<Reserva[]>([]);

  const getReservas = async () => {
    try {
      const response = await axios.get('http://192.168.1.133:3000/api/reservar');

      const array = await response.data;
      setData(array);
      console.log(array);

    } catch (error) {
      console.error(error);
    } finally {

    }
  };

  useEffect(() => {
    getReservas();
  }, []);

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ .tsx" />
      <FlatList
          data={data}
          renderItem={({ item }) => <ReservaCard reserva={item} />}
          keyExtractor={item => item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  card: {
    flex: 1,
    width: 100,
    padding: 5,
    margin: 5,
    backgroundColor: "red",
    borderColor: "black",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",

  },

  row: {

  }
});


export default TabOneScreen;