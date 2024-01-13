import { Platform, Text } from "react-native";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Hooks
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// Styling, breakpoints, and other global CSS
import "../global.css";
import "@expo/match-media"; // Utilizado para obter o tamanho do dispositivo sem o uso de hooks que dependem do cliente como `useWindowDimensions`.
import colors from "@/constants/colors";

// Database and authentication
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { SYNC_CONFIG } from "@/sync.config";
import { schemas } from "@/models";

import { Thought } from "@/models/Thought";
import LoginScreen from "./login";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Inter: require("../assets/fonts/Inter.ttf"),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return SYNC_CONFIG.enabled ? (
		<RootLayoutSync appId={SYNC_CONFIG.appId} />
	) : (
		<RootLayoutNonSync />
	);
}

function BaseApp() {
	return (
		<GestureHandlerRootView
			style={{
				flex: 1,
				backgroundColor: `rgb(${colors.dark.background[100]})`, // TODO: Bugadasso. Não funciona se o valor for `transparent`.
			}}
		>
			<Stack
				screenOptions={{
					contentStyle: {
						backgroundColor:
							Platform.OS === "web"
								? `rgb(${colors.dark.background[100]})`
								: "transparent",
					},
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="think"
					options={{
						presentation: "modal",
						headerShown: false,
					}}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}

function RootLayoutNonSync() {
	const { colorScheme } = useColorScheme();

	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			{/* 
				Define the Realm configuration as props passed to `RealmProvider`.
				Since this component renders the local-only app, there is no need to
				set up `AppProvider` or `UserProvider`. 
			*/}
			<RealmProvider schema={schemas}>
				<BaseApp />
			</RealmProvider>
		</ThemeProvider>
	);
}

/* 
	The root React component for the Device Sync enabled app which renders `@realm/react`'s `AppProvider` for instantiation an Atlas App Services App, `UserProvider` for providing the App User once authenticated, and `RealmProvider` for opening a Realm.
*/

declare enum OpenRealmBehaviorType {
	DownloadBeforeOpen = "downloadBeforeOpen",
	OpenImmediately = "openImmediately",
}

function RootLayoutSync({ appId }: { appId: string }) {
	const { colorScheme } = useColorScheme();

	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<AppProvider id={appId}>
				{/* 
					The component set as the `fallback` prop will be rendered if a user has
					not been authenticated. In this case, we will show the login screen. 
				*/}
				<UserProvider fallback={<LoginScreen />}>
					{/* 
						Define the Realm configuration as props passed to `RealmProvider`.
						Note that `user` does not need to be defined in the `sync` config
						since the `RealmProvider` will set it for you once authenticated. 
					*/}
					<RealmProvider
						// The fallback component will be rendered until the realm is opened.
						fallback={<Text>carregando</Text>}
						schema={schemas}
						sync={{
							flexible: true,
							// To sync data to the device, we need to subscribe to our tasks.
							initialSubscriptions: {
								update: (mutableSubs, realm) =>
									mutableSubs.add(realm.objects(Thought), {
										name: "myThoughts",
									}),
							},
							/* 
								We can specify the behavior when opening a Realm for the first time
								(`newRealmFileBehavior`) and for subsequent ones (`existingRealmFileBehavior`).
								If the user has logged in at least 1 time before, the Realm and its data will
								exist on disk and can be opened even when offline. We can either (a) open the
								Realm immediately (or first create a new empty Realm file if it does not
								exist before opening it) and sync the data to the device in the background
								(`OpenRealmBehaviorType.OpenImmediately`), or (b) wait for any non-synced
								data to be fully downloaded (`OpenRealmBehaviorType.DownloadBeforeOpen`).
								For more possible configurations of new and existing Realm file behaviors, see:
								https://www.mongodb.com/docs/realm-sdks/js/latest/types/OpenRealmBehaviorConfiguration.html
							*/
							newRealmFileBehavior: {
								type: OpenRealmBehaviorType.DownloadBeforeOpen,
							},
							existingRealmFileBehavior: {
								type: OpenRealmBehaviorType.OpenImmediately,
							},
						}}
					>
						<BaseApp />
					</RealmProvider>
				</UserProvider>
			</AppProvider>
		</ThemeProvider>
	);
}
