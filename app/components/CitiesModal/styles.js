import { StyleSheet } from "react-native";

import {
	CONTENT,
	FONTS,
	FORM,
} from "./../../config/styles";

export default StyleSheet.create({
	contentWrap       : {
		overflow            : "hidden",
		flex                : 1,
		backgroundColor     : "#fff",
		borderTopLeftRadius : 30,
		borderTopRightRadius: 30,
	},
	scrollContentStyle: {
		flexGrow         : 1,
		paddingVertical  : 30,
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
	inputWrap         : {
		position: "relative",
	},
	inputSearch       : {
		paddingVertical: 0,
		paddingLeft    : 0,
		paddingRight   : 50,
		height         : 50,
		fontFamily     : FONTS.fontFamilyMedium,
		fontSize       : 20,
		color          : "#fff",
		backgroundColor: "transparent",
	},
	clearBtn          : {
		alignItems    : "center",
		justifyContent: "center",
		position      : "absolute",
		top           : 4,
		right         : 15,
		padding       : 5,
	},
	clearBtnInner     : {
		alignItems    : "center",
		justifyContent: "center",
		width         : 30,
		height        : 30,
	},
	loading           : {
		paddingTop: 40,
	},
	listSeparator     : {
		height         : 2,
		backgroundColor: FORM.selectListSeparatorColor,
	},
	item              : {
		flexDirection  : "row",
		alignItems     : "center",
		paddingVertical: 10,
		height         : FORM.selectListHeight,
	},
});
