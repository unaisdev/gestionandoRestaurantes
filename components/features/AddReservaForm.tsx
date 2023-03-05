import { StatusBar } from 'expo-status-bar';
import { Button, NativeSyntheticEvent, Platform, StyleSheet, TextInput, TextInputChangeEventData, } from 'react-native';
import { Formik, setIn } from 'formik';

import { Text, View } from '../Themed';
import { useState, useContext } from 'react';
import { Reserva, RootTabScreenProps } from '../../types';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ReservasContext } from '../../navigation';

interface ReservaState {
    nombre: string,
    telefono: string,
    personas: number,
    dia: string,
    hora: string,
    email: string,
    mas_info: string,
}

const initialResState = {
    nombre: '',
    telefono: '',
    personas: 0,
    dia: '',
    hora: '',
    email: '',
    mas_info: '',
}

const AddReservaForm = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { res, addReserva } = useContext(ReservasContext);
    const [data, setData] = useState<Reserva[]>([]);

    const [inputValues, setInputValues] = useState<Reserva>(initialResState);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputValues),
            });
            const data = await response.json();

            console.log(JSON.stringify(inputValues));
            setData(data);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, fieldName: keyof Reserva) => {
        const { text } = event.nativeEvent;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [fieldName]: text,
        }));
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={inputValues}>
            <View>
                <TextInput
                    nativeID='name'
                    style={styles.inputText}
                    placeholder='Nombre*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'nombre')}
                    value={inputValues.nombre} />

                <TextInput
                    style={styles.inputText}
                    placeholder='Dia*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'dia')}
                    value={inputValues.dia} />

                <TextInput
                    style={styles.inputText}
                    placeholder='Hora*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'hora')}
                    value={inputValues.hora} />

                <TextInput
                    style={styles.inputText}
                    placeholder='Email*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'email')}
                    value={inputValues.email} />

                <Button onPress={handleSubmit} title="Añadir Reserva" />
            </View>




        </Formik>

    )
}

const styles = StyleSheet.create({
    inputText: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    }
})

export default AddReservaForm;