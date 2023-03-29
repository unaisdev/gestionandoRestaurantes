/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName, Pressable, View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { Reserva, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { AntDesign } from '@expo/vector-icons';
import AddReserva from '../screens/AddEditReservaScreen';
import FloatingActionButton from '../components/FloatingActionButton';
import { createContext, useState } from 'react';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>

  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="AddReserva" component={AddReserva} options={{ title: 'Añadir o Editar Reserva' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    console.log("press");
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 8,
        },
        tabBarIconStyle: {
        },
        tabBarStyle: {
          position: "absolute",
          width: "70%",
          bottom: 10,
          left: 20,
          right: 20,
          borderWidth: 0.5,
          borderColor: Colors[colorScheme].borderColor,
          borderTopWidth: 0,
          backgroundColor: "white",
          borderRadius: 15,
          height: 60,
          shadowColor: Colors[colorScheme].borderColor,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
          shadowRadius: 6.5,
          elevation: 5,
        },
      }}
    >

      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Inicio',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <AntDesign
                name="setting"
                size={20}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          // headerLeft: () => (
          //   <View>
          //     <Text style={{ marginLeft: 10, fontSize: 8, textAlign: 'center' }}>GURE </Text>
          //     <Text style={{ marginLeft: 10, fontSize: 10, textAlign: 'center' }}>AMETSA</Text>
          //   </View>
          // ),

        })}
      />
      {/* <BottomTab.Screen
        name="AddReserva"
        component={AddReserva}
        options={({ navigation }: RootTabScreenProps<'AddReserva'>) => ({
          title: "",

          tabBarIcon: ({ color }) => <Ionicons name="ios-person-add-outline" size={24} color={color} />,
          tabBarButton: (props) => 
          <Pressable className="flex items-center justify-center" style={[styles.button, {
            backgroundColor: Colors[colorScheme].backgroundCalendar,
          }, pressed && styles.buttonPress]}
            onPress={() => navigation.navigate('AddReserva')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <AntDesign name="adduser" size={32} color="white" />
          </Pressable>,

        })

        }
      /> */}
      <BottomTab.Screen
        name="TabTwo"

        component={TabTwoScreen}
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
});