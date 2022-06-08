import { StyleSheet } from "react-native";

import {
	CONTENT,
} from "./../../config/styles";

import { BOTTOM_BAR_HEIGHT } from "./../../config/general";

const themes = {
	default: {
		styleWrap         : {
			flex: 1,
		},
		styleScrollContent: {},
	},
	round  : {
		styleWrap         : {
			overflow            : "hidden",
			flex                : 1,
			backgroundColor     : "#fff",
			borderTopLeftRadius : 30,
			borderTopRightRadius: 30,
		},
		styleScrollContent: {},
	},
};

const styles = StyleSheet.create({
	scrollContentStyle: {
		flexGrow         : 1,
		paddingTop       : CONTENT.paddingVertical,
		paddingBottom    : CONTENT.paddingVertical + BOTTOM_BAR_HEIGHT,
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
});

export {
	styles,
	themes,
};
