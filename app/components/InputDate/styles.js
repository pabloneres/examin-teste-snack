import { StyleSheet } from "react-native";
import {
	ERROR_COLOR,
	FORM,
} from "./../../config/styles";

const themes = {
	default: {
		placeholderColor  : FORM.placeholderColor,
		errorColor        : ERROR_COLOR,
		borderColor       : FORM.fieldBorderColor,
		disabledColor     : FORM.fieldDisabledBorderColor,
		disabledBackground: FORM.fieldDisabledBackground,
		iconColor         : FORM.iconColor,
		clearColor        : FORM.clearColor,
		arrowColor        : FORM.selectArrowColor,
		elementStyle      : {
			backgroundColor: FORM.fieldBackgroundColor,
		},
		labelStyle        : {
			color: FORM.labelFontColor,
		},
		fieldStyle        : {
			color: FORM.fieldColor,
		},
		errorStyle        : {},
	},
};

const styles = StyleSheet.create({
	container             : {
		marginBottom: FORM.fieldSpacing,
	},
	element               : {
		flexDirection: "row",
		alignItems   : "center",
		height       : FORM.fieldHeight,
		borderWidth  : FORM.fieldBorderWidth,
		borderRadius : FORM.fieldBorderRadius,
	},
	label                 : {
		paddingLeft  : 18,
		marginBottom : FORM.labelMarginBottom,
		fontFamily   : FORM.labelFontFamily,
		fontSize     : FORM.labelFontSize,
		textAlign    : FORM.labelTextAlign,
		textTransform: "uppercase",
	},
	field                 : {
		flex             : 1,
		paddingHorizontal: 16,
		fontFamily       : FORM.fontFamily,
		fontSize         : FORM.fieldFontSize,
	},
	icon                  : {
		alignItems: "center",
		width     : 45,
	},
	clearBtn              : {
		alignSelf      : "center",
		alignItems     : "center",
		justifyContent : "center",
		marginRight    : 10,
		width          : 24,
		height         : 24,
		backgroundColor: "#faf1f1",
		borderRadius   : 12,
	},
	arrow                 : {
		alignItems: "center",
		width     : 30,
	},
	error                 : {
		paddingTop: 5,
		fontFamily: FORM.errorFontFamily,
		fontSize  : FORM.errorFontSize,
	},
	iosModalOverlay       : {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,.3)",
	},
	iosModalContainerWrap : {
		flex             : 1,
		justifyContent   : "flex-end",
		paddingHorizontal: 15,
		paddingBottom    : 20,
	},
	iosModalContainer     : {
		backgroundColor: "#fff",
		borderRadius   : 15,
	},
	iosModalTitleContainer: {
		padding          : 14,
		borderBottomColor: "#d5d5d5",
		borderBottomWidth: 1,
	},
	iosModalTitleText     : {
		fontSize : 13,
		color    : "#8f8f8f",
		textAlign: "center",
	},
	iosModalConfirmBtn    : {
		alignItems    : "center",
		justifyContent: "center",
		height        : 57,
		borderTopColor: "#d5d5d5",
		borderTopWidth: 1,
	},
	iosModalConfirmBtnText: {
		fontSize: 20,
		color   : "#007ff9",
	},
	iosModalCancelBtn     : {
		alignItems       : "center",
		justifyContent   : "center",
		paddingHorizontal: 10,
		marginTop        : 10,
		height           : 57,
		backgroundColor  : "#fff",
		borderRadius     : 15,
	},
	iosModalCancelBtnText : {
		fontWeight: "600",
		fontSize  : 20,
		color     : "#007ff9",
	},
});

export {
	styles,
	themes,
};
