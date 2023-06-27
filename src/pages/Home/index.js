import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { AsyncStorage, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Camera from "./pages/Camera";
import Chamadas from "./pages/Chamadas";
import Conversas from "./pages/Conversas";
import Status from "./pages/Status";

const Tab = createMaterialTopTabNavigator();

// import { Container } from './styles';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const [infoUser, setInfoUser] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      await AsyncStorage.removeItem("user");
    }

    // getUserInfo();
  }, []);

  const HeaderRight = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={async () => await AsyncStorage.removeItem("user")}
      >
        <MaterialIcons
          style={{ marginHorizontal: 10 }}
          name="search"
          color="#fff"
          size={25}
        />
      </TouchableOpacity>
      <MaterialIcons
        style={{ marginHorizontal: 10 }}
        name="more-vert"
        color="#fff"
        size={25}
      />
    </View>
  );

  navigation.setOptions({
    headerRight: () => <HeaderRight />,
  });
  return (
    <Tab.Navigator
      initialRouteName="Conversas"
      tabBarOptions={{
        style: {
          backgroundColor: "#075E55",
        },
        allowFontScaling: true,
        tabStyle: { width: "auto" },
        indicatorStyle: { backgroundColor: "#fafafa", height: 3 },
        labelStyle: { fontSize: 13, fontWeight: "bold" },
        activeTintColor: "#fff",
        inactiveTintColor: "rgba(255,255,255,.6)",
      }}
    >
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Conversas" options={{}} component={Conversas} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Chamadas" component={Chamadas} />
    </Tab.Navigator>
  );
};

export default Home;
