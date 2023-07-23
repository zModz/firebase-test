import "react-native-gesture-handler";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { app, auth } from "../../firebase/config";
import { getAuth } from "firebase/auth";
import styles from "./styles";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Drawer = createDrawerNavigator();

function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text>Welcome to the app!</Text>
      </View>
    </View>
  );
}

function Explore() {}
function Notifications() {}
function Saved() {}
function Communities() {}
function Settings() {}

export default function HomeScreen(props, { navigation }) {
  let userData = props.extraData

  const [loadedFonts] = useFonts({
    Ionicons: require("../../../assets/fonts/Ionicons.ttf"),
  });

  if (!loadedFonts) {
    return null;
  }

  const signout = () => {
    const _auth = getAuth();
    auth
      .signOut(_auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };

  const CustomDrawer = (drops) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView>
          <View style={{ padding: 20 }}>
            <Image
              source={require("../../../assets/icon.png")}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            <Text style={{ fontSize: 18 }}>@{userData.fullName}</Text>
          </View>
          <DrawerItemList {...drops} />
        </DrawerContentScrollView>
        <View
          style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccd" }}
        >
          <TouchableOpacity
            onPress={() => signout()}
            style={{ paddingVertical: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="exit-outline" size={22} />
              <Text style={{ fontSize: 15, marginLeft: 10 }}>Sign Out</Text>
            </View>
          </TouchableOpacity>
          <Text>Made with ❤ from Portugal</Text>
        </View>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(drops) => <CustomDrawer {...drops} />}
      screenOptions={{ drawerLabelStyle: { marginLeft: -20 } }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Profile"
        options={{
          title: "Profile (temp)",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-happy-outline"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      >{(props) => <ProfileScreen {...props} extraData={userData} />}</Drawer.Screen>
      <Drawer.Screen
        name="Home Page"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home-outline"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Explore"
        component={Explore}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-compass-outline"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-notifications-outline"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Saved"
        component={Saved}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-checkmark-circle-outline"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Communities"
        component={Communities}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-globe-outline"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-cog-outline"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
