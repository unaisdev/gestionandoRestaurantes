/// <reference types="nativewind/types" />

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
import { Reserva } from '../types';
import { useReservasContext } from './context/ReservasContext';
import { useDateContext } from './context/DateContext';
import { compareFestivityDay, getDateMonth, getMonthNumber, translateWeekDay } from '../utils/date';
import Animated, { SlideInDown, SlideInRight, SlideInUp } from 'react-native-reanimated';


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


function HorizontalCalendar() {
    const colorScheme = useColorScheme();
    const { reservas } = useReservasContext();
    const { selectedDay, setSelectedDay } = useDateContext()

    const dates: Date[] = useMemo(() => {
        return generateHorizontalCalendarDates(30);
    }, []);

    const onDatePress = (date: Date) => {
        setSelectedDay(date);
    };

    const renderItem = ({ item, index }: { item: Date; index: number }) => {
        let isFestivity

        festivityArray.map((festivity) => {
            isFestivity = compareFestivityDay(festivity.date, item) ? true : false

        })

        const monthName = item.getMonth();
        const dayNumber = item.getDate();
        const dayString = translateWeekDay(getDayString(item));

        const isActive = isSameDay(selectedDay, item);

        return (
            <Animated.View
                entering={SlideInDown.duration(3000)}>

                <Pressable
                    onPress={() => onDatePress(item)}
                    style={[
                        styles.item,
                        isActive && {
                            backgroundColor: Colors[colorScheme].backgroundActiveDay
                        }]}>
                    <Text style={
                        isToday(item) ? styles.todayNumber :
                            [
                                styles.dateOutput,
                                {
                                    color: Colors[colorScheme].dayNumber
                                },
                                // dayString === "Lun" ? styles.freeDay : null,
                                // dayString === "Vie" ? styles.friday : null,
                                // dayString === "Sáb" ? styles.weekEnd : null,
                                // dayString === "Dom" ? styles.weekEnd : null,
                                isFestivity ? styles.festivity : null,
                                isActive && styles.activeText
                            ]}>
                        {dayNumber}
                    </Text>
                    <Text style={isToday(item) ? styles.todayText : [
                        styles.dayStyle,
                        {
                            color: Colors[colorScheme].dayString
                        },
                        // dayString === "Lun" ? styles.freeDay : null,
                        // dayString === "Vie" ? styles.friday : null,
                        // dayString === "Sáb" ? styles.weekEnd : null,
                        // dayString === "Dom" ? styles.weekEnd : null,
                        isFestivity ? styles.festivity : null,
                        isActive && styles.activeText
                    ]}>
                        {isToday(item) ? 'Hoy' : dayString}
                    </Text>
                </Pressable>
            </Animated.View>

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
                <Text className='px-3 text-xl uppercase'>{getDateMonth(selectedDay)}</Text>
                <Text className='px-1 text-xl'>{getMonthNumber(selectedDay)}</Text>
                <Text className='px-1 text-xl'>/</Text>
                <Text className='px-1 text-xl'>{selectedDay.getFullYear()}</Text>
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
                        marginTop: 5,
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
        fontSize: 18,
        fontWeight: '900',
    },
    dayStyle: {
        textTransform: 'lowercase',
    },
    activeText: {
    },
    item: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 14,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    todayNumber: {
        color: '#000',
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
        color: 'green'
    },
    festivity: {
        color: 'purple'
    }
});

export default HorizontalCalendar;