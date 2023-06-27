import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";
import Chat from "./pages/Chat";
import Contatos from "./pages/Contatos";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Login2 from "./pages/Login2";
import Preload from "./pages/Preload";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#054C44" />
      <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
          headerStyle: { backgroundColor: "#075E55", elevation: 0 },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Login2" component={Login2} />
        <Stack.Screen
          name="Home"
          options={{
            title: "Whatsapp",
            headerStyle: {
              backgroundColor: "#075E55",
              elevation: 0,
              height: 50,
            },
          }}
          component={Home}
        />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Contatos" component={Contatos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
