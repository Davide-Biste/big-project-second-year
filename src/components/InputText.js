import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const InputText = ({
  value,
  onChangeText,
  style,
  placeHolder,
  onPress,
  ...props
}) => {
  return (
    <View style={styles.search}>
      <TextInput
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        style={style}
      />
      <Pressable onPress={onPress}>
        <Ionicons name="close" size={24} color="#d62828" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderColor: "#57cc99",
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20,
  },
});
