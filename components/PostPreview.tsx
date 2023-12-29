import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Container, Text } from "./Themed";

interface Props {
	preview: string;
	id: string;
}

export const PREVIEW_MARGIN = 16;
const MAX_PREVIEW_LENGTH = 150;

export default function PostPreview({ preview, id }: Props) {
	const IS_TRUNCATED = preview.length > MAX_PREVIEW_LENGTH;
	const TRUNCATED_TEXT = IS_TRUNCATED
		? preview.slice(0, MAX_PREVIEW_LENGTH) + "..."
		: preview;

	return (
		<RectButton style={{ flex: 1 }}>
			<Container
				className="w-full justify-start gap-4 p-6"
				style={{
					marginBottom: PREVIEW_MARGIN,
				}}
			>
				<Text className="text-sm w-full">{TRUNCATED_TEXT}</Text>
				<View className="flex flex-col w-full items-start justify-start gap-4">
					{IS_TRUNCATED && (
						<Text className="underline">Ler mais...</Text>
					)}
					<Text className="opacity-50">#{id}</Text>
				</View>
			</Container>
		</RectButton>
	);
}
