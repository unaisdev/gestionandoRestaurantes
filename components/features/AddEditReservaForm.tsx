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
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDateContext } from '../context/DateContext';
import { dateToString, hourToString, stringToDate, stringToHourDate } from '../../utils/date';

type Props = {
    reserva: Reserva;
}

interface DateProps {
    onReservaChange: (reserva: ReservaInputsValue) => void;
    reserva: ReservaInputsValue;
}

const DateSelector = ({ reserva, onReservaChange }: DateProps) => {
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
        const currentDate = selectedDate || reserva.dia;
        setShow(Platform.OS === 'ios');
        onReservaChange({ ...reserva, dia: dateToString(currentDate) });
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === 'ios' ? (
                <>
                    <DateTimePicker
                        value={stringToDate(reserva.dia)}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                </>
            ) : (
                <>
                    <Button onPress={showDatePicker} title="Select Date" />

                    {show && (
                        <DateTimePicker
                            value={stringToDate(reserva.dia)}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </>
            )}

        </View>
    );
};

const TimeSelector = ({ reserva, onReservaChange }: DateProps) => {
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedTime: Date) => {
        const currentTime = selectedTime || reserva.hora;
        setShow(Platform.OS === 'ios');
        onReservaChange({ ...reserva, hora: hourToString(currentTime) });
    };

    const showTimePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === 'ios' ? (
                <>
                    <DateTimePicker
                        value={stringToHourDate(reserva.hora)}
                        mode="time"
                        display="default"
                        onChange={onChange}
                    />
                </>
            ) : (
                <>
                    <Button onPress={showTimePicker} title="Select Time" />

                    {show && (
                        <DateTimePicker
                            value={stringToHourDate(reserva.hora)}
                            mode="time"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </>
            )}



        </View>
    );
};

const AddReservaForm = ({ reserva }: Props) => {
    const [date, setDate] = useState(new Date());
    const { selectedDay } = useDateContext();

    const initialResState = {
        nombre: reserva.nombre || '',
        telefono: reserva.telefono || '',
        personas: reserva.personas || 0,
        dia: reserva.dia || dateToString(selectedDay),
        hora: reserva.hora || hourToString(new Date()),
        email: reserva.email || '',
        mas_info: reserva.mas_info || '',
    }

    const [inputValues, setInputValues] = useState<ReservaInputsValue>(initialResState);

    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { guardarReserva } = useReservas()

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

    const handleReservaDateChange = (reserva: ReservaInputsValue) => {
        setInputValues(reserva);
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={inputValues || reserva}>
            <View>
                <Text>{JSON.stringify(inputValues, null, 4)}</Text>
                <TextInput
                    nativeID='name'
                    style={styles.inputText}
                    placeholder='Nombre*'
                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                    onChange={(event) => handleChange(event, 'nombre')}
                    value={inputValues.nombre} />

                <View className='flex flex-row justify-around p-3'>

                    <DateSelector reserva={inputValues} onReservaChange={handleReservaDateChange} />
                    <TimeSelector reserva={inputValues} onReservaChange={handleReservaDateChange} />

                </View>

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