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
import { compareFestivityDay, getDateMonth, getMonthNumber, translateWeekDay } from '../utils/date';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.12;
const ITEM_HEIGHT = 60;
const ITEM_OFFSET = ITEM_WIDTH + 18;

interface Festivity {
    date: Date;
    name: string;
    isHoliday: boolean;
    city?: string;
}

interface Props {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

const festivityArray: Festivity[] = [
    {
        date: new Date(2023, 2, 30),
        name: 'Epifanía del Señor',
        isHoliday: true,
    },
    {
        date: new Date(2023, 3, 2),
        name: 'aaa',
        isHoliday: true,
    },
]

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

    const renderItem = ({ item, index }: { item: Date; index: number }) => {
        let isFestivity

        festivityArray.map((festivity) => {
            isFestivity = compareFestivityDay(festivity.date, item) ? true : false
            
        })

        const monthName = item.getMonth();
        const dayNumber = item.getDate();
        const dayString = translateWeekDay(getDayString(item));

        const isActive = isSameDay(selectedDate, item);

        return (
            <Pressable
                onPress={() => onDatePress(item)}
                style={[
                    styles.item,
                    isActive && {
                        backgroundColor: Colors[colorScheme].backgroundDay
                    }]}>
                <Text style={isToday(item) ? styles.todayNumber : [
                    styles.dateOutput,
                    dayString === "Lun" ? styles.freeDay : null,
                    dayString === "Vie" ? styles.friday : null,
                    dayString === "Sáb" ? styles.weekEnd : null,
                    dayString === "Dom" ? styles.weekEnd : null,
                    isFestivity ? styles.festivity : null,
                    isActive && styles.activeText
                ]}>
                    {dayNumber}
                </Text>
                <Text style={isToday(item) ? styles.todayText : [
                    styles.dayStyle,
                    dayString === "Lun" ? styles.freeDay : null,
                    dayString === "Vie" ? styles.friday : null,
                    dayString === "Sáb" ? styles.weekEnd : null,
                    dayString === "Dom" ? styles.weekEnd : null,
                    isFestivity ? styles.festivity : null,
                    isActive && styles.activeText
                ]}>
                    {isToday(item) ? 'Hoy' : dayString}
                </Text>
            </Pressable>
        );
    };



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
                <Text className='px-3'>{getDateMonth(selectedDate)}</Text>
                <Text className='px-1'>{getMonthNumber(selectedDate)}</Text>
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
    },
    weekEnd: {
        color: 'brown'
    },
    friday: {
        color: 'orange'
    },
    freeDay: {
        color: 'grey'
    },
    festivity: {
        color: 'purple'
    }
});

export default HorizontalCalendar;