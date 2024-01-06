import React, {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react";
import {
	ColorSchemeName,
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	View,
	useWindowDimensions,
} from "react-native";
import { cssInterop, useColorScheme } from "nativewind";
import {
	actions,
	FONT_SIZE,
	getContentCSS,
	RichEditor,
} from "react-native-pell-rich-editor";

import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Components
import Toolbar, { PublishButton } from "./Toolbar";
import { Container, DefaultSafeAreaView, Text } from "./Themed";
import { TextInput } from "react-native";
import Animated, {
	ReduceMotion,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { cn } from "@/libs/utils";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

const initHTML = ``;

cssInterop(RichEditor, {
	className: {
		target: "style",
	},
});

function createContentStyle(theme: ColorSchemeName) {
	// Can be selected for more situations (cssText or contentCSSText).
	const neutral = "#FFFFFF"; //theme === "dark" ? "#FFFFFF" : "#000000";

	const contentStyle = {
		backgroundColor: "transparent",
		color: neutral,
		caretColor: neutral,
		placeholderColor: "gray",
		// cssText: '#editor {background-color: #f3f3f3}',
		contentCSSText: "font-size: 16px; min-height: 200px;",
	};
	return contentStyle;
}

type ToolbarAction = "bold" | "italic" | "underline" | "strikeThrough";

interface Action {
	type: ToolbarAction;
	payload: boolean;
}

export type State = {
	[key in ToolbarAction]: boolean;
};

function reducer(state: State, action: Action) {
	return {
		...state,
		[action.type]: action.payload,
	};
}

const springConfig: SpringConfig = {
	duration: 215,
	dampingRatio: 1.5,
	stiffness: 50,
	overshootClamping: false,
	restDisplacementThreshold: 0.01,
	restSpeedThreshold: 2,
	reduceMotion: ReduceMotion.System,
};

export default function Editor() {
	const richText = useRef<RichEditor>(null);
	const scrollRef = useRef<ScrollView>(null);

	// Save html to content ref
	const contentRef = useRef(initHTML);

	const { colorScheme } = useColorScheme();
	const contentStyle = useMemo(
		() => createContentStyle(colorScheme),
		[colorScheme]
	);

	const [state, dispatch] = useReducer(reducer, {
		bold: false,
		italic: false,
		underline: false,
		strikeThrough: false,
	});

	const [disabled, setDisable] = useState(false);

	// on save to preview
	const handleSave = useCallback(() => {
		/* navigation.push("preview", {
			html: contentRef.current,
			css: getContentCSS(),
		}); */
	}, []);

	// Handles editor data change
	const handleChange = useCallback((html: string) => {
		// Save html to content ref;
		contentRef.current = html;
	}, []);

	const handleCursorPosition = useCallback((scrollY: number) => {
		// Positioning scroll bar
		scrollRef.current?.scrollTo({ y: scrollY - 30, animated: true });
	}, []);

	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	const toolbarPosition = useSharedValue(64);

	const onScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			if (event.nativeEvent.contentOffset.y > 100 && isKeyboardVisible) {
				toolbarPosition.value = withSpring(0, springConfig);
			} else {
				toolbarPosition.value = withSpring(64, springConfig);
			}
		},
		[isKeyboardVisible]
	);

	const editorInitializedCallback = useCallback(() => {
		console.log("Editor initialized.");
		richText.current?.registerToolbar(function (items) {
			/* console.log(
				"Toolbar click, selected items (insert end callback):",
				items.filter((item) => Object.keys(state).includes(item as any))
			); */

			Object.keys(state).forEach((key) => {
				dispatch({
					type: key as any,
					payload: items.includes(key),
				});
			});
		});
	}, []);

	const onKeyboardHide = useCallback(() => {
		//console.log("Keyboard hide");
		setKeyboardVisible(false);
	}, []);

	const onKeyboardShow = useCallback(() => {
		//console.log("Keyboard show");
		setKeyboardVisible(true);
	}, []);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			onKeyboardShow
		);

		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			onKeyboardHide
		);
		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, [onKeyboardHide, onKeyboardShow]);

	return (
		<DefaultSafeAreaView className="justify-center">
			<ScrollView
				ref={scrollRef}
				onScroll={onScroll}
				className="flex h-full flex-col px-9 w-full landscape:xl:w-[45%] landscape:lg:w-[60%]"
				contentContainerStyle={{
					justifyContent: "flex-start",
					alignItems: "center",
					paddingVertical: 100,
					paddingHorizontal: 0,
					gap: 12,
				}}
				scrollToOverflowEnabled={true}
				scrollEnabled={true}
				keyboardDismissMode={"none"}
				nestedScrollEnabled={true}
				scrollEventThrottle={20}
			>
				{/* Header */}
				<View className="flex flex-row items-center justify-between w-full">
					<Toolbar editor={richText} state={state} />
					<PublishButton className="max-lg:hidden portrait:hidden" />
				</View>
				<Container className="w-full p-6 lg:p-12 min-h-[50vh] rounded-2xl flex-1">
					<RichEditor
						ref={richText}
						className="flex flex-1 w-full"
						//initialFocus={true}
						scrollEnabled={false}
						firstFocusEnd={false}
						disabled={disabled}
						editorStyle={contentStyle}
						useContainer={true}
						enterKeyHint={"next"}
						placeholder={
							"Insira seus pensamentos mais profundos..."
						}
						initialContentHTML={initHTML}
						onChange={handleChange}
						onCursorPosition={handleCursorPosition}
						editorInitializedCallback={editorInitializedCallback}
						pasteAsPlainText={true}
					/>
				</Container>
				<PublishButton className="lg:hidden w-full" />
				<Link
					href={`/`}
					className="flex opacity-70 text-base web:landscape:text-sm hover:underline -z-10 text-neutral"
				>
					escrevendo como @meninocoiso
				</Link>
			</ScrollView>
			<KeyboardAvoidingView
				className={"absolute bottom-0 left-0 right-0 w-full h-16"}
			>
				<Animated.View
					className={"flex-1 h-full bg-300 border-t border-default"}
					style={{
						transform: [
							{
								translateY: toolbarPosition,
							},
						],
					}}
				>
					<Toolbar
						editor={richText}
						state={state}
						className="gap-0 h-full"
						toolbarButtonClassName="rounded-none h-full border-t-0 border-b-0 border-l-0 border-r p-4"
					/>
				</Animated.View>
			</KeyboardAvoidingView>
			<StatusBar style={"light"} />
		</DefaultSafeAreaView>
	);
}

// Handles editor height change
/* const handleHeightChange = useCallback((height: number) => {
	console.log("Editor height change:", height);
}, []);

const handlePaste = useCallback((data: any) => {
	console.log("Paste:", data);
}, []);

const handleInput = useCallback(() => {}, []);

const [isFocused, setFocused] = useState(false);
const handleFocus = useCallback(() => {
	console.log("The editor has been focused.");
	setFocused(true);
}, []);

const handleBlur = useCallback(() => {
	console.log("The editor has been blurred.");
	setFocused(false);
}, []);
 */
