import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { AsyncStorage, View } from "react-native";

// import { Container } from './styles';

const Preload = () => {
  const navigation = useNavigation();
  navigation.setOptions({
    headerShown: false,
  });

  useEffect(() => {
    async function getuser() {
      const user = await AsyncStorage.getItem("user");

      if (user !== null) {
        const pushAction = StackActions.replace("Home");
        navigation.dispatch(pushAction);
      } else {
        const pushAction = StackActions.replace("Login");
        navigation.dispatch(pushAction);
      }
    }
    getuser();
  }, []);

  return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
};

export default Preload;
