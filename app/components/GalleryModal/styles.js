import { StyleSheet } from "react-native";

import {
	FONTS,
} from "./../../config/styles";

export default StyleSheet.create({
	header    : {
		flexDirection  : "row",
		alignItems     : "stretch",
		justifyContent : "space-between",
		position       : "absolute",
		top            : 0,
		left           : 0,
		right          : 0,
		height         : 65,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	btnClose  : {
		justifyContent   : "center",
		paddingHorizontal: 15,
	},
	count     : {
		alignSelf   : "center",
		paddingRight: 20,
		fontFamily  : FONTS.fontFamily,
		fontSize    : FONTS.sizeBase,
		color       : "#fff",
	},
	footer    : {
		justifyContent : "center",
		position       : "absolute",
		bottom         : 0,
		left           : 0,
		right          : 0,
		padding        : 10,
		minHeight      : 65,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	footerText: {
		fontFamily: FONTS.fontFamily,
		fontSize  : FONTS.sizeBase,
		color     : "#fff",
		textAlign : "center",
	},
	error     : {
		flex          : 1,
		alignItems    : "center",
		justifyContent: "center",
	},
	errorText : {
		fontFamily: FONTS.fontFamily,
		fontSize  : FONTS.sizeBase,
		color     : "#fff",
	},
	gallery   : {
		flex           : 1,
		backgroundColor: "rgba(0,0,0,0.85)",
	}
});
