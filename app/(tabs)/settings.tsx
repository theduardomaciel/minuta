import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/Themed";

export default function TabOneScreen() {
	return (
		<SafeAreaView
			className="flex web:h-screen web:w-[60vw] items-start justify-start gap-12"
			style={{
				padding: 36, // Precisa ser na propriedade style, não pode ser no className
			}}
		>
			<Text className="font-black text-5xl">Configurações</Text>
		</SafeAreaView>
	);
}
