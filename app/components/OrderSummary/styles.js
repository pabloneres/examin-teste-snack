import {
	Dimensions,
	Platform,
	StyleSheet,
} from "react-native";

import { STATUS_BAR_HEIGHT } from "./../../config/general";

const {height: viewportHeight} = Dimensions.get("window");

export default StyleSheet.create({
	summaryModal            : {
		justifyContent: "flex-end",
		margin        : 0,
	},
	summaryModalInner       : {
		width    : "100%",
		height   : Platform.OS === "ios" ? viewportHeight - STATUS_BAR_HEIGHT : "100%",
		maxHeight: "100%",
	},
	summaryModalBtnClose    : {
		position: "absolute",
		top     : 5,
		left    : 5,
	},
	summaryItem             : {
		flexDirection  : "row",
		alignItems     : "center",
		paddingVertical: 8,
		borderTopColor : "#f5f5f5",
	},
	summaryItemImage        : {
		marginRight: 15,
	},
	summaryItemContent      : {
		flex: 1,
	},
	summaryItemContentFooter: {
		flexDirection : "row",
		alignItems    : "center",
		justifyContent: "space-between",
	},
});
