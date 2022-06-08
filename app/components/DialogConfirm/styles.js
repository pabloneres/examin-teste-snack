import { StyleSheet } from "react-native";

import {
	BUTTONS,
	CONTENT,
	COLOR_SECONDARY,
	FONTS,
	MODAL,
	COLOR_PRIMARY,
} from "./../../config/styles";

import { BOTTOM_BAR_HEIGHT } from "./../../config/general";

const themes = {
	default: {
		buttonStyle: {
			backgroundColor: COLOR_PRIMARY,
		},
	},
};

const styles = StyleSheet.create({
	text              : {
		fontFamily: MODAL.textFontFamily,
		fontSize  : MODAL.textFontSize,
		color     : MODAL.textColor,
		textAlign : "center",
	},
	buttonDisabledText: {
		color: "#bbb",
	},
	// Horizontal
	buttonsContainer: {
		flexDirection    : "row",
		justifyContent   : "flex-end",
		paddingBottom    : 25 + BOTTOM_BAR_HEIGHT,
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
	button          : {
		flex             : 1,
		flexDirection    : "row",
		alignItems       : "center",
		justifyContent   : "center",
		paddingHorizontal: 10,
		height           : 54,
		borderRadius     : BUTTONS.borderRadius,
	},
	buttonText      : {
		fontFamily: FONTS.fontFamilyBold,
		fontSize  : 13,
		color     : "#fff",
		textAlign : "center",
	},
	buttonSeparator : {
		width: 10,
	},
	// Vertical
	buttonsContainerVertical: {
		paddingBottom    : 25 + BOTTOM_BAR_HEIGHT,
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
	buttonVertical          : {
		flexDirection    : "row",
		alignItems       : "center",
		justifyContent   : "center",
		paddingHorizontal: 5,
		height           : 54,
		borderRadius     : BUTTONS.borderRadius,
	},
	buttonVerticalText      : {
		fontFamily: FONTS.fontFamilyBold,
		fontSize  : 13,
		color     : "#fff",
		textAlign : "center",
	},
	buttonVerticalSeparator : {
		height: 10,
	},
});

export {
	styles,
	themes,
};
