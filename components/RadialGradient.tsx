import {
	Defs,
	Stop,
	Svg,
	RadialGradient as SVGRadialGradient,
	Path,
} from "react-native-svg";

export function RadialGradient() {
	return (
		<Svg
			className="absolute top-0 left-0 bottom-0 right-0 -z-10"
			height="100%"
			width="100%"
			viewBox="0 0 1 1"
		>
			<Path
				d="M0 0H375V279C375 283.418 371.418 287 367 287H8C3.58172 287 0 283.418 0 279V0Z"
				fill="url(#grad)"
			/>
			<Defs>
				<SVGRadialGradient
					id="grad"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(187.5 50.5) rotate(90) scale(180 350.061)"
				>
					<Stop stopColor={"#3730A3"} />
					<Stop stopColor={"#0F0E26"} offset={1} />
				</SVGRadialGradient>
			</Defs>
		</Svg>
	);
}
