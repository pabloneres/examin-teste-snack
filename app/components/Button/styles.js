import { StyleSheet } from "react-native";

import {
	BUTTONS,
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	COLOR_THIRD,
} from "./../../config/styles";

import { hexToRgb, lightenDarkenColor } from "./../../helpers/color";

const rgbColorPrimary = hexToRgb(COLOR_PRIMARY);

const themes = {
	default    : {
		activeOpacity          : 0.8,
		loadingColor           : "#fff",
		androidBorderless      : false,
		androidPressColor      : "rgba(255,255,255, 0.6)",
		disabledColor          : "#fff",
		disabledBackgroundColor: "#cab1f9",
		gradientProps          : {
			colors: [COLOR_PRIMARY, lightenDarkenColor(COLOR_PRIMARY, -20)],
		},
		styleWrap              : {
			backgroundColor: COLOR_PRIMARY,
		},
		styleWrapShadow        : {
			elevation    : 6,
			shadowColor  : COLOR_PRIMARY,
			shadowOffset : {width: 0, height: 4},
			shadowOpacity: 0.3,
			shadowRadius : 5,
		},
		styleButton            : {},
		styleText              : {
			color: "#fff",
		},
		styleIcon              : {
			color: "#fff",
		},
	},
	secondary  : {
		activeOpacity          : 0.8,
		loadingColor           : "#fff",
		androidBorderless      : false,
		androidPressColor      : "rgba(255,255,255, 0.6)",
		disabledColor          : "#fff",
		disabledBackgroundColor: "#7a8bb5",
		gradientProps          : {
			colors: [COLOR_SECONDARY, lightenDarkenColor(COLOR_SECONDARY, -20)],
		},
		styleWrap              : {
			backgroundColor: COLOR_THIRD,
		},
		styleWrapShadow        : {
			elevation    : 6,
			shadowColor  : COLOR_SECONDARY,
			shadowOffset : {width: 0, height: 4},
			shadowOpacity: 0.3,
			shadowRadius : 5,
		},
		styleButton            : {},
		styleText              : {
			color: COLOR_PRIMARY,
		},
		styleIcon              : {
			color: "#fff",
		},
	},
	light      : {
		activeOpacity          : 0.8,
		loadingColor           : COLOR_PRIMARY,
		androidBorderless      : false,
		androidPressColor      : `rgba(${rgbColorPrimary}, 0.32)`,
		disabledColor          : COLOR_PRIMARY,
		disabledBackgroundColor: "#f1f1f1",
		gradientProps          : {
			colors: ["#edeff2", "#d0dbec"],
		},
		styleWrap              : {
			backgroundColor: "#edeff2",
		},
		styleWrapShadow        : {
			elevation    : 6,
			shadowColor  : COLOR_PRIMARY,
			shadowOffset : {width: 0, height: 4},
			shadowOpacity: 0.3,
			shadowRadius : 5,
		},
		styleButton            : {},
		styleText              : {
			color: "#565767",
		},
		styleIcon              : {
			color: "#565767",
		},
	},
	black      : {
		activeOpacity          : 0.8,
		loadingColor           : "#fff",
		androidBorderless      : false,
		androidPressColor      : "rgba(255,255,255, 0.6)",
		disabledColor          : "#fff",
		disabledBackgroundColor: "#626262",
		gradientProps          : {
			colors: ["#ccc", "#000"],
		},
		styleWrap              : {
			backgroundColor: "#000",
		},
		styleWrapShadow        : {
			elevation    : 6,
			shadowColor  : COLOR_PRIMARY,
			shadowOffset : {width: 0, height: 4},
			shadowOpacity: 0.3,
			shadowRadius : 5,
		},
		styleButton            : {},
		styleText              : {
			color: "#fff",
		},
		styleIcon              : {
			color: "#fff",
		},
	},
	white      : {
		activeOpacity          : 0.8,
		loadingColor           : COLOR_PRIMARY,
		androidBorderless      : false,
		androidPressColor      : `rgba(${rgbColorPrimary}, 0.32)`,
		disabledColor          : `rgba(${rgbColorPrimary}, 0.4)`,
		disabledBackgroundColor: "#fff",
		gradientProps          : {
			colors: ["#fff", "#fff"],
		},
		styleWrap              : {
			backgroundColor: "#fff",
		},
		styleWrapShadow        : {
			elevation    : 6,
			shadowColor  : "#373d53",
			shadowOffset : {width: 0, height: 3},
			shadowOpacity: 0.18,
			shadowRadius : 5,
		},
		styleButton            : {},
		styleText              : {
			color: COLOR_SECONDARY,
		},
		styleIcon              : {
			color: COLOR_PRIMARY,
		},
	},
	outline    : {
		activeOpacity          : 0.8,
		loadingColor           : COLOR_PRIMARY,
		androidBorderless      : false,
		androidPressColor      : `rgba(158, 171, 181, 0.32)`,
		disabledColor          : COLOR_PRIMARY,
		disabledBackgroundColor: "transparent",
		gradientProps          : {
			colors: ["#fff", "#fff"],
		},
		styleWrap              : {
			borderWidth: 2,
			borderColor: "#e3e8ec",
		},
		styleWrapShadow        : {},
		styleButton            : {
			// Fix height border
			height: BUTTONS.height - 4,
		},
		styleText              : {
			color: "#9eabb5",
		},
		styleIcon              : {
			color: "#9eabb5",
		},
	},
	link       : {
		activeOpacity          : 0.8,
		loadingColor           : COLOR_PRIMARY,
		androidBorderless      : false,
		androidPressColor      : `rgba(${rgbColorPrimary}, 0.32)`,
		disabledColor          : `rgba(${rgbColorPrimary}, 0.4)`,
		disabledBackgroundColor: "transparent",
		gradientProps          : {
			colors: ["#fff", "#fff"],
		},
		styleWrap              : {},
		styleWrapShadow        : {},
		styleButton            : {},
		styleText              : {
			color: COLOR_PRIMARY,
		},
		styleIcon              : {
			color: COLOR_PRIMARY,
		},
	},
	link_white : {
		activeOpacity          : 0.8,
		loadingColor           : "#fff",
		androidBorderless      : false,
		androidPressColor      : `rgba(255, 255, 255, 0.6)`,
		disabledColor          : `rgba(255, 255, 255, 0.6)`,
		disabledBackgroundColor: "transparent",
		gradientProps          : {
			colors: ["#fff", "#fff"],
		},
		styleWrap              : {},
		styleWrapShadow        : {},
		styleButton            : {},
		styleText              : {
			color: "#fff",
		},
		styleIcon              : {
			color: "#fff",
		},
	},
	transparent: {
		activeOpacity          : 0.8,
		loadingColor           : COLOR_PRIMARY,
		androidBorderless      : false,
		androidPressColor      : `rgba(${rgbColorPrimary}, 0.32)`,
		disabledColor          : COLOR_PRIMARY,
		disabledBackgroundColor: "transparent",
		gradientProps          : {
			colors: ["#fff", "#fff"],
		},
		styleWrap              : {},
		styleWrapShadow        : {},
		styleButton            : {},
		styleText              : {
			color: COLOR_PRIMARY,
		},
		styleIcon              : {
			color: COLOR_PRIMARY,
		},
	},
};

