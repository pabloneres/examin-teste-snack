import { StyleSheet } from "react-native";

export default StyleSheet.create({
	item         : {
		flexDirection: "row",
		alignItems   : "center",
		height       : 54,
		paddingRight : 5
	},
	listSeparator: {
		height         : 1,
		backgroundColor: "#f2e7e7",
	},
	buttonDelete : {
		position       : "absolute",
		bottom         : 50,
		backgroundColor: "#2e2e2e"
	}
});
