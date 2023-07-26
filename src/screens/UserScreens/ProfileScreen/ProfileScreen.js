import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Text, View, Image, Button, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import EditProfileScreen from "./EditProfileScreen";
import styles from "./styles";

const Stack = createStackNavigator();

export default function ProfileScreen(user) {
    let userData = user.extraData // usa "userData" para ir buscar o id, fullName e email de um user
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                  <Ionicons
                    name="md-create-outline"
                    size={25}
                    color={"#000000"}
                    style={{padding: 15}}
                  />
                </TouchableOpacity>
              ),
        })
    }), [navigation]
    
    const Profile = () => {
        return(
            <View>
                {/* Exemplo de ir buscar o fullName de um user */}
                <Text>Hello World, {userData.fullName}</Text> 
                {/* <Button title="Edit Profile"  /> */}
            </View>
        );
    }

    const EditProfile = () => {
        return (
            <View>
              <Text>Edit {userData.fullName}'s Profile</Text>
            </View>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="ProfileMain" component={Profile} options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Ionicons
                            name="md-menu"
                            size={25}
                            color={"#000000"}
                            style={{padding: 15}}
                            />
                        </TouchableOpacity>
                    ),
                    title: "Profile",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                            <Ionicons
                            name="md-create-outline"
                            size={25}
                            color={"#000000"}
                            style={{padding: 15}}
                            />
                        </TouchableOpacity>
                    ),
                }}></Stack.Screen>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="EditProfile" component={EditProfile} options={{
                    title: "Edit Profile",
                    headerRight: () => (
                        <TouchableOpacity>
                            <Ionicons
                            name="md-checkmark"
                            size={25}
                            color={"#00bf13"}
                            style={{padding: 15}}
                            />
                        </TouchableOpacity>
                    ),
                }}></Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    )
}