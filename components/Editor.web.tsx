import { Link } from "expo-router";
import Head from "expo-router/head";

export default function Editor() {
	return (
		<>
			<Head>
				<title>Seus pensamentos</title>
				<meta
					name="description"
					content="This is the profile page, where you can see your thoughts and write more."
				/>
			</Head>
			<div>
				<h1>Editor</h1>
			</div>
		</>
	);
}
