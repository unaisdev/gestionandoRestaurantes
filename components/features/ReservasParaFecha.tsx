import { FlatList, Platform, StyleSheet, TextInput, } from 'react-native';

import { Text, View } from '../Themed';
import React, { useEffect, useState } from 'react';
import HorizontalCalendar from '../HorizontalCalendar';
import { Reserva } from '../../types';
import axios from 'axios';
import ReservaCard from '../ReservaCard';
import FloatingActionButton from '../FloatingActionButton';
import ReservaList from '../ReservaList';


const ReservasParaFecha = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <View className='flex-1'>
            <HorizontalCalendar />
            <ReservaList />
        </View>
    )
}

export default ReservasParaFecha;