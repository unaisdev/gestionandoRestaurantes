import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, } from "react-native";
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Reserva } from "../types";


const ReservaCard = ({ reserva }: { reserva: Reserva }) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.card} className="flex-1 flex flex-row items-center justify-between p-3 m-1 rounded-lg shadow-sm shadow-slate-600 border-gray-600">
            <View className="basis-2/5 justify-center">
                <Text style={styles.nombre} className="flex first-letter:uppercase text-center font-bold">{reserva.nombre}</Text>
                <Text style={styles.personas} className="flex text-center">{reserva.personas} pers.</Text>
            </View>


            <View className="basis-2/5 justify-center">
                <Text style={styles.dia} className="flex text-center">{reserva.dia}</Text>
                <Text style={styles.hora} className="flex text-center">{reserva.hora}</Text>
            </View>

            <View className='flex flex-col justify-center'>
                <Pressable
                    className='p-3'
                    onPress={() => { console.log("edit pressed") }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>

                    <FontAwesome name="remove" size={14} color={Colors[colorScheme].text} />
                </Pressable>
                <Pressable
                    className='p-3'
                    onPress={() => { console.log("pressed") }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <AntDesign name="edit" size={14} color={Colors[colorScheme].text} />
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    nombre: {
        fontSize: 16,
    },

    personas: {
        fontSize: 20,
    },

    dia: {

    },

    hora: {

    },

    card: {

    }
})

export default ReservaCard;