import { Tabs } from "expo-router";
import{Text,StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "หน้าแรก", tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color="black"/> }} />
            <Tabs.Screen name="add" options={{ title: "เพิ่มหนังสือ", tabBarIcon: ({ color }) => <Ionicons name="add" size={20} color="black"/> }} />
        </Tabs>
    );

}
