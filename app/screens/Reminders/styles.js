import { StyleSheet } from "react-native";

import { CONTENT, MENU_FLOAT, BORDER_RADIUS, BORDER_COLOR } from "~/config/styles";

export default StyleSheet.create({
	dividerRow             : {
		width          : "100%",
		height         : 1,
		backgroundColor: BORDER_COLOR,
	},
	item                   : {
		flexDirection : "row",
		justifyContent: "space-between",
		alignItems    : "center",
		marginVertical: 20
	},
	itemMenu               : {},
	itemMenuTrigger        : {
		flexDirection: "row",
		alignItems   : "center",
	},
	itemMenuOptionContainer: {
		...MENU_FLOAT.styleContainer,
		marginTop: -6,
	},
	itemMenuOptionWrap     : MENU_FLOAT.styleOptionWrap,
	itemMenuOptionText     : {
		...MENU_FLOAT.styleOptionText,
		textAlign: "left",
	},
})