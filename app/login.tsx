import { View } from "react-native";

// Navigation
import Head from "expo-router/head";

// Components
import { DefaultSafeAreaView, Wrapper } from "@/components/Themed";

export default function LoginScreen() {
	return (
		<DefaultSafeAreaView>
			<Head>
				<title>Seus pensamentos</title>
				<meta
					name="description"
					content="This is the login page, where you can enter on your personal profile."
				/>
			</Head>
			<Wrapper>
				<View></View>
			</Wrapper>
		</DefaultSafeAreaView>
	);
}
