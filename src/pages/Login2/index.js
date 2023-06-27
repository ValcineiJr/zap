import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setId } from "../../actions/UserActions";
import api from "../../services/api";

// import { Container } from './styles';

const Login2 = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { cellNumber } = route.params;
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  navigation.setOptions({
    title: "Dados do perfil",
    headerRight: () => <NextButton />,
  });

  const NextButton = () => (
    <TouchableOpacity onPress={createUser}>
      <Text style={styles.next}>Avançar</Text>
    </TouchableOpacity>
  );

  const createUser = async () => {
    const data = new FormData();

    data.append("image", image);
    data.append("name", name);
    data.append("cellNumber", cellNumber);

    const response = await api.post("newuser", data);

    if (response) {
      await AsyncStorage.setItem("user", response.data.id);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
      setId(response.data.id, dispatch);
    }
  };

  const getImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      type: true,
    });

    if (!result.cancelled) {
      const image = {
        uri: result.uri,
        type: "image/jpeg",
        name: String(`${Math.floor(Math.random() * new Date().getTime())}.jpg`),
      };

      setImage(image);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <TouchableOpacity onPress={getImage}>
          <Image
            style={styles.image}
            source={{
              uri:
                image === null
                  ? "https://lh3.googleusercontent.com/proxy/RkRswQkrPRtTed0fnEQvTk9uFiASx1UuGWp_zHb_2qQ6JBNY7H-kb9WwESczSd2UAUB7YpfXifI9s1AWvwDyyHbGZbiEKCAkvnTeGk6a0scFyryk"
                  : image.uri,
            }}
          />
        </TouchableOpacity>

        <TextInput
          value={name}
          onChangeText={(txt) => setName(txt)}
          placeholder="Seu nome"
          style={styles.input}
        />

        <Text style={styles.text}>
          Por favor forneça uma foto e um nome para o perfil (opcional)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: { alignItems: "center" },
  text: { fontSize: 18, color: "#666", width: 250 },
  container: { padding: 35, flex: 1 },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#075E55",
    height: 40,
    width: "80%",
    fontSize: 16,
    marginBottom: 20,
  },
  next: {
    color: "#fff",
    fontSize: 18,
    marginRight: 25,
    borderLeftColor: "#fff",
    borderLeftWidth: 1,
    paddingLeft: 20,
  },
});

export default Login2;
