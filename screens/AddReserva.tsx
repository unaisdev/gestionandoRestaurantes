import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput,  } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
  }
  

const AddReserva = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => console.log(data);
  

    const [nombre, setNombre] = useState('');
    const [personas, setPersonas] = useState('');
    const [dia, setDia] = useState('');
    const [hora, setHora] = useState('');

    return (
        <View className="flex flex-1 items-center bg-gray-600" >

            <View className="flex flex-row items-center p-3">
                <Text className='basis-2/5 text-center text-lg'>NOMBRE: </Text>
                <TextInput
                    className='flex basis-3/5 justify-center'
                    style={{
                        height: 40,
                        color: "red",
                        borderEndColor: "black",
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,

                    }}
                    placeholder="Type here to translate!"
                    onChangeText={newText => setNombre(newText)}
                    defaultValue={nombre}
                />
            </View>
            <View className="flex flex-row items-center w-full m-4">
                <Text className='basis-2/5 text-center text-lg'>PERSONAS: </Text>
                <TextInput
                    className='flex basis-3/5 justify-center'
                    style={{
                        height: 40,
                        color: "red",
                        borderEndColor: "black",
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,

                    }}
                    placeholder="Type here to translate!"
                    onChangeText={newText => setPersonas(newText)}
                    defaultValue={personas}
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