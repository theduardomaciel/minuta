import { useState } from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { Link } from "expo-router";
import Head from "expo-router/head";

import { cn } from "@/libs/utils";
import colors from "@/constants/colors";

// Icons
import HeadingIcon from "@/assets/icons/editor/heading.svg";
import BoldIcon from "@/assets/icons/editor/bold.svg";
import ItalicIcon from "@/assets/icons/editor/italic.svg";
import UnderlineIcon from "@/assets/icons/editor/underline.svg";
import StrikethroughIcon from "@/assets/icons/editor/strikethrough.svg";

const ICONS = [
	HeadingIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	StrikethroughIcon,
];

import PublishIcon from "@/assets/icons/publish.svg";

// Components
import { Container, RectButton, Text } from "@/components/Themed";

// Types
import type { SvgProps } from "react-native-svg";

interface ToolbarButtonProps {
	icon: React.FC<SvgProps>;
	onPress?: () => void;
}

function ToolbarButton({ icon: Icon, onPress }: ToolbarButtonProps) {
	const [isToggled, setIsToggled] = useState(false);

	return (
		<RectButton
			onPress={() => {
				setIsToggled((prev) => !prev);
			}}
		>
			<Container
				className={cn("rounded-lg p-2 web:transition-colors", {
					"bg-primary": isToggled,
					"web:hover:bg-300": !isToggled,
				})}
			>
				<Icon
					width={24}
					height={24}
					color={`rgb(${colors.dark.neutral})`}
				/>
			</Container>
		</RectButton>
	);
}

interface PublishButtonProps {
	onPress?: () => void;
	className?: string;
}

function PublishButton({ onPress, className }: PublishButtonProps) {
	return (
		<RectButton className={className} onPress={onPress}>
			<Container className="flex-row items-center justify-center rounded-lg px-10 py-4 landscape:py-2 gap-4 hover:bg-300">
				<PublishIcon
					color={`rgb(${colors.dark.neutral})`}
					width={18}
					height={18}
				/>
				<Text>Publicar</Text>
			</Container>
		</RectButton>
	);
}

export default function ComposeScreen() {
	return (
		<SafeAreaView className="flex flex-1 web:min-h-screen items-center justify-center gap-3 bg-100">
			<Head>
				<title>Seus pensamentos</title>
				<meta
					name="description"
					content="This is the profile page, where you can see your thoughts and write more."
				/>
			</Head>
			<View className="flex flex-col items-center justify-center gap-3 px-9 w-full landscape:web:xl:w-[45%] landscape:web:lg:w-[60%] min-h-[50vh]">
				{/* Header */}
				<View className="flex flex-row items-center justify-between w-full">
					{/* Toolbar */}
					<View className="flex flex-row items-center justify-start gap-3 flex-wrap max-w-full">
						{ICONS.map((icon, index) => (
							<ToolbarButton key={index} icon={icon} />
						))}
					</View>
					<PublishButton className="max-lg:hidden portrait:hidden" />
				</View>
				<Container className="flex flex-1 w-full items-start justify-start p-9 lg:p-12 min-h-[60vh]">
					<Text className="">{`o tempo passa.\nas folhas voam.`}</Text>
				</Container>
				<PublishButton className="lg:hidden w-full" />
				<Link href={`/`} asChild>
					<Text className="opacity-70 text-base portrait:text-sm hover:underline">
						escrevendo como @meninocoiso
					</Text>
				</Link>
			</View>
			<StatusBar style="light" />
		</SafeAreaView>
	);
}
