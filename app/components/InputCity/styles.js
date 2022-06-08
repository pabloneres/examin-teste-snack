import { StyleSheet } from "react-native";
import {
	COLOR_SECONDARY,
	ERROR_COLOR,
	FORM,
} from "./../../config/styles";

const themes = {
	default: {
		placeholderColor  : FORM.placeholderColor,
		errorColor        : ERROR_COLOR,
		arrowColor        : FORM.selectArrowColor,
		backgroundColor   : FORM.fieldBackgroundColor,
		borderColor       : FORM.fieldBorderColor,
		labelColor        : FORM.labelFontColor,
		disabledColor     : FORM.fieldDisabledBorderColor,
		disabledBackground: FORM.fieldDisabledBackground,
		iconColor         : FORM.iconColor,
		clearColor        : FORM.clearColor,
		buttonColor       : FORM.buttonColor,
		elementStyle      : {},
		labelStyle        : {},
		inputStyle        : {
			color: FORM.fieldColor,
		},
		errorStyle        : {},
	},
};

const styles = StyleSheet.create({
	container: {
		marginBottom: FORM.fieldSpacing,
	},
	element  : {
		flexDirection: "row",
		alignItems   : "center",
		height       : FORM.fieldHeight,
		borderWidth  : FORM.fieldBorderWidth,
		borderRadius : FORM.fieldBorderRadius,
	},
	label    : {
		paddingLeft  : 18,
		marginBottom : FORM.labelMarginBottom,
		fontFamily   : FORM.labelFontFamily,
		fontSize     : FORM.labelFontSize,
		textAlign    : FORM.labelTextAlign,
		textTransform: "uppercase",
	},
	input    : {
		flex             : 1,
		paddingHorizontal: 18,
		fontFamily       : FORM.fontFamily,
		fontSize         : FORM.fieldFontSize,
	},
	icon     : {
		alignItems    : "center",
		justifyContent: "center",
		width         : 35,
	},
	arrow    : {
		alignItems: "center",
		width     : 30,
	},
	clearBtn : {
		alignSelf  : "center",
		marginRight: 10,
	},
	error    : {
		paddingTop: 5,
		fontFamily: FORM.errorFontFamily,
		fontSize  : FORM.errorFontSize,
	},
});

export {
	styles,
	themes,
};
