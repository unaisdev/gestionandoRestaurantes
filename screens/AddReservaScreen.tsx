import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput,  } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AddReservaForm from '../components/features/AddReservaForm'  

const AddReservaScreen = () => {
    return (
        <View>
            <AddReservaForm />
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