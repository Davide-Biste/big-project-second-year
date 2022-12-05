import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Title } from "../../components/Title";
import React, { useEffect, useState } from "react";
import { getLocation, getSingleCharacter } from "../../api";
import _ from "lodash";
import { CharacterRow } from "../../components/CharacterRow";
import { setCharactersByLocation } from "../../state/rickMorty";
import { useDispatch } from "react-redux";

export const Location = ({ route }) => {
  const { planet } = route.params;
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(false);
  let res = [];
  const [characters, setCharacters] = useState();

  const getAllSingleCharacter = async (location) => {
    await _.forEach(location.residents, async (resident) => {
      setTimeout(async () => {
        res.push(
          await getSingleCharacter(_.reverse(_.split(resident, "/"))[0])
        );
      }, 200);
    });
    return res;
  };

  useEffect(() => {
    const start = async () => {
      const locationID = _.reverse(_.split(planet.url, "/"))[0];
      const location = await getLocation(locationID);
      const res = await getAllSingleCharacter(location);
      console.log({ res });
    };
    start();
  }, []);

  return (
    <View style={styles.container}>
      <Title text={planet.name} />
      <FlatList
        style={{
          height: "80%",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        data={res}
        renderItem={({ item }) => (
          <CharacterRow
            character={item}
            //onPress={() => onPressCharacter(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} /*onRefresh={refreshData}*/ />
        }
        //onEndReached={() => refreshData(page + 1)}
        // onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
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
