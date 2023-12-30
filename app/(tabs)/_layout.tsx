import React from "react";

import { Platform, TouchableOpacity, View } from "react-native";
import { Link, Slot, Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import colors from "@/constants/colors";

// Icons - É possível explorar as famílias de ícones e ícones embutidos em https://icons.expo.fyi/
import HomeIcon from "@/assets/icons/cognition.svg";
import SettingsIcon from "@/assets/icons/settings.svg";

const ICONS = {
	home: HomeIcon,
	settings: SettingsIcon,
};

// Types
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { cn } from "@/libs/utils";

export default function Layout() {
	if (Platform.OS === "web") {
		// Use a basic custom layout on web.
		const [isHomeSelected, setIsHomeSelected] = React.useState(
			window.location.pathname === "/"
		);

		return (
			<div className="flex h-screen flex-row items-start justify-center gap-28">
				<header className="flex flex-col items-center justify-center gap-24 h-screen text-neutral pr-9 relative">
					<div className="flex flex-col items-center justify-center gap-2">
						<Link href="/" onPress={() => setIsHomeSelected(true)}>
							<HomeIcon
								width={36}
								height={36}
								color={`rgba(255, 255, 255, ${
									isHomeSelected ? 1 : 0.5
								})`}
							/>
						</Link>
						<div
							className={cn(
								"w-3 h-1 bg-neutral rounded-full transition-transform",
								{
									"scale-x-0": !isHomeSelected,
								}
							)}
						/>
					</div>
					<div className="flex flex-col items-center justify-center gap-2">
						<Link
							href="/settings"
							onPress={() => setIsHomeSelected(false)}
						>
							<SettingsIcon
								width={36}
								height={36}
								color={`rgba(255, 255, 255, ${
									isHomeSelected ? 0.5 : 1
								})`}
							/>
						</Link>
						<div
							className={cn(
								"w-3 h-1 bg-neutral rounded-full transition-transform",
								{
									"scale-x-0": isHomeSelected,
								}
							)}
						/>
					</div>
					<div
						className="w-[1px] h-full absolute right-0 top-0"
						style={{
							background:
								"radial-gradient(50% 50% at 50% 50%, #6B6B6B 0%, rgba(107, 107, 107, 0.38) 61.98%, rgba(107, 107, 107, 0.50) 100%)",
						}}
					/>
				</header>
				<Slot />
			</div>
		);
	}

	return (
		<Tabs
			sceneContainerStyle={{
				backgroundColor: "transparent",
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
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

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	return (
		<View
			className={
				"flex flex-row items-center justify-around w-full h-20 bg-200"
			}
		>
			<LinearGradient
				colors={[
					"rgba(107, 107, 107, 0)",
					"rgba(107, 107, 107, 1)",
					"rgba(107, 107, 107, 0)",
				]}
				className={"absolute top-0 portrait:left-0 w-full h-[1px]"}
			/>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={route.key}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						activeOpacity={1}
						className="flex-1 items-center justify-center h-full"
					>
						{options.tabBarIcon &&
							options.tabBarIcon({
								color: isFocused
									? `#FFFFFF`
									: `rgba(255, 255, 255, 0.5)`,
								size: 36,
								focused: isFocused,
							})}
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
