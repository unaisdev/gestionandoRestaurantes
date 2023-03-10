import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Reserva, RootTabScreenProps } from '../types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AddReservaForm from '../components/features/AddEditReservaForm'
import { useRoute } from '@react-navigation/native';

const AddReservaScreen = () => {
    const route = useRoute();
    const params = route.params;

    // Si params es undefined, utilizamos una reserva vacía como valor predeterminado.
    const reserva: Reserva = params && 'reserva' in params ? (params.reserva as Reserva) : {
        id: '',
        nombre: '',
        dia: '',
        hora: '',
        telefono: '',
        email: '',
        mas_info: '',
        personas: 0,
    };
    // const reserva: Reserva = route.params;

    return (
        <View>
            <AddReservaForm reserva={reserva} />
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
});

export default AddReservaScreen;