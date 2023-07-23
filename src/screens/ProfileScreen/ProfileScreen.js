import "react-native-gesture-handler";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export default function ProfileScreen(user) {
    let userData = user.extraData // usa "userData" para ir buscar o id, fullName e email de um user

    return(
        <View>
            {/* Exemplo de ir buscar o fullName de um user */}
            <Text>Hello World, {userData.fullName}</Text> 
        </View>
    );
}