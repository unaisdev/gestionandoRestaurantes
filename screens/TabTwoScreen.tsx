import { Button, Platform, StyleSheet, Text, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import React, { useState } from 'react';
import { ReservaInputsValue } from '../components/context/types';
import { Reserva } from '../types';
import { hourToString, dateToString, stringToDate, stringToHourDate } from '../utils/date';
import { useDateContext } from '../components/context/DateContext';

export default function TabTwoScreen() {

  const { selectedDay } = useDateContext();

  const initialResState = {
    nombre: '',
    telefono: '',
    personas: 0,
    dia: dateToString(selectedDay),
    hora: hourToString(new Date()),
    email: '',
    mas_info: '',
  }

  const [inputValues, setInputValues] = useState<ReservaInputsValue>(initialResState);

  const handleReservaChange = (reserva: ReservaInputsValue) => {
    setInputValues(reserva);
  };

  return (

    <View>
      {/* <Text>{JSON.stringify(inputValues, null, 4)}</Text> */}
    </View>
    // <View>
    //   <Text>{JSON.stringify(inputValues, null, 4)}</Text>
    //   {Platform.OS === 'ios' ? (
    //     <>
    //       <DateTimePicker
    //         value={stringToDate(inputValues.dia)}
    //         mode='date' // Mostrar selector de fecha/hora como spinner en Android
    //         display="default"
    //         onChange={(event) => handleDateTimeChange(event, 'dia')}
    //       />
    //       <DateTimePicker
    //         value={stringToHourDate(inputValues.hora)}
    //         mode='time' // Mostrar selector de fecha/hora como spinner en Android
    //         display="default"
    //         onChange={(event) => handleDateTimeChange(event, 'hora')}
    //       />
    //     </>

    //   ) : (
    //     <>
    //       <Button onPress={showDatePickerF} title="Open Date Picker" />
    //       <Button onPress={showTimePickerF} title="Open Time Picker" />

    //       {showDatePicker && (
    //         <>
    //           <DateTimePicker
    //             value={stringToHourDate(inputValues.dia)}
    //             mode='date' // Mostrar selector de fecha/hora como spinner en Android
    //             display="default"
    //             onChange={(event) => handleDateTimeChange(event, 'dia')}
    //           />
    //           <DateTimePicker
    //             value={stringToHourDate(inputValues.hora)}
    //             mode='time' // Mostrar selector de fecha/hora como spinner en Android
    //             display="default"
    //             onChange={(event) => handleDateTimeChange(event, 'hora')}
    //           />
    //         </>
    //       )}
    //     </>
    //   )}

    // </View >
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
