import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";

const Login = () => {
  const navigation = useNavigation();
  const [cellNumber, setcellNumber] = useState("");

  navigation.setOptions({
    title: "Verifique seu número",
  });

  const proxScreen = () => {
    if (cellNumber.length === 15) {
      navigation.navigate("Login2", { cellNumber });
    } else {
      alert("Forneça um número válido");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bem vindo, essa é uma cópia do Whatsapp, espero que se diverta, cadastre
        seu número abaixo.
      </Text>
      <View style={styles.container2}>
        <TextInputMask
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          style={styles.input}
          value={cellNumber}
          onChangeText={(txt) => setcellNumber(txt)}
          placeholder="Seu número"
        />
        <TouchableOpacity onPress={proxScreen}>
          <View style={styles.btn}>
            <MaterialIcons name="arrow-forward" size={28} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#075E55",
    borderBottomWidth: 1,
    flex: 1,
    fontSize: 16,
    marginRight: 15,
  },
  text: { fontSize: 22, color: "#666" },
  container: { padding: 30 },
  container2: { flexDirection: "row", marginTop: 30 },
  btn: {
    width: 55,
    height: 55,
    backgroundColor: "#03CA3F",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});

export default Login;
