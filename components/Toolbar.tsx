import { type RefObject } from "react";
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
import UndoIcon from "@/assets/icons/editor/undo.svg";

// Components
import { Container, RectButton, Text } from "@/components/Themed";
import { RichEditor, actions } from "react-native-pell-rich-editor";

// Types
import type { SvgProps } from "react-native-svg";
import type { State } from "./Editor";

interface ToolbarProps {
	editor: RefObject<RichEditor>;
	state: State;
	className?: string;
	toolbarButtonClassName?: ToolbarButtonProps["className"];
}

export default function Toolbar({
	editor,
	state,
	className,
	toolbarButtonClassName,
}: ToolbarProps) {
	return (
		<View
			className={cn(
				"flex flex-row items-center justify-between flex-wrap w-full"
			)}
		>
			<View
				className={cn(
					"flex flex-row items-center justify-start gap-3",
					className
				)}
			>
				{Object.entries(ICONS).map(([key, value]) => {
					return (
						<ToolbarButton
							key={key}
							icon={value}
							isToggled={state[key as keyof typeof state]}
							className={toolbarButtonClassName}
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
			<View className="flex flex-row items-center justify-end">
				<ToolbarButton
					key={"undo"}
					icon={UndoIcon}
					className={cn(
						"rounded-tr-none rounded-br-none",
						toolbarButtonClassName
					)}
					onPress={() => {
						editor.current?.sendAction("undo", "result", true);
					}}
				/>
				<ToolbarButton
					key={"redo"}
					icon={UndoIcon}
					iconProps={{ transform: [{ scaleX: -1 }] }}
					className={cn(
						"rounded-tl-none rounded-bl-none border-l-0",
						toolbarButtonClassName
					)}
					onPress={() => {
						editor.current?.sendAction("redo", "result", true);
					}}
				/>
			</View>
		</View>
	);
}

interface ToolbarButtonProps {
	icon: React.FC<SvgProps>;
	iconProps?: SvgProps;
	isToggled?: boolean;
	className?: string;
	onPress?: () => void;
}

function ToolbarButton({
	icon: Icon,
	iconProps,
	className,
	isToggled,
	onPress,
}: ToolbarButtonProps) {
	return (
		<RectButton
			className={cn("overflow-hidden rounded-lg web:transition-colors", {
				"bg-primary": isToggled,
				"web:hover:bg-300": !isToggled,
			})}
			onPress={onPress}
		>
			<Container
				className={cn("rounded-lg p-2.5 bg-transparent", className)}
			>
				<Icon
					width={24}
					height={24}
					color={`rgb(${colors.dark.neutral})`}
					{...iconProps}
				/>
			</Container>
		</RectButton>
	);
}

const ICONS = {
	bold: BoldIcon,
	italic: ItalicIcon,
	underline: UnderlineIcon,
	strikeThrough: StrikethroughIcon,
};

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
