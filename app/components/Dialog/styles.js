import { StyleSheet } from "react-native";
import {
	CONTENT,
	MODAL,
	FONTS,
} from "./../../config/styles";

const themes = {
	default: {
		titleStyle: {
			color: MODAL.titleColor,
		},
	},
};

const styles = StyleSheet.create({
	modal        : {
		alignItems    : "center",
		justifyContent: "center",
		margin        : 0,
	},
	modalBottom  : {
		justifyContent: "flex-end",
		margin        : 0,
	},
	dialog       : {
		paddingTop     : 20,
		width          : "100%",
		maxWidth       : 270,
		maxHeight      : "90%",
		backgroundColor: MODAL.backgroundColor,
		borderRadius   : MODAL.borderRadius,
		overflow       : "hidden",
	},
	dialogBottom : {
		paddingTop          : 30,
		width               : "100%",
		maxHeight           : "90%",
		backgroundColor     : MODAL.backgroundColor,
		borderTopLeftRadius : 30,
		borderTopRightRadius: 30,
		overflow            : "hidden",
	},
	Success        : {
		top				: -28,
		padding      	: 20,
		marginHorizontal: 0,
		fontFamily		: FONTS.fontFamily,
		fontSize  		: FONTS.sizeLarge + 2,
		lineHeight		: FONTS.sizeLarge + 3,
		color     		: '#437711',
		backgroundColor	: "#f0faec",
		textAlign       : "center",
	},
	title        : {
		paddingTop      : 15,
		marginBottom    : 10,
		marginHorizontal: 18,
		fontFamily      : MODAL.titleFontFamily,
		fontSize        : MODAL.titleFontSize,
		lineHeight      : MODAL.titleFontSize + 3,
		textAlign       : "center",
	},
	content      : {
		paddingVertical  : 10,
		paddingHorizontal: 30,
		width            : "100%",
	},
	contentBottom: {
		paddingTop       : 10,
		paddingBottom    : 20,
		paddingHorizontal: CONTENT.paddingHorizontal,
		width            : "100%",
	},
});

export {
	styles,
	themes,
};
