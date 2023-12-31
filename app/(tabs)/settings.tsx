import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Head from "expo-router/head";

import { Text } from "@/components/Themed";

export default function TabOneScreen() {
	return (
		<SafeAreaView
			className="flex web:h-screen web:w-[60vw] items-start justify-start gap-12"
			style={{
				padding: 36, // Precisa ser na propriedade style, não pode ser no className por conta do SafeAreaView
			}}
		>
			<Head>
				<title>Configurações</title>
				<meta
					name="description"
					content="This is the settings page, where you can see adequate your experience."
				/>
			</Head>
			<Text className="font-black text-5xl">Configurações</Text>
		</SafeAreaView>
	);
}
