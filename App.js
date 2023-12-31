import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import { app, auth } from "./src/firebase/config";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [SignIn, isSignIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const _auth = getAuth(app);
    const db = getFirestore(app);
    auth.onAuthStateChanged(_auth, (user) => {
      alert("User State Changed!!")
      if (user) {
        const usersRef = getDoc(doc(db, "users", user.uid));
        usersRef
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
            isSignIn(true)
          })
          .catch((error) => {
            setLoading(false);
            alert("Error getting documents:", error);
          });
      } else {
        setLoading(false);
        isSignIn(false)
      }
    });
  }, []);
    
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {SignIn ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
