import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Head from "expo-router/head";

import {
	Container,
	DefaultSafeAreaView,
	Text,
	Wrapper,
} from "@/components/Themed";

export default function SettingsScreen() {
	return (
		<DefaultSafeAreaView>
			<Head>
				<title>Configurações</title>
				<meta
					name="description"
					content="This is the settings page, where you can see adequate your experience."
				/>
			</Head>
			<Wrapper>
				<Text className="font-black text-5xl">Configurações</Text>

				<Container data-glow className="container h-48 w-full">
					<Text>Configurações</Text>
				</Container>
			</Wrapper>
		</DefaultSafeAreaView>
	);
}
