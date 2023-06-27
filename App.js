import React from "react";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import Routes from "./src/routes";
import store from "./src/store";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
