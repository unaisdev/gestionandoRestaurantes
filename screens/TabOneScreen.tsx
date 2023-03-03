import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Reserva, RootTabScreenProps } from '../types';
import axios from "axios"
import ReservaCard from '../components/ReservaCard';
import HorizontalCalendar from '../components/HorizontalCalendar';
import FloatingActionButton from '../components/FloatingActionButton';
import ReservasParaFecha from '../components/features/ReservasParaFecha';

function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  return (
    <View className='flex-1 mb-10'>
      <ReservasParaFecha />
    </View>
  );
  
}

const styles = StyleSheet.create({
  
});


export default TabOneScreen;