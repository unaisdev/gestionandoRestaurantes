import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Reserva, RootTabScreenProps } from '../types';
import axios from "axios"
import ReservaCard from '../components/ReservaCard';
import HorizontalCalendar from '../components/HorizontalCalendar';
import FloatingActionButton from '../components/FloatingActionButton';

function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState<Reserva[]>([]);

  const getReservas = async () => {
    try {
      const response = await axios.get('https://centrocivico-nextjs-ts.vercel.app/api/reservar', { params: { key: "holaquetalestamos" } });

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
    <View className='flex-1 mb-10'>
      <HorizontalCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <ReservaCard reserva={item} />}
        keyExtractor={item => item.id}
      />
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  
});


export default TabOneScreen;