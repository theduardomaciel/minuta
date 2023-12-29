import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import colors from "@/constants/colors";

// Components
import { Container, RectButton, Text, ScrollView } from "@/components/Themed";
import PostPreview from "@/components/PostPreview";

// Assets
import AddIcon from "@/assets/icons/add.svg";
import TimelineDotSvg from "@/assets/timeline-dot.svg";

interface Post {
	preview: string;
	id: string;
}

const DAY_MARGIN = 16;

const DATA: (string | Post)[] = [
	"2023-05-05",
	{
		preview:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl ultricies nisi, vitae ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl ultricies nisi, vitae ultricies nisl nisl eget nisl.",
		id: "18237",
	},
	{
		preview:
			"e o tempo voou. sem olhar para trás.\narrancando tudo que via na frente.\nfoi brutal.\nfoi cruel.\nfoi necessário.\nfoi o que foi.\ne o que foi, foi.",
		id: "5312",
	},
	"2023-05-12",
	{
		preview: "o tempo passa. as folhas voam.",
		id: "5124",
	},
	"2022-05-12",
	{
		preview: "o tempo passa. as folhas voam.",
		id: "5124",
	},
];

export default function ProfileScreen() {
	return (
		<SafeAreaView className="flex flex-1 items-center justify-start">
			<ScrollView
				showsVerticalScrollIndicator={false}
				className="landscape:w-[60%]"
				contentContainerStyle={{
					width: "100%",
					padding: 36,
					gap: 50,
				}}
			>
				{/* Header */}
				<View className="flex flex-col w-full items-center justify-start gap-4">
					<Container className={"w-full gap-9 p-9"}>
						<Text className="text-lg">@meninocoiso</Text>
						<View className="flex landscape:grid grid-cols-3 flex-col landscape:flex-row items-start justify-center gap-4 w-full">
							<Text className="portrait:text-left landscape:text-center">
								255 posts
							</Text>
							<Text className="portrait:text-left landscape:text-center">
								49.124 palavras
							</Text>
							<Text className="portrait:text-left landscape:text-center">
								desde junho de 2023
							</Text>
						</View>
					</Container>
					<Container className="w-full landscape:flex-row overflow-hidden">
						<RectButton className="flex-1 w-full items-center justify-center py-4">
							<Text>Rascunhos</Text>
						</RectButton>
						<View className="portrait:w-full portrait:h-[1px] landscape:w-[1px] landscape:h-full bg-border" />
						<RectButton className="flex-1 w-full py-4 gap-4">
							<AddIcon color={`rgb(${colors.dark.neutral})`} />
							<Text>Novo rascunho</Text>
						</RectButton>
					</Container>
				</View>
				<View className="flex flex-row w-full items-start justify-between gap-4">
					<View className="flex flex-row items-start justify-start relative h-full">
						<TimelineDot year={2023} />
						<View className="flex h-full w-[6px] absolute top-[14.5px] right-[14.5px] bg-border" />
					</View>
					<FlashList
						data={DATA}
						renderItem={({ item }) => {
							if (typeof item === "string") {
								const dateString = new Date(
									item
								).toLocaleDateString("pt-BR", {
									year: "numeric",
									month: "long",
									day: "numeric",
								});

								return (
									<Text
										className="text-base"
										style={{
											marginBottom: DAY_MARGIN,
										}}
									>
										{dateString}
									</Text>
								);
							} else {
								return <PostPreview {...item} />;
							}
						}}
						getItemType={(item) => {
							// To achieve better performance, specify the type based on the item
							return typeof item === "string"
								? "sectionHeader"
								: "row";
						}}
						estimatedItemSize={200}
					/>
				</View>
			</ScrollView>
			<StatusBar style="light" />
		</SafeAreaView>
	);
}

function TimelineDot({ year }: { year: number }) {
	return (
		<View className="flex flex-row items-center justify-center gap-3">
			<Text>{year}</Text>
			<TimelineDotSvg />
		</View>
	);
}
