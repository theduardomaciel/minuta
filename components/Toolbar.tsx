import { type RefObject, useState, useEffect, useReducer } from "react";
import { View } from "react-native";

import { cn } from "@/libs/utils";
import colors from "@/constants/colors";

// Icons
import HeadingIcon from "@/assets/icons/editor/heading.svg";
import BoldIcon from "@/assets/icons/editor/bold.svg";
import ItalicIcon from "@/assets/icons/editor/italic.svg";
import UnderlineIcon from "@/assets/icons/editor/underline.svg";
import StrikethroughIcon from "@/assets/icons/editor/strikethrough.svg";

import PublishIcon from "@/assets/icons/publish.svg";

// Components
import { Container, RectButton, Text } from "@/components/Themed";
import { RichEditor, actions } from "react-native-pell-rich-editor";

// Types
import type { SvgProps } from "react-native-svg";

interface ToolbarButtonProps {
	icon: React.FC<SvgProps>;
	isToggled: boolean;
	onPress?: () => void;
}

function ToolbarButton({ icon: Icon, isToggled, onPress }: ToolbarButtonProps) {
	return (
		<RectButton className="overflow-hidden rounded-lg" onPress={onPress}>
			<Container
				className={cn("rounded-lg p-2 web:transition-colors", {
					"bg-primary": isToggled,
					"web:hover:bg-300": !isToggled,
				})}
			>
				<Icon
					width={24}
					height={24}
					color={`rgb(${colors.dark.neutral})`}
				/>
			</Container>
		</RectButton>
	);
}

interface Action {
	type: "bold" | "italic" | "underline" | "strikeThrough" | "heading1";
	payload: boolean;
}

interface State {
	bold: boolean;
	italic: boolean;
	underline: boolean;
	strikeThrough: boolean;
}

const ICONS = {
	bold: BoldIcon,
	italic: ItalicIcon,
	underline: UnderlineIcon,
	strikeThrough: StrikethroughIcon,
};

function reducer(state: State, action: Action) {
	return {
		...state,
		[action.type]: action.payload,
	};
}

export default function Toolbar({ editor }: { editor: RefObject<RichEditor> }) {
	const [state, dispatch] = useReducer(reducer, {
		bold: false,
		italic: false,
		underline: false,
		strikeThrough: false,
	});

	useEffect(() => {
		editor.current?.registerToolbar(function (items) {
			/* console.log(
				"Toolbar click, selected items (insert end callback):",
				items.filter((item) => Object.keys(ICONS).includes(item as any))
			); */

			Object.keys(ICONS).forEach((key) => {
				dispatch({
					type: key as any,
					payload: items.includes(key),
				});
			});
		});
	}, []);

	return (
		/* Header */
		<View className="flex flex-row items-center justify-between w-full">
			{/* Toolbar */}
			<View className="flex flex-row items-center justify-start gap-3 flex-wrap max-w-full">
				{Object.entries(ICONS).map(([key, value]) => {
					return (
						<ToolbarButton
							key={key}
							icon={value}
							isToggled={state[key as keyof typeof state]}
							onPress={() => {
								editor.current?.sendAction(
									key, // exemple: "actions.setBold"
									"result",
									!state[key as keyof typeof state]
								);
							}}
						/>
					);
				})}
			</View>
			<PublishButton className="max-lg:hidden portrait:hidden" />
		</View>
	);
}

interface PublishButtonProps {
	onPress?: () => void;
	className?: string;
}

export function PublishButton({ onPress, className }: PublishButtonProps) {
	return (
		<RectButton className={"rounded-lg"} onPress={onPress}>
			<Container
				className={cn(
					"flex flex-row items-center justify-center rounded-lg px-10 py-4 landscape:py-2 gap-4 bg-transparent",
					className
				)}
			>
				<PublishIcon
					color={`rgb(${colors.dark.neutral})`}
					width={18}
					height={18}
				/>
				<Text>Publicar</Text>
			</Container>
		</RectButton>
	);
}
