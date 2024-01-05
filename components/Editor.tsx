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
	const neutral = theme === "dark" ? "#FFFFFF" : "#000000";

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

	const editorInitializedCallback = useCallback(() => {
		// richText.current.registerToolbar(function (items) {
		// console.log('Toolbar click, selected items (insert end callback):', items);
		// });
	}, []);

	const onKeyHide = useCallback(() => {}, []);

	const onKeyShow = useCallback(() => {
		TextInput.State.currentlyFocusedInput() &&
			console.log("Keyboard Shown");
	}, []);

	// Handles editor height change
	const handleHeightChange = useCallback((height: number) => {
		console.log("Editor height change:", height);
	}, []);

	const handleFontSize = useCallback(() => {
		// 1 = 10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
		let size = [1, 2, 3, 4, 5, 6, 7];
		richText.current?.setFontSize(
			size[Math.random() * size.length - 1] as FONT_SIZE
		);
	}, []);

	const handleForeColor = useCallback(() => {
		richText.current?.setForeColor("blue");
	}, []);

	const handleHaliteColor = useCallback(() => {
		richText.current?.setHiliteColor("red");
	}, []);

	const handlePaste = useCallback((data: any) => {
		console.log("Paste:", data);
	}, []);

	const handleInput = useCallback(() => {
		// console.log(inputType, data)
	}, []);

	const handleMessage = useCallback(
		({ type, id, data }: { type: string; id: string; data?: any }) => {
			switch (type) {
				case "TitleClick":
					const color = ["red", "blue", "gray", "yellow", "coral"];

					// command: $ = document.querySelector
					richText.current?.commandDOM(
						`$('#${id}').style.color='${
							color[Math.random() * color.length - 1]
						}'`
					);
					break;
			}
			console.log("onMessage", type, id, data);
		},
		[]
	);

	const handleFocus = useCallback(() => {
		console.log("editor focus");
	}, []);

	const handleBlur = useCallback(() => {
		console.log("editor blur");
	}, []);

	const handleCursorPosition = useCallback((scrollY: number) => {
		// Positioning scroll bar
		scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
	}, []);

	useEffect(() => {
		let listener = [
			Keyboard.addListener("keyboardDidShow", onKeyShow),
			Keyboard.addListener("keyboardDidHide", onKeyHide),
		];
		return () => {
			listener.forEach((it) => it.remove());
		};
	}, [onKeyHide, onKeyShow]);

	return (
		<ScrollView
			ref={scrollRef}
			className="flex flex-1"
			contentContainerStyle={{ gap: 12, flex: 1 }}
			keyboardDismissMode={"none"}
			nestedScrollEnabled={true}
			scrollEventThrottle={20}
		>
			<Toolbar editor={richText} />
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
				editorInitializedCallback={editorInitializedCallback}
				onChange={handleChange}
				/* onHeightChange={handleHeightChange}
				onPaste={handlePaste} */
				onInput={handleInput}
				onMessage={handleMessage}
				/* onFocus={handleFocus}
				onBlur={handleBlur} */
				onCursorPosition={handleCursorPosition}
				pasteAsPlainText={true}
			/>
			<PublishButton className="lg:hidden w-full" />
		</ScrollView>
	);
}
