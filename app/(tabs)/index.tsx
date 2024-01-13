import { useMemo } from "react";
import { View } from "react-native";

import { FlashList } from "@shopify/flash-list";

import Head from "expo-router/head";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { cn } from "@/libs/utils";
import colors from "@/constants/colors";

// Components
import {
	Container,
	RectButton,
	Text,
	Wrapper,
	DefaultSafeAreaView,
} from "@/components/Themed";
import PostPreview from "@/components/PostPreview";

// Assets
import AddIcon from "@/assets/icons/add.svg";
import TimelineDot from "@/assets/timeline-dot.svg";

// Hooks
import { useThoughtManager } from "@/hooks/data/useThoughtManager";

interface Post {
	index: number;
	preview: string;
	id: string;
}

const DAY_MARGIN = 16;

const DATA: (string | Post)[] = [
	"//2023-05-05",
	{
		index: 1,
		preview:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl ultricies nisi, vitae ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies ultrices, nunc nisl ultricies nisi, vitae ultricies nisl nisl eget nisl.",
		id: "18237",
	},
	{
		index: 2,
		preview:
			"e o tempo voou. sem olhar para trás.\narrancando tudo que via na frente.\nfoi brutal.\nfoi cruel.\nfoi necessário.\nfoi o que foi.\ne o que foi, foi.",
		id: "5312",
	},
	"2023-05-12",
	{
		index: 3,
		preview: "o tempo passa. as folhas voam.",
		id: "5124",
	},
	"//2022-05-12",
	{
		index: 4,
		preview: "o tempo passa. as folhas voam.",
		id: "5124",
	},
];

export default function ProfileScreen() {
	//const [hasLoaded, setHasLoaded] = useState(false);

	const { thoughts } = useThoughtManager();

	const DATA = useMemo(() => {
		const data: (string | Post)[] = [];

		thoughts.forEach((thought, index) => {
			const date = new Date(thought.createdAt);

			const isNewYear =
				index === 0 ||
				date.getFullYear() !==
					new Date(thoughts[index - 1].createdAt).getFullYear();

			if (isNewYear) {
				data.push(`//${date.getFullYear()}`);
			}

			data.push({
				index: index + 1,
				preview: thought.content,
				id: thought._id.toString(),
			});
		});

		return data;
	}, [thoughts]);

	console.log(DATA);

	const DATA_LENGTH = DATA.filter((i) => typeof i !== "string").length;

	return (
		<DefaultSafeAreaView>
			<Head>
				<title>Seus pensamentos</title>
				<meta
					name="description"
					content="This is the profile page, where you can see your thoughts and write more."
				/>
			</Head>
			<Wrapper>
				{/* Header */}
				<View className="flex flex-col w-full items-center justify-start gap-4">
					<Container className={"w-full gap-9 p-9"}>
						<Text className="text-lg">@theduardomaciel</Text>
						<View className="flex landscape:web:grid web:grid-cols-3 flex-col landscape:flex-row items-start justify-center gap-4 w-full">
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
						<RectButton className="flex-1 w-full items-center justify-center py-4 landscape:web:py-3">
							<Text>Rascunhos</Text>
						</RectButton>
						<View className="portrait:w-full portrait:h-[1px] landscape:w-[1px] landscape:h-full bg-border" />
						<Link href="/think" asChild>
							<RectButton className="flex-1 w-full gap-4 py-4 landscape:web:py-3">
								<AddIcon
									color={`rgb(${colors.dark.neutral})`}
								/>
								<Text>Novo rascunho</Text>
							</RectButton>
						</Link>
					</Container>
				</View>
				<View className="flex flex-row items-start justify-between gap-4 relative min-h-4">
					<View className="flex flex-row items-start justify-start h-full absolute top-0 left-0">
						<TimelineYear year={2023} className="opacity-0" />
						<View className="flex h-[110%] w-[6px] absolute top-[14.5px] right-[14.5px] bg-border" />
					</View>
					<FlashList
						data={DATA}
						ListEmptyComponent={<Text>A lista está vazia.</Text>}
						renderItem={({ item, index }) => {
							if (typeof item === "string") {
								const isNewYear = item.includes("//");
								const itemDate = isNewYear
									? item.split("//")[1]
									: item;

								const date = new Date(itemDate);
								const dateString = date.toLocaleDateString(
									"pt-BR",
									{
										month: "long",
										day: "numeric",
									}
								);

								return (
									<View
										className="flex flex-row items-center justify-between gap-8"
										style={{
											marginTop:
												isNewYear && index !== 0
													? DAY_MARGIN * 2
													: 0,
										}}
									>
										<TimelineYear
											className={cn({
												"opacity-0": !isNewYear,
											})}
											year={date.getFullYear()}
										/>
										<Text
											className="text-base flex-1"
											style={{
												marginBottom: DAY_MARGIN,
												marginLeft: "auto",
											}}
										>
											{dateString}
										</Text>
									</View>
								);
							} else {
								return (
									<View className="flex flex-row items-center justify-between gap-8">
										<TimelineYear
											year={1234}
											className="opacity-0"
										/>
										<PostPreview
											isLast={item.index === DATA_LENGTH}
											{...item}
										/>
									</View>
								);
							}
						}}
						getItemType={(item) => {
							// To achieve better performance, specify the type based on the item
							return typeof item === "string"
								? "sectionHeader"
								: "row";
						}}
						estimatedItemSize={245.7}
					/>
				</View>
			</Wrapper>
			<StatusBar style="light" />
		</DefaultSafeAreaView>
	);
}

function TimelineYear({
	year,
	className,
}: {
	year: number;
	className?: string;
}) {
	return (
		<View
			className={cn(
				"flex flex-row items-center justify-start gap-3",
				className
			)}
		>
			<Text>{year}</Text>
			<TimelineDot />
		</View>
	);
}
