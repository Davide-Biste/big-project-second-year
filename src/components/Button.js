import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export const Button = ({
  disabled,
  text,
  loading,
  onPress,
  style,
  ...props
}) => {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      {!!text && !loading && <Text style={{ fontWeight: "bold" }}>{text}</Text>}
      {loading && <ActivityIndicator color="#262824" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#99D98C",
  },
});
