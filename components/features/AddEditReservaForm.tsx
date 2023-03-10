import { StatusBar } from 'expo-status-bar';
import { Button, NativeSyntheticEvent, Platform, StyleSheet, TextInput, TextInputChangeEventData, } from 'react-native';
import { Formik, setIn } from 'formik';

import { Text, View } from '../Themed';
import { useState, useContext, useId } from 'react';
import { Reserva, RootTabScreenProps } from '../../types';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ReservasContext, useReservas } from '../context/ReservasContext';
import { ReservaInputsValue } from '../context/types';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

type Props = {
    reserva: Reserva;
}

const AddReservaForm = ({ reserva }: Props) => {
    const initialResState = {
        nombre: reserva.nombre || '',
        telefono: reserva.telefono || '',
        personas: reserva.personas || 0,
        dia: reserva.dia || '',
        hora: reserva.hora || '',
        email: reserva.email || '',
        mas_info: reserva.mas_info || '',
    }

    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { guardarReserva } = useReservas()

    const [inputValues, setInputValues] = useState<ReservaInputsValue>(initialResState);
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);

    };

    const handleSubmit = async () => {
        console.log("POST" + inputValues);

        guardarReserva(inputValues);
        navigation.goBack();
    }

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>, fieldName: keyof Reserva) => {
        const { text } = event.nativeEvent;
        setInputValues((prevInputValues: ReservaInputsValue) => ({
            ...prevInputValues,
            [fieldName]: text,
        }));
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={inputValues || reserva}>
            <View>
                <TextInput
                    nativeID='name'
                    style={styles.inputText}
                    placeholder='Nombre*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'nombre')}
                    value={inputValues.nombre} />

                <View className='flex flex-row justify-around p-3'>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        onChange={onChange}
                    />

                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='time'
                        is24Hour={true}
                        onChange={onChange}
                    />
                </View>
                <TextInput
                    style={styles.inputText}
                    placeholder='12/03/2023*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'dia')}
                    value={inputValues.dia} />


                <TextInput
                    style={styles.inputText}
                    placeholder='Email*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'email')}
                    value={inputValues.email} />


                <TextInput
                    style={styles.inputText}
                    placeholder='Telefono'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'telefono')}
                    value={inputValues.telefono} />

                <TextInput
                    style={styles.inputText}
                    placeholder='Mas información'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'mas_info')}
                    value={inputValues.mas_info} />

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