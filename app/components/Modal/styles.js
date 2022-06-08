import { StyleSheet } from "react-native";
import { BACKGROUND_COLOR, BORDER_RADIUS, MODAL } from "~/config/styles";

export default StyleSheet.create({
	modalContainer  : {
		width          : "100%",
		padding        : 30,
		paddingTop     : 30,
		backgroundColor: MODAL.backgroundColor,
		borderRadius   : MODAL.borderRadius
	},
	buttonsContainer: {
		width         : "100%",
		flexDirection : "row",
		justifyContent: "space-between",
	}
})