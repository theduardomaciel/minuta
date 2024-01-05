var Actions = {
	bold: {
		state: function () {
			return queryCommandState("bold");
		},
		result: function () {
			return exec("bold");
		},
	},
	italic: {
		state: function () {
			return queryCommandState("italic");
		},
		result: function () {
			return exec("italic");
		},
	},
	underline: {
		state: function () {
			return queryCommandState("underline");
		},
		result: function () {
			return exec("underline");
		},
	},
	strikeThrough: {
		state: function () {
			return queryCommandState("strikeThrough");
		},
		result: function () {
			return exec("strikeThrough");
		},
	},
	heading1: {
		state: function () {
			return queryCommandValue(formatBlock) === "h1";
		},
		result: function () {
			return exec(formatBlock, "<h1>");
		},
	},
	heading2: {
		state: function () {
			return queryCommandValue(formatBlock) === "h2";
		},
		result: function () {
			return exec(formatBlock, "<h2>");
		},
	},
	heading3: {
		state: function () {
			return queryCommandValue(formatBlock) === "h3";
		},
		result: function () {
			return exec(formatBlock, "<h3>");
		},
	},
	heading4: {
		state: function () {
			return queryCommandValue(formatBlock) === "h4";
		},
		result: function () {
			return exec(formatBlock, "<h4>");
		},
	},
	heading5: {
		state: function () {
			return queryCommandValue(formatBlock) === "h5";
		},
		result: function () {
			return exec(formatBlock, "<h5>");
		},
	},
	heading6: {
		state: function () {
			return queryCommandValue(formatBlock) === "h6";
		},
		result: function () {
			return exec(formatBlock, "<h6>");
		},
	},
	paragraph: {
		state: function () {
			return queryCommandValue(formatBlock) === "p";
		},
		result: function () {
			return exec(formatBlock, "<p>");
		},
	},
	quote: {
		result: function () {
			return exec(formatBlock, "<blockquote>");
		},
	},
};
