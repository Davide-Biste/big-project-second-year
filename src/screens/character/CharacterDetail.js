import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Title } from "../../components/Title";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import { translate } from "../../i18n";
import { useNavigation } from "@react-navigation/native";

export const CharacterDetail = ({ route }) => {
  const { character } = route.params;
  const navigation = useNavigation();

  const navigateToLocation = () => {
    navigation.navigate("Location", {
      planet: character.location,
    });
  };
  return (
    <View
      style={{
        padding: 5,
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <View style={stylesDetail.container2}>
        <View style={stylesDetail.view}>
          <Text style={stylesDetail.label}>{translate("Genere")}: </Text>
          <Text style={stylesDetail.text}>
            {character.gender === "Male" ? (
              <View style={stylesDetail.row}>
                <Text style={stylesDetail.detail}>
                  {translate(character.gender)}
                </Text>
                <Ionicons name="male" size={24} color="#3a86ff" />
              </View>
            ) : character.gender === "Female" ? (
              <View style={stylesDetail.row}>
                <Text style={stylesDetail.detail}>
                  {translate(character.gender)}
                </Text>
                <Ionicons name="female" size={24} color="#d62828" />
              </View>
            ) : (
              <Ionicons name="help" size={24} color="#001524" />
            )}
          </Text>
        </View>
        <View style={stylesDetail.view}>
          <Text style={stylesDetail.label}>{translate("Specie")}: </Text>
          <Text style={stylesDetail.text}>
            {character.species === "Human" ? (
              <View style={stylesDetail.row}>
                <Text style={stylesDetail.detail}>
                  {translate(character.species)}
                </Text>
                <Ionicons name="person" size={24} color="#001d3d" />
              </View>
            ) : character.species === "Alien" ? (
              <View style={stylesDetail.row}>
                <Text style={stylesDetail.detail}>
                  {translate(character.species)}
                </Text>
                <MaterialCommunityIcon name="alien" size={24} color="#06d6a0" />
              </View>
            ) : (
              <View style={stylesDetail.row}>
                <Text style={stylesDetail.detail}>
                  {translate(character.species)}
                </Text>
                <Ionicons name="help" size={24} color="#001524" />
              </View>
            )}
          </Text>
        </View>
        <View style={stylesDetail.view}>
          <Text style={stylesDetail.label}>{translate("Stato") + ":"}</Text>
          <Text style={stylesDetail.text}>
            {character.status === "Alive" ? (
              <Text style={{ color: "#2b9348", fontSize: 20 }}>
                {translate(character.status)}
              </Text>
            ) : character.status === "Dead" ? (
              <Text style={{ color: "#d00000", fontSize: 20 }}>
                {translate(character.status)}
              </Text>
            ) : (
              <Ionicons name="help" size={24} color="#001524" />
            )}
          </Text>
        </View>
        <View style={stylesDetail.view}>
          <Text style={stylesDetail.label}>{translate("Pianeta") + ":"}</Text>
          <Text style={stylesDetail.text}>{character?.origin.name}</Text>
        </View>
        <View style={stylesDetail.view}>
          <Text style={stylesDetail.label}>{translate("Locazione") + ":"}</Text>
          <Text style={stylesDetail.text} onPress={navigateToLocation}>
            {character?.location.name}
          </Text>
        </View>
      </View>
      <View style={stylesDetail.container}>
        <Title style={{ paddingBottom: 10 }} text={character.name} />
        <Image
          source={{ uri: character.image }}
          style={{ width: "90%", height: "70%", borderRadius: 10 }}
        />
      </View>
    </View>
  );
};

export const stylesDetail = StyleSheet.create({
  container: { justifyContent: "flex-start", alignItems: "center", flex: 0.6 },
  container2: {
    flexDirection: "column",
    paddingLeft: 10,
    letterSpacing: 5,
    flex: 0.4,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  view: {
    width: "70%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detail: {
    fontSize: 20,
  },
});
