import { useCallback, type RefObject } from "react";
import { Pressable, View } from "react-native";

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

import { cn } from "@/libs/utils";
import colors from "@/constants/colors";

// Icons
import HeadingIcon from "@/assets/icons/editor/heading.svg";
import BoldIcon from "@/assets/icons/editor/bold.svg";
import ItalicIcon from "@/assets/icons/editor/italic.svg";
import UnderlineIcon from "@/assets/icons/editor/underline.svg";
import StrikethroughIcon from "@/assets/icons/editor/strikethrough.svg";

import TooltipArrowIcon from "@/assets/icons/tooltip.svg";

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

const FAST_PRESS_PERCENTAGE = 0.2;
const BUTTON_HOLD_TIME = 2000;

export function PublishButton({ onPress, className }: PublishButtonProps) {
	const progress = useSharedValue(0);
	const tooltipProgress = useSharedValue(0);

	const tooltipAnimationStyle = useAnimatedStyle(() => ({
		opacity: tooltipProgress.value,
		//transform: [{ translateY: withSpring(tooltipProgress.value * 56) }],
		top: withSpring(tooltipProgress.value * 56),
	}));

	const onFastPress = useCallback(() => {
		if (tooltipProgress.value === 0) {
			// Prevents multiple animationsw
			tooltipProgress.value = withTiming(1, {
				duration: 200,
			});

			setTimeout(() => {
				tooltipProgress.value = withTiming(0, {
					duration: 200,
				});
			}, 2000);
		}
	}, []);

	return (
		<Pressable
			className={cn("flex flex-1 rounded-lg relative", className)}
			onPressIn={() => {
				progress.value = withTiming(1, {
					duration: BUTTON_HOLD_TIME,
				});
			}}
			onPressOut={() => {
				//console.log("press out.");
				const progressValueWhenReleased = progress.value;

				progress.value = withSpring(0, {
					damping: 15,
					stiffness: 150,
				});

				if (progressValueWhenReleased < FAST_PRESS_PERCENTAGE)
					onFastPress();
			}}
			android_ripple={{
				color: colors.dark.primary[100],
			}}
			onLongPress={() => {
				//console.log("long press.");
				onPress?.();
			}}
			delayLongPress={BUTTON_HOLD_TIME}
		>
			<Container
				className={
					"flex flex-row items-center justify-center rounded-lg px-10 py-4 landscape:py-2 gap-4 bg-transparent"
				}
			>
				<PublishIcon
					color={`rgb(${colors.dark.neutral})`}
					width={18}
					height={18}
				/>
				<Text>Publicar</Text>
			</Container>
			<Animated.View
				className="flex h-full w-full absolute rounded-lg bg-primary scale-x-0 -z-10"
				style={{
					transform: [
						{
							scaleX: progress,
						},
					],
					transformOrigin: "left",
				}}
			/>
			<View className="flex h-full w-full absolute rounded-lg bg-200 -z-20" />
			<Animated.View
				className="flex items-center justify-center w-full absolute rounded-lg border border-default z-20"
				style={[tooltipAnimationStyle]}
			>
				<TooltipArrowIcon className="absolute -top-2.5 left-1/2 -z-20" />
				<View className="flex-1 px-4 py-2.5">
					<Text className="text-xs">
						Pressione e segure para publicar!
					</Text>
				</View>
				<View className="flex h-full w-full absolute rounded-lg bg-primary -z-20" />
			</Animated.View>
		</Pressable>
	);
}
