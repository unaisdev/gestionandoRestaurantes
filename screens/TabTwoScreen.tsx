import { Button, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ReservaInputsValue } from '../components/context/types';
import { Reserva } from '../types';
import { hourToString, dateToString, stringToDate, stringToHourDate } from '../utils/date';
import { useDateContext } from '../components/context/DateContext';

interface Props {
  onReservaChange: (reserva: ReservaInputsValue) => void;
  reserva: ReservaInputsValue;
}

const DateSelector = ({ reserva, onReservaChange }: Props) => {
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

const TimeSelector = ({ reserva, onReservaChange }: Props) => {
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

export default function TabTwoScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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

  const showDatePickerF = () => {
    setShowDatePicker(true);
  };

  const showTimePickerF = () => {
    setShowTimePicker(true);
  };

  const handleReservaChange = (reserva: ReservaInputsValue) => {
    setInputValues(reserva);
  };

  return (

    <View>
      <Text>{JSON.stringify(inputValues, null, 4)}</Text>
      <DateSelector reserva={inputValues} onReservaChange={handleReservaChange} />
      <TimeSelector reserva={inputValues} onReservaChange={handleReservaChange} />
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
