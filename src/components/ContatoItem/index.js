import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

// import { Container } from './styles';

const ContatoItem = ({ data }) => {
  const DynamicImage = () => {
    if (data.tipo == "newGroup") {
      return (
        <View style={styles.icon}>
          <MaterialIcons name="group" color="#fff" size={22} />
        </View>
      );
    }
    if (data.tipo == "newContact") {
      return (
        <View style={styles.icon}>
          <MaterialIcons name="person-add" color="#fff" size={22} />
        </View>
      );
    }
    if (data.tipo == "contato") {
      return (
        <Image
          style={{ width: 40, height: 40, borderRadius: 50 }}
          source={{ uri: "https://placekitten.com/640/360" }}
        />
      );
    }
  };

  const navigation = useNavigation();

  const navigateTo = async () => {
    if (data.tipo === "newGroup") {
      alert("Criar Grupo");
    } else if (data.tipo === "newContact") {
      alert("Criar Contato");
    } else {
      navigation.navigate("Chat", { data });
    }
  };

  return (
    <TouchableNativeFeedback onPress={navigateTo}>
      <View style={styles.container}>
        <View>
          <DynamicImage />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.nome}>
            {data.name === "" ? data.cellNumber : data.name}
          </Text>
          {data.bio !== "" && <Text style={styles.recado}>{data.bio}</Text>}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingLeft: 15,
  },
  nome: { fontWeight: "600", fontSize: 16 },
  recado: { color: "#666" },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#00CA51",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default ContatoItem;
