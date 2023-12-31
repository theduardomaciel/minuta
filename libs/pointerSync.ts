import { Platform } from "react-native";

export function syncPointer() {
	// Sync pointer position with CSS variables
	if (Platform.OS === "web") {
		const syncPointer = ({ x, y }: { x: number; y: number }) => {
			document.documentElement.style.setProperty("--x", x.toFixed(2));
			document.documentElement.style.setProperty(
				"--xp",
				(x / window.innerWidth).toFixed(2)
			);
			document.documentElement.style.setProperty("--y", y.toFixed(2));
			document.documentElement.style.setProperty(
				"--yp",
				(y / window.innerHeight).toFixed(2)
			);
		};

		document.body.addEventListener("pointermove", syncPointer);
	}
}
