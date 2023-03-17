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
import { ReservaInputsErrorValue, ReservaInputsValue } from "../context/types";
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
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

type Props = {
    reserva: Reserva;
    isEditing?: Boolean;
};

interface DateProps {
    onReservaChange: (reserva: ReservaInputsValue) => void;
    reserva: ReservaInputsValue;
}


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

    const initialErrorState = {
        nombre: "",
        telefono: "",
        personas: "",
        dia: "",
        hora: "",
        email: "",
        mas_info: "",
    }
    const [inputValues, setInputValues] =
        useState<ReservaInputsValue>(initialResState);
    const [errorValues, setErrorValues] =
        useState<ReservaInputsErrorValue>(initialErrorState);


    const validateForm = () => {
        let isValid = true;
        const errors: ReservaInputsErrorValue = {};

        const nombreRegExp = /^[A-Za-z\s]{2,}$/;
        if (!nombreRegExp.test(inputValues.nombre)) {
            errors.nombre = 'El nombre es demasiado corto.';
            isValid = false;
        }

        const telefonoRegExp = /^[0-9]{7,10}$/;
        if (!telefonoRegExp.test(inputValues.telefono)) {
            errors.telefono = 'El número de teléfono no es válido.';
            isValid = false;
        }

        const personasRegExp = /^[1-9][0-9]*$/;
        if (!personasRegExp.test(String(inputValues.personas))) {
            errors.personas = 'Nº pers';
            isValid = false;
        }

        const diaRegExp = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!diaRegExp.test(inputValues.dia)) {
            errors.dia = 'La fecha no es válida.';
            isValid = false;
        }

        const horaRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!horaRegExp.test(inputValues.hora)) {
            errors.hora = 'La hora no es válida.';
            isValid = false;
        }

        const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegExp.test(inputValues.email)) {
            errors.email = 'La dirección de correo electrónico no es válida.';
            isValid = false;
        }

        // No se proporciona una expresión regular para "mas_info".

        setErrorValues(errors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            if (isEditing) {
                console.log("PUT" + reserva);

                actualizarReserva({ ...inputValues, id: reserva.id, personas: Number.parseInt(String(inputValues.personas)) });
            } else {
                console.log("POST" + inputValues);

                guardarReserva(inputValues);
            }
            navigation.goBack();
        }

    };

    const handleUpdate = () => {
        if (validateForm()) {

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

        }

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
                initialValues={inputValues || reserva}>
                <View style={styles.container}>
                    {/* <Text>{JSON.stringify(inputValues, null, 4)}</Text> */}
                    <View className="flex flex-row justify-between">

                        <View className="flex flex-col w-9/12">
                            <View style={styles.input}>
                                <Entypo style={styles.icon} name="edit" size={18} color="black" />

                                <TextInput
                                    style={{ flex: 1 }}
                                    placeholder="Nombre*"
                                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                                    onChange={(event) => handleChange(event, "nombre")}
                                    value={inputValues.nombre}
                                />

                            </View>
                        </View>


                        <View className="flex flex-col w-2/12">
                            <View style={errorValues.personas ? styles.inputTextError : styles.input}>

                                <TextInput
                                    className="w-8/12"
                                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                                    onChange={(event) => handleChange(event, "personas")}
                                    value={String(inputValues.personas)}
                                    keyboardType="numeric"
                                />
                                <Ionicons style={styles.icon} name="person" size={16} color="black" />

                            </View>
                        </View>



                    </View>
                    <View className="flex flex-row justify-between">

                        <View className="flex flex-col w-9/12">
                            {errorValues.nombre ? <Text style={{ color: 'red' }} className="ml-2 mt-0.5">{errorValues.nombre}</Text> : null}

                        </View>

                        <View className="flex flex-col w-2/12">
                            {errorValues.personas ? <Text style={{ color: 'red' }} className="ml-2 mt-0.5">{errorValues.personas}</Text> : null}

                        </View>
                    </View>

                    <View className="flex flex-row justify-around p-8">
                        <DateSelector
                            reserva={inputValues}
                            onReservaChange={(reserva) => setInputValues(reserva)}
                        />
                        <TimeSelector
                            reserva={inputValues}
                            onReservaChange={(reserva) => setInputValues(reserva)}
                        />
                    </View>

                    <View className="flex flex-row justify-between py-2">
                        <View className="flex flex-col w-full">

                            <View style={styles.input}>
                                <Entypo style={styles.icon} name="email" size={18} color="black" />
                                <TextInput
                                    style={{ flex: 1 }}
                                    placeholder="Email*"
                                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                                    onChange={(event) => handleChange(event, "email")}
                                    value={inputValues.email}
                                />
                            </View>
                            {errorValues.email ? <Text style={{ color: 'red' }} className="ml-2 mt-0.5">{errorValues.email}</Text> : null}
                        </View>
                    </View>

                    <View className="flex flex-row justify-between py-2">
                        <View className="flex flex-col w-full">

                            <View style={styles.input}>
                                <Entypo style={styles.icon} name="phone" size={18} color="black" />

                                <TextInput
                                    style={{ flex: 1 }}
                                    placeholder="Telefono"
                                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                                    onChange={(event) => handleChange(event, "telefono")}
                                    value={inputValues.telefono}
                                />

                            </View>

                            {errorValues.telefono ? <Text style={{ color: 'red' }} className="ml-2 mt-0.5">{errorValues.telefono}</Text> : null}
                        </View>
                    </View>
                    <View className="flex flex-row justify-between py-2">
                        <View className="flex flex-col w-full">
                            <View style={styles.largeInput}>
                                <Entypo style={styles.icon} name="plus" size={18} color="black" />

                                <TextInput
                                    style={{ flex: 1 }}
                                    multiline={true}
                                    placeholder="Mas información"
                                    placeholderTextColor={Colors[colorScheme].inputPlaceHolders}
                                    onChange={(event) => handleChange(event, "mas_info")}
                                    value={inputValues.mas_info}
                                />

                            </View>


                            {errorValues.mas_info ? <Text style={{ color: 'red' }} className="ml-2 mt-0.5">{errorValues.mas_info}</Text> : null}
                        </View>
                    </View>

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
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    largeInput: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 100,
        borderRadius: 5,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    icon: {
        marginLeft: 5,
        marginRight: 15,
        color: 'grey',
    },
    container: {
        flex: 1,
        flexGrow: 1,
        flexShrink: 1,
        marginHorizontal: 10,
    },
    inputText: {
        flex: 1,
        height: 40,
        borderColor: "#222223",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    inputTextError: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'red',
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        position: "relative",
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
    }
});

export default AddReservaForm;
