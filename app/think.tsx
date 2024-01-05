import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { Link } from "expo-router";
import Head from "expo-router/head";

// Components
import Editor from "@/components/Editor";
import { DefaultSafeAreaView, Text } from "@/components/Themed";
import { PublishButton } from "@/components/Toolbar";

export default function ComposeScreen() {
	return (
		<DefaultSafeAreaView className="justify-center">
			<Head>
				<title>Seus pensamentos</title>
				<meta
					name="description"
					content="This is the profile page, where you can see your thoughts and write more."
				/>
			</Head>
			<View className="flex h-screen flex-col items-center justify-center gap-3 px-9 w-full landscape:web:xl:w-[45%] landscape:web:lg:w-[60%] min-h-[50vh] max-h-[75vh]">
				{/* <Container className="flex flex-1 w-full items-start justify-start p-9 lg:p-12 min-h-[60vh]">
					<Text className="">{`o tempo passa.\nas folhas voam.`}</Text>
				</Container> */}
				<Editor />
				<Link href={`/settings`} replace>
					<TouchableOpacity activeOpacity={0.7}>
						<Text className="opacity-70 text-base hover:underline">
							escrevendo como @meninocoiso
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
			<StatusBar style="light" />
		</DefaultSafeAreaView>
	);
}
