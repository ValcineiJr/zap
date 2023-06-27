import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { AsyncStorage, FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../../../actions/UserActions";
import ConversaItem from "../../../../components/ConversaItem";
import api from "../../../../services/api";

const Conversas = () => {
  const conversas = useSelector((state) => state.user.conversas);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("none");
  const navigation = useNavigation();

  const fakeBD = [
    { key: "1", nome: "Valcinei", msgType: "text", view: false },
    { key: "2", nome: "Ana", msgType: "text", view: false },
    { key: "3", nome: "Carlos", msgType: "text", view: false },
    { key: "4", nome: "Joana", msgType: "text", view: false },
    { key: "5", nome: "Pedro", msgType: "text", view: false },
    { key: "6", nome: "Pedro", msgType: "text", view: false },
    { key: "7", nome: "Pedro", msgType: "text", view: false },
    { key: "8", nome: "Pedro", msgType: "text", view: false },
  ];

  useEffect(() => {
    if (conversas.length === 0) {
      setDisplay("none");
    } else {
      setDisplay("flex");
    }
  }, [conversas]);

  const Title = ({ props }) => {
    let cor = "";
    props.focused ? (cor = "#fff") : (cor = "rgba(255,255,255,.6)");
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, , { color: cor }]}>CONVERSAS</Text>

        <View
          style={[
            { display },
            styles.numberContainer,
            { backgroundColor: cor },
          ]}
        >
          <Text style={[styles.number]}>{conversas.length}</Text>
        </View>
      </View>
    );
  };

  navigation.setOptions({
    title: (props) => <Title props={props} />,
  });

  useEffect(() => {
    const getChats = async () => {
      const id = await AsyncStorage.getItem("user");
      const response = await api.get(`user/chats/${id}`);
      const chats = response.data.newChats;
      if (chats) {
        // console.log(chats);
        addChat(chats, dispatch);
      }
    };
    getChats();
  }, []);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          data={conversas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ConversaItem dispatch={dispatch} data={item} />
          )}
        />
      </View>
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contatos")}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#03CA3F",
            borderRadius: 50,
            position: "absolute",
            bottom: 15,
            right: 15,
            justifyContent: "center",
            alignItems: "center",
            elevation: 2,
            zIndex: 10,
          }}
        >
          <MaterialIcons name="message" size={23} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: { flexDirection: "row", alignItems: "center" },
  title: { fontWeight: "bold", fontSize: 13 },
  number: { fontSize: 10, color: "#075E55" },
  numberContainer: {
    borderRadius: 10,
    marginLeft: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
    height: 15,
  },
});

export default Conversas;
