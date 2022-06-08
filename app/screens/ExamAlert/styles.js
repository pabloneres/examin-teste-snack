import { StyleSheet } from "react-native";

import { CONTENT, MENU_FLOAT, BORDER_RADIUS, BORDER_COLOR } from "~/config/styles";

export default StyleSheet.create({
	dividerRow             : {
		width          : "100%",
		height         : 1,
		backgroundColor: BORDER_COLOR,
	},
	item                   : {
		flexDirection  : "row",
		alignItems     : "center",
		justifyContent : "space-between",
		paddingVertical: 20
	},
	itemMenu               : {},
	itemMenuTrigger        : {
		alignItems    : "center",
		justifyContent: "center",
		width         : 30,
		paddingRight  : 10
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
	loading                : {
		flex          : 1,
		justifyContent: "center",
		alignItems    : "center"
	}
})