import { cssInterop, useColorScheme } from "nativewind";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	Appearance,
	Button,
	ColorSchemeName,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import {
	actions,
	FONT_SIZE,
	getContentCSS,
	RichEditor,
	RichToolbar,
} from "react-native-pell-rich-editor";

import Toolbar, { PublishButton } from "./Toolbar";

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

	const [disabled, setDisable] = useState(false);

	// on save to preview
	const handleSave = useCallback(() => {
		/* navigation.push("preview", {
			html: contentRef.current,
			css: getContentCSS(),
		}); */
	}, []);

	const handleHome = useCallback(() => {
		//navigation.push("index");
	}, []);

	// Handles editor data change
	const handleChange = useCallback((html: string) => {
		// Save html to content ref;
		contentRef.current = html;
	}, []);

	// Handles editor height change
	/* const handleHeightChange = useCallback((height: number) => {
		console.log("Editor height change:", height);
	}, []);

	const editorInitializedCallback = useCallback(() => {
		richText.current?.registerToolbar(function (items) {
			console.log(
				"Toolbar click, selected items (insert end callback):",
				items
			);
		});
	}, []);

	const handlePaste = useCallback((data: any) => {
		console.log("Paste:", data);
	}, []);

	const handleInput = useCallback(() => {}, []);

	const handleFocus = useCallback(() => {
		console.log("The editor has been focused.");
	}, []);

	const handleBlur = useCallback(() => {
		console.log("The editor has been blurred.");
	}, []); */

	const handleCursorPosition = useCallback((scrollY: number) => {
		// Positioning scroll bar
		scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
	}, []);

	return (
		<ScrollView
			ref={scrollRef}
			className="flex flex-1 w-full"
			contentContainerStyle={{ gap: 12, flex: 1 }}
			keyboardDismissMode={"none"}
			nestedScrollEnabled={true}
			scrollEventThrottle={20}
		>
			<Toolbar editor={richText} />
			{Platform.OS === "web" ? (
				<></>
			) : (
				<RichEditor
					ref={richText}
					className="flex flex-1 min-h-[50vh] p-6 lg:p-12 rounded-2xl bg-200 border border-default"
					initialFocus={true}
					firstFocusEnd={false}
					disabled={disabled}
					editorStyle={contentStyle}
					useContainer={true}
					enterKeyHint={"done"}
					scrollEnabled={false}
					placeholder={"Insira seus pensamentos mais profundos..."}
					initialContentHTML={initHTML}
					onChange={handleChange}
					/* onHeightChange={handleHeightChange}
				onPaste={handlePaste} */
					/* onFocus={handleFocus}
				onBlur={handleBlur} */
					onCursorPosition={handleCursorPosition}
					pasteAsPlainText={true}
				/>
			)}
			<PublishButton className="lg:hidden w-full" />
		</ScrollView>
	);
}
