import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableNativeFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { addChat } from "../../actions/UserActions";
import { Container, ImageContainer, InfoContainer } from "./styles";

const ConversaItem = ({ data, dispatch }) => {
  let conversas = useSelector((state) => state.user.conversas);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log(data);
  }, []);

  return (
    <TouchableNativeFeedback
      onPress={() => {
        const i = conversas.indexOf(data);
        conversas[i].view = true;
        addChat(conversas, dispatch);
        navigation.navigate("Chat", { data });
      }}
    >
      <Container>
        <ImageContainer>
          <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            source={{ uri: `http://192.168.0.10:3333/files/${data.avatar}` }}
          />
        </ImageContainer>
        <InfoContainer>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {data.name}
            </Text>
          </View>
          <View>
            <Text style={{ marginRight: 15, color: "#666" }}>16:08</Text>
          </View>
        </InfoContainer>
      </Container>
    </TouchableNativeFeedback>
  );
};

export default ConversaItem;
