import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, TouchableOpacity, } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import React, { useState } from "react";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { View } from "./Themed";

type Props = {
    
}

const FloatingActionButton = () => {
    const useScheme = useColorScheme();
    const [pressed, setPressed] = useState(false);

    const handlePressIn = () => {
        console.log("press");
        setPressed(true);
    };

    const handlePressOut = () => {
        setPressed(false);
    };

    return (
        <>
            <Pressable className="flex items-center justify-center" style={[styles.button, {
                backgroundColor: Colors[useScheme].backgroundCalendar,
            }, pressed && styles.buttonPress]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}>
                <AntDesign name="adduser" size={32} color="white" />
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 60,
        right: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },

    buttonPress: {
        opacity: 0.5,
    },
    // container: {
    //     position: 'relative',
    //     width: 75,
    //     alignItems: 'center'
    //   },
    //   background: {
    //     position: 'absolute',
    //     top: 0,
    //   },
    //   button: {
    //     top: -22.5,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: 50,
    //     height: 50,
    //     borderRadius: 27,
    //     backgroundColor: '#E94F37',
    //   },
    //   buttonIcon: {
    //     fontSize: 16,
    //     color: '#F6F7EB'
    //   }

});

export default FloatingActionButton;