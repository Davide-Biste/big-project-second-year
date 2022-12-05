import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { translate } from "../i18n";

export const CharacterRow = ({ character, onPress, ...props }) => {
  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: character.id % 2 == 0 ? "#D9ED92" : "#B5E48C" },
      ]}
      onPress={onPress}
    >
      <View style={styles.list}>
        <Image
          source={{ uri: character.image }}
          style={{ width: 100, height: 100, borderRadius: 5 }}
        />
        <View style={{ justifyContent: "center", paddingLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {character.name}
          </Text>
          <Text
            style={
              character.gender === "Male"
                ? { color: "#168AAD" }
                : { color: "#ee6055" }
            }
          >
            {translate(character.gender)}
          </Text>
          <Text>{translate(character.species)}</Text>
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            {translate("E' vivo") + ": "}
            {character?.status === "Alive" ? (
              <Ionicons name="checkmark" size={24} color="#3a5a40" />
            ) : character?.status === "Dead" ? (
              <Ionicons name="skull" size={20} color="#1E6091" />
            ) : (
              <Ionicons name="help" size={20} color="#001524" />
            )}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  list: { flexDirection: "row" },
});
