import React, { useEffect, useMemo } from 'react';
import {
    FlatList,
    Dimensions,
    StyleSheet,
    Pressable,
} from 'react-native';

import { Text, View } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import axios from 'axios';
import { Reserva } from '../types';
import { useReservas } from './context/ReservasContext';
import { useDateContext } from './context/DateContext';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.12;
const ITEM_HEIGHT = 60;
const ITEM_OFFSET = ITEM_WIDTH + 18;
interface Props {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

function dateSubtractDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getDayString(date: Date): string {
    return date.toString().split(' ')[0];
}

function isSameDay(date1: Date, date2: Date): boolean {
    if (date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate()) {
        return true;

    }
    return false;
}

function isToday(date: Date): boolean {
    const newDate = new Date()
    if (newDate.getFullYear() == date.getFullYear() &&
        newDate.getMonth() == date.getMonth() &&
        newDate.getDate() == date.getDate()) {
        return new Date().getDate() == date.getDate();
    }

    return false;
}

function generateHorizontalCalendarDates(days: number): Date[] {
    const today = new Date();
    let result = [];
    for (let i = 0; i < days; i++) {
        result[i] = dateSubtractDays(today, i);
    }

    return result;
}


function HorizontalCalendar({ selectedDate, setSelectedDate }: Props) {
    const colorScheme = useColorScheme();
    const { reservas } = useReservas();
    const { selectedDay, setSelectedDay } = useDateContext()

    const dates: Date[] = useMemo(() => {
        return generateHorizontalCalendarDates(30);
    }, []);

    const onDatePress = (date: Date) => {
        setSelectedDay(date);
        setSelectedDate(date);
    };

    const translateDate = (str: string) => {
        switch (str) {
            case "Mon":
                return "Lun";
            case "Tue":
                return "Mar";
            case "Wed":
                return "Mier";
            case "Thu":
                return "Jue";
            case "Fri":
                return "Vie";
            case "Sat":
                return "Sáb";
            case "Sun":
                return "Dom";
        }
    }

    const renderItem = ({ item, index }: { item: Date; index: number }) => {
        const monthName = item.getMonth();
        const dayNumber = item.getDate();
        const dayString = translateDate(getDayString(item));

        const isActive = isSameDay(selectedDate, item);

        return (
            <Pressable
                onPress={() => onDatePress(item)}
                style={[styles.item, isActive && { backgroundColor: Colors[colorScheme].backgroundDay }]}>
                <Text style={isToday(item) ? styles.todayNumber : [styles.dateOutput, isActive && styles.activeText]}>
                    {dayNumber}
                </Text>
                <Text style={isToday(item) ? styles.todayText : [styles.dayStyle, isActive && styles.activeText]}>
                    {isToday(item) ? 'Hoy' : dayString}
                </Text>
            </Pressable>
        );
    };

    const getDateMonth = () => {
        const month = new Intl.DateTimeFormat('es', { month: 'long' }).format(selectedDate)

        return month.charAt(0).toUpperCase() + month.slice(1);
    }

    const getMonthNumber = () => {
        const options: Intl.DateTimeFormatOptions = { month: '2-digit' };
        const mesConCero = selectedDate.toLocaleString('es', options);
        return mesConCero; // "03"
    }



    // const NumReservas = () => {
    //     return (
    //         <View>
    //             <Text
    //                 style={{
    //                     paddingTop: 5,
    //                     paddingHorizontal: 10
    //                 }}>Nº de Reservas: {reservas.length}</Text>
    //         </View>
    //     )
    // }

    const CalendarioTop = () => {
        return (
            <View
                className='flex flex-row justify-evenly px-6'
                style={{
                    backgroundColor: Colors[colorScheme].backgroundCalendar,
                }}>

                <FechaCalendario />
            </View>
        )
    }

    const FechaCalendario = () => {
        return (
            <View
                className='flex flex-row px-6 pt-2'
                style={{
                    backgroundColor: Colors[colorScheme].backgroundCalendar,
                }}>
                <Text className='px-3'>{getDateMonth()}</Text>
                <Text className='px-1'>{getMonthNumber()}</Text>
                <Text className='px-1'>/</Text>
                <Text className='px-1'>{selectedDate.getFullYear()}</Text>
            </View>

        )
    }

    return (
        <View>
            <CalendarioTop />
            <FlatList
                style={{ backgroundColor: Colors[colorScheme].backgroundCalendar }}
                data={dates}
                renderItem={renderItem}
                keyExtractor={(item) => item.toDateString()}
                horizontal={true}
                contentContainerStyle={[
                    {
                        marginHorizontal: 10,
                        marginVertical: 5,
                    },
                ]}
                showsHorizontalScrollIndicator={false}
                getItemLayout={(_, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_OFFSET * index,
                    index,
                })}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    dateOutput: {
        color: '#BDF0CC',
        fontSize: 18,
        fontWeight: '900',
    },
    dayStyle: {
        color: '#BDF0CC',
        textTransform: 'lowercase',
    },
    activeText: {
        color: '#033F40',
    },
    item: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    todayNumber: {
        fontWeight: '500',
        fontSize: 20
    },
    todayText: {
        fontWeight: '500',
        fontStyle: 'italic',
        fontSize: 18
    }
});

export default HorizontalCalendar;