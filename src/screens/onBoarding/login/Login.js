import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { stylesLogin } from "./stylesLogin";
import { Button } from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, userSelectors } from "../../../state/user";
import { Title } from "../../../components/Title";
import { translate } from "../../../i18n";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export const Login = ({}) => {
  const REGEX = {
    PASSWORD: /.{8,}/,
    UPPERCASE: /(?=.?[D-Z])/,
    NUMBERS: /(?=.?[0-9])/,
  };

  const dispatch = useDispatch();
  const userToken = useSelector(userSelectors.token);
  const [email, setEmail] = useState("Dave.mazzeo77@gmail.com");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [checkPassword, setCheckPassword] = useState({
    characters: 0,
    number: 0,
    upper: 0,
    repeat: 0,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    repeat: false,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const verifyLogin = (email, password) => {
    if (email === "" && password === "") {
      setError("Credenziali non inserite");
      return false;
    }
    if (email !== "Dave.mazzeo77@gmail.com") {
      setError("Email non corretta");
      return false;
    }
    if (password !== "Admin02!") {
      setError("Password non valida");
      return false;
    }

    let reEmail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    if (reEmail.test(email)) {
      setError("");
      return true;
    } else {
      setError("Email non ammessa");
      return false;
    }
  };

  const onPressLogin = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (verifyLogin(email, password)) {
        const token = "tokentoken";
        dispatch(setUserToken(token));
      }
    }, 1000);
  };

  const verifyLength = (password) => {
    let reCharacters = new RegExp(REGEX.PASSWORD);
    return reCharacters.test(password)
      ? setCheckPassword((characters) => ({
          ...characters,
          ...{ characters: 1 },
        }))
      : setCheckPassword((characters) => ({
          ...characters,
          ...{ characters: 0 },
        }));
  };
  const verifyNumber = (password) => {
    let reCharacters = new RegExp(REGEX.NUMBERS);
    return reCharacters.test(password)
      ? setCheckPassword((characters) => ({
          ...characters,
          ...{ number: 1 },
        }))
      : setCheckPassword((characters) => ({
          ...characters,
          ...{ number: 0 },
        }));
  };
  const verifyUpper = (password) => {
    let reCharacters = new RegExp(REGEX.UPPERCASE);
    return reCharacters.test(password)
      ? setCheckPassword((characters) => ({
          ...characters,
          ...{ upper: 1 },
        }))
      : setCheckPassword((characters) => ({
          ...characters,
          ...{ upper: 0 },
        }));
  };
  const verifyRepeat = (password, repeat) => {
    return password === repeat
      ? setCheckPassword((characters) => ({
          ...characters,
          ...{ repeat: 1 },
        }))
      : setCheckPassword((characters) => ({
          ...characters,
          ...{ repeat: 0 },
        }));
  };

  const verifyCorrectPassword = (password, repeat) => {
    verifyLength(password);
    verifyNumber(password);
    verifyUpper(password);
    if (
      checkPassword.characters === 1 &&
      checkPassword.number === 1 &&
      checkPassword.upper === 1 &&
      repeat !== ""
    ) {
      verifyRepeat(password, repeat);
    }
  };

  return (
    <View style={stylesLogin.container}>
      {/*<KeyboardAwareScrollView contentContainerStyle={stylesLogin.container}>*/}

      <View style={stylesLogin.title}>
        <Title text={translate("Benvenuto") + "!"} />
      </View>
      <View style={stylesLogin.input}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          value={email}
          keyboardType={"email-address"}
        />
      </View>
      <View style={stylesLogin.input}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            verifyCorrectPassword(value, "");
          }}
          secureTextEntry={showPassword.password}
        />
        <Pressable
          onPress={() =>
            setShowPassword((show) => ({
              ...show,
              ...{ password: !show.password },
            }))
          }
        >
          {showPassword.password ? (
            <FontAwesome name="eye-slash" size={24} color="black" />
          ) : (
            <FontAwesome name="eye" size={24} color="black" />
          )}
        </Pressable>
      </View>
      <View style={stylesLogin.input}>
        <TextInput
          placeholder="Repeat Password"
          value={repeatPassword}
          onChangeText={(value) => {
            setRepeatPassword(value);
            verifyCorrectPassword(password, value);
          }}
          secureTextEntry={showPassword.repeat}
        />
        <Pressable
          onPress={() =>
            setShowPassword((show) => ({
              ...show,
              ...{ repeat: !show.repeat },
            }))
          }
        >
          {showPassword.repeat ? (
            <FontAwesome name="eye-slash" size={24} color="black" />
          ) : (
            <FontAwesome name="eye" size={24} color="black" />
          )}
        </Pressable>
      </View>
      {error}
      <View style={stylesLogin.check}>
        <Text>
          {checkPassword.characters === 0 ? (
            <AntDesign name="checkcircleo" size={16} color="black" />
          ) : (
            <AntDesign name="checkcircle" size={16} color="green" />
          )}
          Almeno 8 caratteri
        </Text>
        <Text>
          {checkPassword.number === 0 ? (
            <AntDesign name="checkcircleo" size={16} color="black" />
          ) : (
            <AntDesign name="checkcircle" size={16} color="green" />
          )}
          Includi un numero
        </Text>
        <Text>
          {checkPassword.upper === 0 ? (
            <AntDesign name="checkcircleo" size={16} color="black" />
          ) : (
            <AntDesign name="checkcircle" size={16} color="green" />
          )}
          Almeno una lettera maiuscola
        </Text>
        <Text>
          {checkPassword.repeat === 0 ? (
            <AntDesign name="checkcircleo" size={16} color="black" />
          ) : (
            <AntDesign name="checkcircle" size={16} color="green" />
          )}
          Ripeti correttamente la password
        </Text>
      </View>
      <Button
        text={translate("Accesso")}
        onPress={onPressLogin}
        loading={loading}
      />
      {/*</KeyboardAwareScrollView>*/}
      <View style={{ paddingTop: "50%" }}>
        <Image
          source={{
            uri: "https://www.pngall.com/wp-content/uploads/4/Rick-And-Morty-PNG-Clipart.png",
          }}
          style={{ width: 300, height: 300 }}
        />
      </View>
    </View>
  );
};
