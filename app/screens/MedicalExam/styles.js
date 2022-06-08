import { StyleSheet } from "react-native";
import { BORDER_COLOR, BORDER_RADIUS, CONTENT } from "~/config/styles";

export default StyleSheet.create({
	searchContainer : {
		paddingTop       : 20,
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
	filterContainer : {
		marginTop     : 0,
		flexDirection : "row",
		justifyContent: "flex-end"
	},
	vaccineContainer: {
		marginBottom     : 20,
		paddingHorizontal: 25,
		paddingVertical  : 15,
		borderWidth      : 1,
		borderColor      : BORDER_COLOR,
		borderRadius     : BORDER_RADIUS,
		flexDirection    : "row",
		justifyContent   : "space-between",
		alignItems       : "center"
	},
	loading         : {
		flex          : 1,
		justifyContent: "center",
		alignItems    : "center"
	}
})