const types = {
	default    : {
		styleWrap              : {},
		styleButton            : {},
		styleText              : {},
		styleIcon              : {},
		styleIconPosition_left : {
			marginRight: BUTTONS.iconMargin,
		},
		styleIconPosition_right: {
			marginLeft: BUTTONS.iconMargin,
		},
	},
	small      : {
		styleWrap              : {},
		styleButton            : {
			height: 40,
		},
		styleText              : {
			fontSize: 14,
		},
		styleIcon              : {
			fontSize: 11,
		},
		styleIconPosition_left : {
			marginRight: BUTTONS.iconMargin,
		},
		styleIconPosition_right: {
			marginLeft: BUTTONS.iconMargin,
		},
	},
	block      : {
		styleWrap              : {
			alignSelf: "stretch",
		},
		styleButton            : {
			paddingHorizontal: 5,
		},
		styleText              : {},
		styleIcon              : {},
		styleIconPosition_left : {
			marginRight: BUTTONS.iconMargin,
		},
		styleIconPosition_right: {
			marginLeft: BUTTONS.iconMargin,
		},
	},
	block_small: {
		styleWrap              : {
			alignSelf: "stretch",
		},
		styleButton            : {
			paddingHorizontal: 5,
			height           : 40,
		},
		styleText              : {
			fontSize: 14,
		},
		styleIcon              : {
			fontSize: 11,
		},
		styleIconPosition_left : {
			marginRight: BUTTONS.iconMargin,
		},
		styleIconPosition_right: {
			marginLeft: BUTTONS.iconMargin,
		},
	},
	icon       : {
		styleWrap              : {
			width: BUTTONS.height,
		},
		styleButton            : {
			paddingHorizontal: 0,
		},
		styleText              : {},
		styleIcon              : {
			width    : "100%",
			textAlign: "center",
		},
		styleIconPosition_left : {},
		styleIconPosition_right: {},
	},
};

const styles = StyleSheet.create({
	wrap             : {
		alignSelf: "center",
	},
	wrapBorder_radius: {
		borderRadius: BUTTONS.borderRadius,
	},
	wrapBorder_round : {
		borderRadius: BUTTONS.height / 2,
	},
	button           : {
		flexDirection    : "row",
		height           : BUTTONS.height,
		alignItems       : "center",
		justifyContent   : "center",
		paddingHorizontal: BUTTONS.paddingHorizontal,
	},
	text             : {
		fontFamily: BUTTONS.fontFamily,
		fontSize  : BUTTONS.fontSize,
		color     : "#fff",
		textAlign : "center",
	},
	icon             : {
		color   : "#fff",
		fontSize: BUTTONS.iconSize,
	},
});

export {
	styles,
	themes,
	types,
};
