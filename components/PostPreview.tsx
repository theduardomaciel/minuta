import { View, type ViewStyle } from "react-native";

import { Container, Text, RectButton } from "./Themed";
import { cn } from "@/libs/utils";

interface Props {
	id: any;
	preview: string;
	isLast?: boolean;
	className?: string;
	style?: ViewStyle;
}

export const PREVIEW_MARGIN = 16;
const MAX_PREVIEW_LENGTH = 150;

export default function PostPreview({
	preview,
	id,
	isLast,
	className,
	style,
}: Props) {
	const IS_TRUNCATED = preview.length > MAX_PREVIEW_LENGTH;
	const TRUNCATED_TEXT = IS_TRUNCATED
		? preview.slice(0, MAX_PREVIEW_LENGTH) + "..."
		: preview;

	console.log(typeof preview, typeof id, isLast, className, style);
	console.log("Testando essas coisas.");

	return (
		<Container
			className={cn(
				"group bg-transparent overflow-hidden flex-1",
				className
			)}
			style={[
				{
					marginBottom: isLast ? 0 : PREVIEW_MARGIN,
				},
				style,
			]}
		>
			<RectButton className="flex-col justify-start gap-4 p-6 w-full">
				<Text className="text-sm w-full">teste</Text>
				<View className="flex flex-col landscape:flex-row w-full items-start justify-start landscape:justify-between gap-2">
					{IS_TRUNCATED && (
						<Text className="text-sm font-bold group-hover:underline">
							Ler mais
						</Text>
					)}
					<Text className="opacity-50">#teste2</Text>
				</View>
			</RectButton>
		</Container>
	);
}
