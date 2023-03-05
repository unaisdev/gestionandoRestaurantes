import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, TextInput, } from 'react-native';

import { Text, View } from '../Themed';
import { useForm } from 'react-hook-form';
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
        <View>
            <HorizontalCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />
            <ReservaList selectedDate={selectedDate}/>
        </View>
    )
}

export default ReservasParaFecha;