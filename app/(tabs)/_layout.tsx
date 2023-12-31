import React from "react";

import {
	Platform,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";
import { Link, Slot, Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { cn } from "@/libs/utils";
import colors from "@/constants/colors";

// Icons - É possível explorar as famílias de ícones e ícones embutidos em https://icons.expo.fyi/
import HomeIcon from "@/assets/icons/cognition.svg";
import SettingsIcon from "@/assets/icons/settings.svg";

const ICONS = {
	home: HomeIcon,
	settings: SettingsIcon,
};

function SidebarButton({
	name,
	href,
	isSelected,
	onPress,
}: {
	name: keyof typeof ICONS;
	href: any;
	isSelected: boolean;
	onPress: () => void;
}) {
	const Icon = ICONS[name];

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<Link href={href} onPress={onPress}>
				<Icon
					width={36}
					height={36}
					color={`rgb(${colors.dark.neutral} / ${
						isSelected ? 1 : 0.5
					})`}
				/>
			</Link>
			<div
				className={cn(
					"w-3 h-1 bg-neutral rounded-full transition-transform",
					{
						"scale-x-0": !isSelected,
					}
				)}
			/>
		</div>
	);
}

function WebSidebar() {
	const [isHomeSelected, setIsHomeSelected] = React.useState(
		window.location.pathname === "/"
	);

	return (
		<header className="flex flex-col items-center justify-center gap-24 h-screen text-neutral pr-9 relative">
			<SidebarButton
				name="home"
				href={`/`}
				isSelected={isHomeSelected}
				onPress={() => setIsHomeSelected(true)}
			/>
			<SidebarButton
				name="settings"
				href={`/settings`}
				isSelected={!isHomeSelected}
				onPress={() => setIsHomeSelected(false)}
			/>
			<div
				className="w-[1px] h-full absolute right-0 top-0"
				style={{
					background:
						"radial-gradient(50% 50% at 50% 50%, #6B6B6B 0%, rgba(107, 107, 107, 0.38) 61.98%, rgba(107, 107, 107, 0.50) 100%)",
				}}
			/>
		</header>
	);
}

export default function Layout() {
	const { width } = useWindowDimensions();

	if (Platform.OS === "web" && width >= 768) {
		return (
			<div
				className="flex h-screen flex-row items-start justify-center gap-28 relative"
				style={{
					background:
						"radial-gradient(50% 50% at 50% 50%, #060308 0%, #020103 100%)",
				}}
			>
				<WebSidebar />
				<Slot />
				<p className="absolute bottom-4 right-4 text-neutral text-xs opacity-5">
					@2023 | [???]
				</p>
			</div>
		);
	}

	return (
		<Tabs
			sceneContainerStyle={{
				backgroundColor: `rgb(${colors.dark.background[100]})`,
			}}
			screenOptions={{
				tabBarActiveTintColor: "#FFFFFF",
				tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: `rgb(${colors.dark.background[200]})`,
					borderTopWidth: 1,
					borderTopColor: `rgb(${colors.dark.border})`,
					height: 65,
				},
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color }) => (
						<HomeIcon width={36} height={36} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarIcon: ({ color }) => (
						<SettingsIcon width={36} height={36} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
