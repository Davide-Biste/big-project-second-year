import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { stylesHome } from "./stylesHome";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../../state/user";
import { setSearchRM, setRadioRM } from "../../state/rickMorty";
import { getCharacters } from "../../api";
import { rickMortySelectors } from "../../state/rickMorty";
import { CharacterRow } from "../../components/CharacterRow";
import { useNavigation } from "@react-navigation/native";
import { InputText } from "../../components/InputText";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { translate } from "../../i18n";

export const Home = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const characters = useSelector(rickMortySelectors.characters);
  const searchRM = useSelector(rickMortySelectors.search);
  const radio = useSelector(rickMortySelectors.radio);

  const [loading, isLoading] = useState(false);
  const [search, setSearch] = useState(searchRM);
  const [statusRadio, setStatusRadio] = useState(radio);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(0);

  const refreshData = async (page) => {
    isLoading(true);
    setError(await getCharacters(search, statusRadio, page));
    setPage(page || 1);
    isLoading(false);
  };

  useEffect(() => {
    refreshData();
    dispatch(setSearchRM(search));
    dispatch(setRadioRM(statusRadio));
  }, [search, statusRadio]);

  const onPressCharacter = (character) => {
    navigation.navigate("Detail", {
      character,
    });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={stylesHome.title}>
        <Title text={translate("Ciao") + " Davide!"} />
        <Button
          text={"Logout"}
          onPress={() => dispatch(setUserToken(""))}
          style={{
            backgroundColor: "#ee6055",
            width: "30%",
            fontWeight: "bold",
          }}
        />
      </View>
      <InputText
        placeHolder={translate("Cerca...")}
        value={search}
        onChangeText={setSearch}
        onPress={() => setSearch("")}
      />

      <RadioButtonGroup
        containerStyle={{
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
        selected={statusRadio}
        onSelected={(value) => setStatusRadio(value)}
        radioBackground="#22577a"
      >
        <RadioButtonItem
          value={"All"}
          label={translate("Tutti")}
          style={{ margin: 10 }}
        />
        <RadioButtonItem
          value={"Alive"}
          label={translate("Vivi")}
          style={{ margin: 10 }}
        />
        <RadioButtonItem
          value={"Dead"}
          label={translate("Morti")}
          style={{ margin: 10 }}
        />
        <RadioButtonItem
          value={"Unknown"}
          label={translate("Sconosciuta")}
          style={{ margin: 10 }}
        />
      </RadioButtonGroup>
      <View style={stylesHome.container}>
        {/*{error === 200 ? (*/}
        <FlatList
          style={{
            height: "80%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          data={characters}
          renderItem={({ item }) => (
            <CharacterRow
              character={item}
              onPress={() => onPressCharacter(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refreshData} />
          }
          onEndReached={() => refreshData(page + 1)}
          onEndReachedThreshold={0.5}
        />
        {/*) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#000814" }}
            >
              Non c'è un cazzo che si chiama: "{search}"
            </Text>
          </View>
        )}*/}
      </View>
    </View>
  );
};
