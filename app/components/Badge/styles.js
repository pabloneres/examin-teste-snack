import { StyleSheet } from "react-native";
import {
	FONTS,
} from "./../../config/styles";

export default StyleSheet.create({
	container: {
		alignItems     : "center",
		justifyContent : "center",
		minWidth       : 24,
		height         : 24,
		backgroundColor: "#eca125",
		borderRadius   : 12,
	},
	text     : {
		fontFamily: FONTS.fontFamilyMedium,
		fontSize  : 12,
		color     : "#fff",
		textAlign : "center",
	},
});
