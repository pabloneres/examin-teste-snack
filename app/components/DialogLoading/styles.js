import { StyleSheet } from "react-native";

import {
	COLOR_PRIMARY,
	MODAL,
} from "./../../config/styles";

const themes = {
	default: {
		indicatorColor: COLOR_PRIMARY,
	},
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems   : "center",
	},
	content  : {
		paddingTop   : 20,
		paddingBottom: 20,
		paddingLeft  : 20,
		paddingRight : 20,
	},
	title    : {
		marginTop   : 20,
		marginBottom: 5,
		marginLeft  : 20,
		marginRight : 20,
		textAlign   : "left",
	},
	text     : {
		flex      : 1,
		marginLeft: 20,
		fontFamily: MODAL.textFontFamily,
		fontSize  : MODAL.textFontSize,
		color     : MODAL.textColor,
	},
});

export {
	styles,
	themes,
};
