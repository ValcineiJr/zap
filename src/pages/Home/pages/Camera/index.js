import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

// import { Container } from './styles';

const Camera = () => {
  const navigation = useNavigation();

  navigation.setOptions({
    title: () => (
      <MaterialIcons name="camera-alt" size={30} color="rgba(255,255,255,.6)" />
    ),
  });
  return <View />;
};

export default Camera;
