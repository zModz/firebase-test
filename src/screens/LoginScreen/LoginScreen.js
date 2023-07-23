import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { app, auth } from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import styles from "./styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const OnLoginPress = () => {
    const _auth = getAuth(app);
    auth
      .signInWithEmailAndPassword(_auth, email, password)
      .then((response) => {
        const uid = response.user.uid;
        const db = getFirestore(app);
        const data = getDoc(doc(db, "users", uid));
        data
          .then((data) => {
            if (!data.exists) {
              alert("User does not exist!");
              return;
            }
            const user = data.data();
            navigation.navigate("Home", { user });
          })
          .catch((error) => {
            alert("Data Error: " + error);
          });
      })
      .catch((error) => {
        alert("Signin Error: " + error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => OnLoginPress()}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            New user?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              SIGN UP
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
