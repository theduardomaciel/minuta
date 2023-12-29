import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";

export default function TabOneScreen() {
	return (
		<View className={"flex flex-1 items-center justify-center"}>
			<Text className="font-bold text-xl">MODAL</Text>
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
}
