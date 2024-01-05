import { TouchableOpacity, View } from "react-native";

import { Link } from "expo-router";
import Head from "expo-router/head";

import { cn } from "@/libs/utils";
import colors from "@/constants/colors";

import {
	Container,
	DefaultSafeAreaView,
	Text,
	Wrapper,
} from "@/components/Themed";

// Icons
import ShareIcon from "@/assets/icons/share.svg";
import LockIcon from "@/assets/icons/lock.svg";
import ExitIcon from "@/assets/icons/exit.svg";

// Types
import type { SvgProps } from "react-native-svg";

export default function SettingsScreen() {
	return (
		<DefaultSafeAreaView>
			<Head>
				<title>Configurações</title>
				<meta
					name="description"
					content="This is the settings page, where you can see your options and adequate your experience."
				/>
			</Head>
			<Wrapper>
				<Text className="font-black text-4xl">Configurações</Text>
				<SectionWrapper>
					<SectionHeader>Seu Perfil</SectionHeader>
					<SettingCard
						title="Tornar privado"
						description="Proteja seus pensamentos mais íntimos adicionando uma senha de proteção ao seu perfil."
						footer={{
							outro: {
								label: "Saiba mais sobre",
								emphasis: "Perfis Privados",
								href: "",
							},
							button: {
								label: "Tornar privado",
								icon: LockIcon,
								onPress: () => {},
							},
						}}
					/>
					<SettingCard
						title="Deixar seu eu"
						description="Abandone temporariamente seu atual receptáculo de pensamentos para abrir espaço para outro."
						footer={{
							outro: {
								label: "Saiba mais sobre",
								emphasis: "Seu Perfil",
								href: "",
							},
							button: {
								label: "Sair",
								icon: ExitIcon,
								onPress: () => {},
							},
						}}
						accentColor="#D30B0B"
					/>
				</SectionWrapper>
				<SectionWrapper>
					<SectionHeader>Customização</SectionHeader>
					<SettingCard
						title="Tema"
						description="Alterne entre o tema claro e escuro, ou deixe que seu sistema decida."
					/>
				</SectionWrapper>
			</Wrapper>
		</DefaultSafeAreaView>
	);
}

function SectionWrapper({ children }: { children: React.ReactNode }) {
	return <View className="gap-4">{children}</View>;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
	return <Text className="text-2xl font-bold">{children}</Text>;
}

interface SettingCardProps {
	title: string;
	description: string;
	footer?: {
		outro?: {
			label: string;
			emphasis?: string;
			href?: any;
		};
		button?: {
			label: string;
			icon?: React.FC<SvgProps>;
			className?: string;
			onPress?: () => void;
		};
	};
	accentColor?: string;
}

function SettingCard({
	title,
	description,
	footer,
	accentColor,
}: SettingCardProps) {
	const { outro, button } = footer || {};

	return (
		<Container
			style={{
				borderColor: accentColor || `rgb(${colors.dark.border})`,
			}}
		>
			<View
				className="flex flex-col items-start justify-start gap-3 p-6 w-full border-b border-default"
				style={{
					borderBottomColor:
						accentColor ?? `rgb(${colors.dark.border})`,
					borderBottomWidth: footer ? 1 : 0,
				}}
			>
				<Text className="font-semibold text-lg">{title}</Text>
				<Text className="text-sm">{description}</Text>
			</View>
			{footer && (
				<View className="flex flex-col landscape:flex-row items-start landscape:items-center justify-start landscape:justify-between gap-4 p-6 landscape:py-3 w-full">
					{outro && (
						<Link href={outro.href}>
							<View className="flex flex-row items-center justify-start gap-2 text-neutral">
								<Text className="text-sm">{outro.label}</Text>
								{outro.emphasis && (
									<Text className="text-sm underline -ml-1">
										{outro.emphasis}
									</Text>
								)}
								<ShareIcon />
							</View>
						</Link>
					)}
					<TouchableOpacity
						className={cn(
							"flex flex-row items-center justify-center bg-neutral px-4 py-3 landscape:py-1.5 rounded-lg portrait:w-full gap-3 hover:bg-neutral",
							button?.className
						)}
						activeOpacity={0.9}
						style={{
							backgroundColor:
								accentColor || `rgb(${colors.dark.neutral})`,
						}}
					>
						{button?.icon && (
							<button.icon
								width={18}
								height={18}
								color={
									accentColor
										? `rgb(${colors.dark.neutral})`
										: "black"
								}
							/>
						)}
						<Text
							className="text-sm text-black"
							style={{
								color: accentColor
									? `rgb(${colors.dark.neutral})`
									: "black",
							}}
						>
							{button?.label}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</Container>
	);
}
