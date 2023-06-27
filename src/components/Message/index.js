import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeSize, setSelected } from "../../actions/AppActions";
import { loadMessages } from "../../actions/UserActions";

const Message = ({ data }) => {
  const messages = useSelector((state) => state.user.mensagens);
  const selecting = useSelector((state) => state.app.selecting);
  const selectingSize = useSelector((state) => state.app.selectingSize);
  const dispatch = useDispatch();
  const [cor, setCor] = useState({});
  const [uid, setUid] = useState("");

  useEffect(() => {
    // console.log(messages);
    const getId = async () => {
      const res = await AsyncStorage.getItem("user");
      setUid(res);
    };
    getId();
    return setSelected(false, dispatch);
  }, []);

  useEffect(() => {
    if (selectingSize == 0) {
      setSelected(false, dispatch);
    }
  }, [selectingSize]);

  useEffect(() => {
    if (!selecting) {
      setCor({});
      changeSize(0, dispatch);
      messages.map((item) => {
        item = item.isSelected = false;
      });
    }
  }, [selecting]);

  function multiSelect(data) {
    data.isSelected = true;
    setSelected(true, dispatch);
    changeSize(selectingSize + 1, dispatch);
    setCor({ backgroundColor: "#D7E0DC" });
    let novo = messages;
    const index = novo.findIndex((item) => data._id === item._id);
    novo[index] = data;
    loadMessages(novo, dispatch);
  }
  function multiDeSelect(data) {
    data.isSelected = false;
    setCor({});
    let novo = messages;
    const index = novo.findIndex((item) => data._id === item._id);
    novo[index] = data;
    loadMessages(novo, dispatch);
  }

  let bgColor = "#fff";
  let align = "flex-start";
  let color = "#333";
  let textAlign = "left";

  if (uid === data.uid) {
    bgColor = "#e2ffc7";
    align = "flex-end";
    color = "#333";
  }

  function dinamicLongPressSelection() {
    if (!data.isSelected) {
      multiSelect(data);
    }
  }

  function dinamicPressSelection() {
    if (selecting && data.isSelected) {
      multiDeSelect(data);
      changeSize(selectingSize - 1, dispatch);
      // setSelected(false, dispatch);
    } else if (selecting) {
      multiSelect(data);
    }
    // selecting ?  :
  }

  return (
    <TouchableNativeFeedback
      onLongPress={() => {
        dinamicLongPressSelection();
      }}
      onPress={() => {
        dinamicPressSelection();
      }}
    >
      <View style={[cor, { marginTop: 5 }]}>
        <View
          style={[
            styles.container,
            { alignSelf: align, backgroundColor: bgColor },
          ]}
        >
          {data.type == "text" && (
            <Text style={{ color, textAlign }}>{data.data}</Text>
          )}

          {data.type == "image" && <Text>(IMAGEM)</Text>}
          <Text style={[styles.date]}>19:17</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    maxWidth: "70%",
    minWidth: 90,
    borderRadius: 10,
  },
  list: {},
  selected: {
    backgroundColor: "red",
  },
  date: {
    fontSize: 11,
    textAlign: "right",
    color: "rgba(51, 51, 51, 0.5)",
  },
});

export default Message;
