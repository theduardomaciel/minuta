module.exports = function (api) {
	api.cache(false);
	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
		],
		plugins: [
			[
				"module:react-native-dotenv",
				{
					envName: "APP_ENV",
					moduleName: "@env",
					path: ".env",
					safe: false,
					allowUndefined: true,
					verbose: false,
				},
			],
			"react-native-reanimated/plugin", // Keep always as last plugin
		],
	};
};
