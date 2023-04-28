import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Alert, GestureResponderEvent, Pressable, StyleSheet, View, Text } from "react-native";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Reserva } from "../types";
import React, { useEffect } from 'react';
import { useReservasContext } from './context/ReservasContext';
import { useNavigation } from '@react-navigation/native';
import Animated, { RollInLeft, SlideInDown, SlideInLeft, SlideInRight, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const ReservaCard = ({ reserva }: { reserva: Reserva }) => {
    const colorScheme = useColorScheme();
    const { reservas, eliminarReserva } = useReservasContext()
    const navigation = useNavigation();

    const opacity = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, { duration: 500 }),
        };
    });

    useEffect(() => {
        opacity.value = 1;
    }, [opacity]);

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
        <>
            <Animated.View
                style={[animatedStyle]}
                entering={SlideInLeft.duration(1000)}>

                <Pressable
                    className="flex flex-row mx-2 my-2 px-6 items-center justify-between"
                    style={styles.card}
                    onPress={() => {
                        const isEditing = true
                        navigation.navigate('AddReserva', { reserva, isEditing })
                    }}>

                    <View className="basis-2/5">
                        <Text style={styles.nombre} className="flex first-letter:uppercase text-center font-bold">{reserva.nombre}</Text>
                        <Text style={styles.personas} className="flex text-center">{reserva.personas} pers.</Text>
                    </View>

                    <View className="basis-2/5">
                        <Text style={styles.dia} className="flex text-center">{reserva.dia}</Text>
                        <Text style={styles.hora} className="flex text-center">{reserva.hora}</Text>
                    </View>

                    <Pressable
                        className='p-1 mb-4 bg-red-500'
                        onPress={wannaDelete}
                        style={[styles.eliminarButton]}>
                        <FontAwesome name="remove" size={12} color={Colors[colorScheme].text} />
                    </Pressable>
                </Pressable>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    card: {
        borderRadius: 20,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: 'LavenderBlush',
        padding: 10,
    },
    eliminarButton: {
        borderRadius: 10,
    },
    row: {

    },
    nombre: {
        fontSize: 16,
    },

    personas: {
        fontSize: 14,
    },

    dia: {

    },

    hora: {

    },

})

export default React.memo(ReservaCard)