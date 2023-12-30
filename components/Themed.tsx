import { Text as DefaultText, View as DefaultView } from "react-native";
import {
	RectButton as DefaultRectButton,
	ScrollView as DefaultScrollView,
} from "react-native-gesture-handler";

import colors from "@/constants/colors";

import { cn } from "@/libs/utils";
import { cssInterop } from "nativewind";

export function Container({ className, ...rest }: DefaultView["props"]) {
	return (
		<DefaultView
			className={cn(
				"flex flex-col items-center justify-center rounded-2xl bg-200 border border-100",
				className
			)}
			{...rest}
		/>
	);
}

export function Text({ className, ...rest }: DefaultText["props"]) {
	return (
		<DefaultText
			className={cn(
				"text-base font-sans text-neutral web:select-text",
				className
			)}
			{...rest}
		/>
	);
}

type RectButtonProps = DefaultRectButton["props"] & {
	className?: string;
	hasIcon?: boolean;
};

function TypedRectButton(props: RectButtonProps) {
	return <DefaultRectButton {...props} />;
}

cssInterop(TypedRectButton, {
	className: {
		target: "style",
	},
});

export function RectButton({ className, hasIcon, ...rest }: RectButtonProps) {
	return (
		<TypedRectButton
			className={cn(
				"bg-200 hover:bg-300 web:transition-colors",
				{
					"flex flex-row items-center justify-center": hasIcon,
				},
				className
			)}
			underlayColor={
				rest.underlayColor || `rgb(${colors.dark.background[300]})`
			}
			{...rest}
		/>
	);
}

type ScrollViewProps = DefaultScrollView["props"] & {
	className?: string;
};

function TypedScrollView(props: ScrollViewProps) {
	return <DefaultScrollView {...props} />;
}

cssInterop(TypedScrollView, {
	className: {
		target: "style",
	},
});

export function ScrollView({ className, ...rest }: ScrollViewProps) {
	return (
		<TypedScrollView
			className={cn("portrait:w-full", className)}
			{...rest}
		/>
	);
}
