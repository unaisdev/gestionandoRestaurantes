import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';

const AddReserva = ({ navigation }: RootTabScreenProps<'AddReserva'>) => {
    const [text, setText] = useState('');

    return (
        <View className="flex flex-row h-screen items-center" >
            <View className="p-3">
                <Text className='basis-2/5'>Nombre: </Text>
                <TextInput
                className='basis-3/5'
                    style={{
                        height: 40,
                        borderBottomColor: "red"
                    }}
                    placeholder="Type here to translate!"
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                />
            </View>
            <View className=" ">
                <Text className='basis-2/5'>Nombre: </Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: "red"
                    }}
                    placeholder="Type here to translate!"
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                />
            </View>


            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
        </View>
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

export default AddReserva;