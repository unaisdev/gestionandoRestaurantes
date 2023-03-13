import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Alert, GestureResponderEvent, Pressable, StyleSheet, } from "react-native";
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Reserva } from "../types";
import axios from 'axios';
import React from 'react';
import { useReservas } from './context/ReservasContext';
import { useNavigation } from '@react-navigation/native';


const ReservaCard = ({ reserva }: { reserva: Reserva }) => {
    const colorScheme = useColorScheme();
    const { reservas, eliminarReserva } = useReservas()
    const navigation = useNavigation();

    const wannaDelete = () =>
        Alert.alert(`${reserva.nombre}`, `¿estás seguro de querer eliminar la reserva?`, [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Eliminar',
                onPress: deleteReserva
            },
        ]);

    const deleteReserva = async () => {
        console.log("eliminar reserva: " + { reserva })
        eliminarReserva(reserva)
    }

    return (
        <View className="flex flex-row mx-4 items-center justify-between">
            <View className="basis-2/5">
                <Text style={styles.nombre} className="flex first-letter:uppercase text-center font-bold">{reserva.nombre}</Text>
                <Text style={styles.personas} className="flex text-center">{reserva.personas} pers.</Text>
            </View>

            <View className="basis-2/5">
                <Text style={styles.dia} className="flex text-center">{reserva.dia}</Text>
                <Text style={styles.hora} className="flex text-center">{reserva.hora}</Text>
            </View>

            <View className='flex flex-col justify-center'>
                <Pressable
                    className='p-3'
                    onPress={wannaDelete}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>

                    <FontAwesome name="remove" size={14} color={Colors[colorScheme].text} />
                </Pressable>
                <Pressable
                    className='p-3'
                    onPress={() => { navigation.navigate('AddReserva', { reserva }) }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <AntDesign name="edit" size={14} color={Colors[colorScheme].text} />
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },

    row: {

    },
    nombre: {
        fontSize: 16,
    },

    personas: {
        fontSize: 20,
    },

    dia: {

    },

    hora: {

    },

})

export default React.memo(ReservaCard)