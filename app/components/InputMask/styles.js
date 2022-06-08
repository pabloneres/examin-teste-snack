import { StyleSheet } from "react-native";
import {
	COLOR_SECONDARY,
	ERROR_COLOR,
	FORM,
} from "./../../config/styles";

const themes = {
	default  : {
		placeholderColor     : FORM.placeholderColor,
		errorColor           : ERROR_COLOR,
		backgroundColor      : FORM.fieldBackgroundColor,
		borderColor          : FORM.fieldBorderColor,
		labelColor           : FORM.labelFontColor,
		disabledColor        : FORM.fieldDisabledBorderColor,
		disabledBackground   : FORM.fieldDisabledBackground,
		focusPlaceholderColor: FORM.fieldFocusPlaceholderColor,
		focusBackgroundColor : FORM.fieldFocusBackgroundColor,
		focusBorderColor     : FORM.fieldFocusBorderColor,
		focusLabelColor      : FORM.fieldFocusLabelColor,
		iconColor            : FORM.iconColor,
		clearColor           : FORM.clearColor,
		buttonColor          : FORM.buttonColor,
		elementStyle         : {},
		labelStyle           : {},
		inputStyle           : {
			color: FORM.fieldColor,
		},
		buttonStyle          : {},
		errorStyle           : {},
		counterStyle         : {
			color: FORM.counterColor,
		},
	},
	secondary: {
		placeholderColor     : FORM.placeholderColor,
		errorColor           : ERROR_COLOR,
		backgroundColor      : FORM.fieldBackgroundColor,
		borderColor          : FORM.fieldBorderColor,
		labelColor           : FORM.labelFontColor,
		disabledColor        : FORM.fieldDisabledBorderColor,
		disabledBackground   : FORM.fieldDisabledBackground,
		focusPlaceholderColor: FORM.fieldFocusPlaceholderColor,
		focusBackgroundColor : FORM.fieldFocusBackgroundColor,
		focusBorderColor     : COLOR_SECONDARY,
		focusLabelColor      : COLOR_SECONDARY,
		iconColor            : FORM.iconColor,
		clearColor           : FORM.clearColor,
		buttonColor          : FORM.buttonColor,
		elementStyle         : {},
		labelStyle           : {},
		inputStyle           : {
			color: FORM.fieldColor,
		},
		buttonStyle          : {},
		errorStyle           : {},
		counterStyle         : {
			color: FORM.counterColor,
		},
	},
};

const styles = StyleSheet.create({
	container   : {
		marginBottom: FORM.fieldSpacing,
	},
	element     : {
		flexDirection: "row",
		borderWidth  : FORM.fieldBorderWidth,
		borderRadius : FORM.fieldBorderRadius,
	},
	label       : {
		paddingLeft  : 18,
		marginBottom : FORM.labelMarginBottom,
		fontFamily   : FORM.labelFontFamily,
		fontSize     : FORM.labelFontSize,
		textAlign    : FORM.labelTextAlign,
		textTransform: "uppercase",
	},
	input       : {
		flex             : 1,
		paddingHorizontal: 16,
		height           : FORM.fieldHeight,
		fontFamily       : FORM.fontFamily,
		fontSize         : FORM.fieldFontSize,
	},
	textarea    : {
		paddingTop   : 10,
		paddingBottom: 10,
		height       : "auto",
		minHeight    : FORM.textareaMinHeight,
	},
	icon        : {
		alignItems    : "center",
		justifyContent: "center",
		width         : 45,
	},
	iconTextarea: {
		justifyContent: "flex-start",
		paddingTop    : 11,
	},
	loading     : {
		alignItems    : "center",
		justifyContent: "center",
		width         : 45,
	},
	clearBtn    : {
		alignSelf      : "center",
		alignItems     : "center",
		justifyContent : "center",
		marginRight    : 10,
		width          : 24,
		height         : 24,
		backgroundColor: "#faf1f1",
		borderRadius   : 12,
	},
	button      : {
		alignItems    : "center",
		justifyContent: "center",
		width         : 45,
	},
	iconPassword: {
		alignItems    : "center",
		justifyContent: "center",
		width         : 40,
	},
	footer      : {
		flexDirection : "row",
		alignItems    : "flex-start",
		justifyContent: "flex-end",
	},
	error       : {
		flex        : 1,
		paddingTop  : 5,
		paddingRight: 10,
		fontFamily  : FORM.errorFontFamily,
		fontSize    : FORM.errorFontSize,
		textAlign   : "left",
	},
	counter     : {
		paddingTop: 5,
		fontFamily: FORM.fontFamily,
		fontSize  : FORM.counterFontSize,
	},
});

export {
	styles,
	themes,
};
