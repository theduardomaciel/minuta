import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Link } from "expo-router";
import Head from "expo-router/head";

// Components
import Editor from "@/components/Editor";
import { DefaultSafeAreaView, Text } from "@/components/Themed";

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
				<Editor />
				<Link
					href={`/`}
					className="flex opacity-70 text-base web:landscape:text-sm hover:underline -z-10 text-neutral"
				>
					escrevendo como @meninocoiso
				</Link>
			</View>
			<StatusBar style="light" />
		</DefaultSafeAreaView>
	);
}
