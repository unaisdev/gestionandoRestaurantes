import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, TextInput, } from 'react-native';

import { Text, View } from '../Themed';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import HorizontalCalendar from '../HorizontalCalendar';
import { Reserva } from '../../types';
import axios from 'axios';
import ReservaCard from '../ReservaCard';

const ReservasParaFecha = () => {
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
        <View>
            <HorizontalCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate} />
            <FlatList
                data={data}
                renderItem={({ item }) => <ReservaCard reserva={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ReservasParaFecha;