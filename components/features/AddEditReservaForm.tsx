import { StatusBar } from "expo-status-bar";
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    TouchableWithoutFeedback,
} from "react-native";
import { Formik, setIn } from "formik";

import { Text, View } from "../Themed";
import { useState, useContext, useId } from "react";
import { Reserva, RootTabScreenProps } from "../../types";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { ReservasContext, useReservas } from "../context/ReservasContext";
import { ReservaInputsValue } from "../context/types";
import DateTimePicker, {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useDateContext } from "../context/DateContext";
import {
    dateToString,
    hourToString,
    stringToDate,
    stringToHourDate,
} from "../../utils/date";
import { object, string, number, date, InferType } from 'yup';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
    reserva: Reserva;
    isEditing?: Boolean;
};

interface DateProps {
    onReservaChange: (reserva: ReservaInputsValue) => void;
    reserva: ReservaInputsValue;
}

let reservaSchema = object({
    nombre: string().max(1).required(),
    telefono: number().notRequired().positive().integer(),
    email: string().email().required(),
    personas: number().required(),
    dia: date().default(() => new Date()),
    hora: date().default(() => new Date()),
    mas_info: string().notRequired(),
});

const DateSelector = ({ reserva, onReservaChange }: DateProps) => {
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        let currentDate;
        selectedDate === undefined
            ? (currentDate = stringToDate(reserva.dia))
            : (currentDate = selectedDate);

        setShow(Platform.OS === "ios");
        onReservaChange({ ...reserva, dia: dateToString(currentDate) });
    };

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "ios" ? (
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
                    <Button onPress={showDatePicker} title={`${reserva.dia}`} />

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

    const onChange = (
        event: DateTimePickerEvent,
        selectedTime: Date | undefined
    ) => {
        let currentTime;
        if (selectedTime === undefined) currentTime = stringToDate(reserva.hora);
        else currentTime = selectedTime;
        setShow(Platform.OS === "ios");
        onReservaChange({ ...reserva, hora: hourToString(currentTime) });
    };

    const showTimePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "ios" ? (
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
                    <Button onPress={showTimePicker} title={`${reserva.hora}`} />

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

const AddReservaForm = ({ reserva, isEditing }: Props) => {
    const [date, setDate] = useState(new Date());
    const { selectedDay } = useDateContext();

    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { guardarReserva, actualizarReserva } = useReservas();

    const initialResState = isEditing ? reserva : {
        nombre: "",
        telefono: "",
        personas: 0,
        dia: dateToString(selectedDay),
        hora: hourToString(new Date()),
        email: "",
        mas_info: "",
    };

    const [inputValues, setInputValues] =
        useState<ReservaInputsValue>(initialResState);

    const handleSubmit = async () => {
        if (isEditing) {
            console.log("PUT" + reserva);

            actualizarReserva({ ...inputValues, id: reserva.id, personas: Number.parseInt(String(inputValues.personas)) });
        } else {
            console.log("POST" + inputValues);

            guardarReserva(inputValues);
        }
        navigation.goBack();

    };

    const handleUpdate = () => {
        setInputValues({
            ...inputValues,
            nombre: reserva.nombre,
            telefono: reserva.telefono,
            personas: reserva.personas,
            dia: reserva.dia,
            hora: reserva.hora,
            email: reserva.email,
            mas_info: reserva.mas_info,
        });

        handleSubmit();
    };

    const handleChange = (
        event: NativeSyntheticEvent<TextInputChangeEventData>,
        fieldName: keyof Reserva
    ) => {
        const { text } = event.nativeEvent;
        if (fieldName === "personas") {
            setInputValues((prevInputValues: ReservaInputsValue) => ({
                ...prevInputValues,
                [fieldName]: Number.parseInt(text),
            }));
        }
        setInputValues((prevInputValues: ReservaInputsValue) => ({
            ...prevInputValues,
            [fieldName]: text,
        }));
    };

    return (

        <KeyboardAwareScrollView
            extraScrollHeight={40}
            enableAutomaticScroll={true}
            viewIsInsideTabBar={false}
        >
            <Formik
                onSubmit={handleSubmit}
                initialValues={inputValues || reserva}
                validationSchema={reservaSchema}>
                <View style={styles.container}>
                    <Text>{JSON.stringify(inputValues, null, 4)}</Text>
                    <View className="flex flex-row justify-between">
                        <TextInput

                            className="w-9/12"
                            style={styles.inputText}
                            placeholder="Nombre*"
                            placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                            onChange={(event) => handleChange(event, "nombre")}
                            value={inputValues.nombre}
                        />

                        <TextInput
                            className="w-2/12"
                            style={styles.inputText}
                            placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                            onChange={(event) => handleChange(event, "personas")}
                            value={String(inputValues.personas)}
                            keyboardType="numeric"
                        />

                    </View>


                    <View className="flex flex-row justify-around p-3">
                        <DateSelector
                            reserva={inputValues}
                            onReservaChange={(reserva) => setInputValues(reserva)}
                        />
                        <TimeSelector
                            reserva={inputValues}
                            onReservaChange={(reserva) => setInputValues(reserva)}
                        />
                    </View>

                    <TextInput
                        className="my-2"
                        style={styles.inputText}
                        placeholder="Email*"
                        placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                        onChange={(event) => handleChange(event, "email")}
                        value={inputValues.email}
                    />

                    <TextInput
                        className="my-2"

                        style={styles.inputText}
                        placeholder="Telefono"
                        placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                        onChange={(event) => handleChange(event, "telefono")}
                        value={inputValues.telefono}
                    />

                    <TextInput
                        className="my-2"

                        style={styles.inputText}
                        placeholder="Mas información"
                        placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                        onChange={(event) => handleChange(event, "mas_info")}
                        value={inputValues.mas_info}
                    />

                    <View style={styles.button}>
                        <Button
                            onPress={isEditing ? handleUpdate : handleSubmit}
                            title={isEditing ? "Actualizar reserva" : "Agregar reserva"}
                        />
                    </View>

                </View>

            </Formik>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'red',
        marginHorizontal: 10,
    },
    inputText: {
        height: 40,
        borderColor: "#222223",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        position: "relative",
        width: '50%',
        bottom: 0,
        left: 0,
        right: 0,
    }
});

export default AddReservaForm;
