import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, } from 'react-native';
import { Formik } from 'formik';

import { Text, View } from '../Themed';
import { useState } from 'react';

const AddReservaForm = () => {
    const handleSubmit = () => {
        console.log();
    }

    const handleChange = () => {

    }

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{
                email: "",
            }}>
            <TextInput
                value={values.email}></TextInput>


            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
        </Formik>
    )
}

export default AddReservaForm;