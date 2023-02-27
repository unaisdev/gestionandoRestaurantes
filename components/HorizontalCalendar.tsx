import React, { useMemo } from 'react';
import {
    FlatList,
    Dimensions,
    StyleSheet,
    Pressable,
} from 'react-native';

import { Text, View } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.12;
const ITEM_HEIGHT = 70;
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
        console.log(newDate.getFullYear())
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

export default function HorizontalCalendar({
    selectedDate,
    setSelectedDate,
}: Props) {
    const colorScheme = useColorScheme();


    const dates: Date[] = useMemo(() => {
        return generateHorizontalCalendarDates(10);
    }, []);

    const onDatePress = (date: Date) => {
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
                <Text style={[styles.dateOutput, isActive && styles.activeText]}>
                    {dayNumber}
                </Text>
                <Text style={[styles.dayStyle, isActive && styles.activeText]}>
                    {isToday(item) ? 'Hoy' : dayString}
                </Text>
            </Pressable>
        );
    };

    return (
        <View>
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
});
