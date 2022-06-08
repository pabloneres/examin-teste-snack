import { StyleSheet } from "react-native";

import {
	CONTENT,
} from "./../../config/styles";

export default StyleSheet.create({
	contentStyle: {
		flexGrow         : 1,
		paddingTop       : 70,
		paddingBottom    : CONTENT.paddingVertical,
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
	dialogStyle : {
		paddingTop: 0,
	},
	btnClose    : {
		position: "absolute",
		top     : 5,
		left    : 5,
	},
});
