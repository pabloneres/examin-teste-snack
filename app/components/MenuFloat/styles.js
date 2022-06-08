import { StyleSheet } from "react-native";
import { MENU_FLOAT } from "~/config/styles";

export default StyleSheet.create({
	itemMenuTrigger        : {
		paddingLeft   : 20,
		paddingRight  : 10,
		flexDirection : "row",
		alignItems    : "center",
		justifyContent: "flex-end"
	},
	itemMenuOptionContainer: {
		...MENU_FLOAT.styleContainer,
		marginTop: -10,
	},
	itemMenuOptionWrap     : MENU_FLOAT.styleOptionWrap,
	itemMenuOptionText     : {
		...MENU_FLOAT.styleOptionText,
	},
})