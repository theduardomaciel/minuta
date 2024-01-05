import {
	Text as DefaultText,
	View as DefaultView,
	Platform,
} from "react-native";
import {
	RectButton as DefaultRectButton,
	ScrollView as DefaultScrollView,
} from "react-native-gesture-handler";

import colors from "@/constants/colors";

import { cn } from "@/libs/utils";
import { cssInterop } from "nativewind";
import { forwardRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function Container({ className, ...rest }: DefaultView["props"]) {
	return (
		<DefaultView
			data-glow
			className={cn(
				"flex items-center justify-center rounded-2xl bg-200 border border-default",
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
};

function TypedRectButton(props: RectButtonProps) {
	return <DefaultRectButton {...props} />;
}

cssInterop(TypedRectButton, {
	className: {
		target: "style",
	},
});

const RectButton = forwardRef(
	({ className, ...rest }: RectButtonProps, ref) => {
		return (
			<TypedRectButton
				className={cn(
					"flex flex-row items-center justify-center bg-200 hover:bg-300 web:transition-colors overflow-hidden",
					className
				)}
				underlayColor={
					rest.underlayColor || `rgb(${colors.dark.background[300]})`
				}
				{...rest}
			/>
		);
	}
);

export { RectButton };

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

export function Wrapper({
	className,
	contentContainerStyle,
	...rest
}: ScrollViewProps & { contentContainerClassName?: string }) {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			className={cn("web:md:w-[60vw]", className)}
			contentContainerStyle={[
				{ padding: 36, gap: 48 },
				contentContainerStyle,
			]}
			{...rest}
		/>
	);
}

type SafeAreaViewProps = DefaultView["props"] & {
	className?: string;
};

export function DefaultSafeAreaView({ className, ...rest }: SafeAreaViewProps) {
	return (
		<SafeAreaView
			className={cn(
				"flex web:h-screen items-center justify-start",
				className
			)}
			{...rest}
		/>
	);
}

cssInterop(DefaultSafeAreaView, {
	className: {
		target: "style",
	},
});
