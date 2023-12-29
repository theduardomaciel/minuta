import React from "react";
import { Tabs } from "expo-router";

import colors from "@/constants/colors";

// Icons - É possível explorar as famílias de ícones e ícones embutidos em https://icons.expo.fyi/
import HomeIcon from "@/assets/icons/cognition.svg";
import SettingsIcon from "@/assets/icons/settings.svg";

export default function TabLayout() {
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
