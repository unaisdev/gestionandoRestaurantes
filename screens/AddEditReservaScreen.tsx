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
    const isEditing = params && 'isEditing' in params ? (params.isEditing as Boolean) : undefined;

    // const isEditing = params && 'isEditing' in params
    // const reserva: Reserva = route.params;

    return (
        <View className='flex-auto'>
            <AddReservaForm reserva={reserva} isEditing={isEditing} />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default AddReservaScreen;