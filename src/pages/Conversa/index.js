import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Message from "../../components/Message";

// import { Container } from './styles';

const Conversa = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const info = route.params.data;
  const [msg, setMsg] = useState([1]);

  function HeaderLeft() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 5,
        }}
      >
        <TouchableNativeFeedback onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color="#fff" />
        </TouchableNativeFeedback>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50 }}
          source={{ uri: "https://placekitten.com/640/360" }}
        />
      </View>
    );
  }

  function HeaderRight() {
    return (
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          style={{ marginHorizontal: 8 }}
          size={28}
          color="#fff"
          name="videocam"
        />
        <MaterialIcons
          style={{ marginHorizontal: 8 }}
          size={28}
          color="#fff"
          name="call"
        />
        <MaterialIcons
          style={{ marginHorizontal: 8 }}
          size={28}
          color="#fff"
          name="more-vert"
        />
      </View>
    );
  }

  navigation.setOptions({
    headerLeft: () => <HeaderLeft />,
    headerRight: () => <HeaderRight />,
    headerTitle: () => (
      <Text
        style={{
          marginLeft: 10,
          color: "#fff",
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        {info.nome}
      </Text>
    ),
  });

  // function selectItem(data) {
  //   data.isSelect = !data.isSelect;
  //   data.selected = data.isSelect ? styles.selected : styles.list;

  //   let att = msg;

  //   setMsg(att);
  // }

  return (
    <View style={{ backgroundColor: "#e5ddd5", flex: 1 }}>
      <FlatList
        data={msg}
        renderItem={({ item }) => <Message data={item} uid={info.key} />}
      />
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <View style={{ flex: 1, position: "relative" }}>
          <TextInput
            style={{ display: "none" }}
            placeholder="Digite uma mensagem"
            placeholderTextColor="red"
          />
          <MaterialIcons
            style={{ position: "absolute", right: 50, bottom: 7 }}
            name="attach-file"
            color="rgba(51, 51, 51, 0.5)"
            size={25}
          />
          <MaterialIcons
            style={{ position: "absolute", right: 20, bottom: 7 }}
            name="camera-alt"
            color="rgba(51, 51, 51, 0.5)"
            size={25}
          />
        </View>
        <TouchableNativeFeedback
          onPress={() => {
            let ex = msg.filter((item) => {
              if (!item.isSelect == true) {
                return item;
              }
            });

            console.log(msg);
          }}
        >
          <View style={styles.btn}>
            <MaterialIcons name="send" color="#fff" size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Conversa;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 5,
    height: 40,
    backgroundColor: "#ff3",
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 80,
    borderColor: "transparent",
  },
  btn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#075E55",
    marginRight: 8,
  },
});
