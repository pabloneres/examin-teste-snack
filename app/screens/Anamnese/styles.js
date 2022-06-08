import { StyleSheet } from "react-native";
import { BORDER_COLOR, COLOR_FOURTH, COLOR_PRIMARY, COLOR_THIRD } from "~/config/styles";

export default StyleSheet.create({
	optionContainer  : {
		flexDirection: "row",
		marginBottom : 15,
		alignItems   : "center"
	},
	listItemContainer: {},
	loading          : {
		flex          : 1,
		justifyContent: "center",
		alignItems    : "center"
	}
})