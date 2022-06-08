import { StyleSheet } from "react-native";

import {
	CONTENT,
	FORM,
	FONTS,
} from "./../../config/styles";

import { BOTTOM_BAR_HEIGHT } from "./../../config/general";

const themes = {
	default: {
		listSeparatorStyle : {
			backgroundColor: FORM.selectListSeparatorColor,
		},
		itemStyle          : {},
		itemTitleStyle     : {
			color: FORM.selectListTitleColor,
		},
		itemTextStyle      : {
			color: FORM.selectListColor,
		},
		itemIconStyle      : {
			color: FORM.selectListIconColor,
		},
		itemArrowStyle     : {
			color: FORM.selectListColor,
		},
		itemActiveStyle    : {},
		itemActiveTextStyle: {
			color: FORM.selectActiveListColor,
		},
		itemActiveIconStyle: {
			color: FORM.selectActiveListIconColor,
		},
	},
};

const styles = StyleSheet.create({
	contentWrap       : {
		overflow            : "hidden",
		flex                : 1,
		backgroundColor     : "#fff",
		borderTopLeftRadius : 30,
		borderTopRightRadius: 30,
	},
	scrollContentStyle: {
		flexGrow         : 1,
		paddingVertical  : 14,
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
	listEmpty         : {
		flexGrow      : 1,
		alignItems    : "center",
		justifyContent: "center",
		padding       : 20,
	},
	listEmptyText     : {
		fontFamily: FONTS.fontFamily,
		fontSize  : FONTS.sizeBase,
		color     : FONTS.color,
		textAlign : "center",
	},
	listSeparator     : {
		height: 2,
	},
	item              : {
		flexDirection  : "row",
		alignItems     : "center",
		paddingVertical: 14,
		minHeight      : FORM.selectListHeight,
	},
	itemTitle         : {
		marginVertical: 20,
		fontFamily    : FORM.selectListTitleFontFamily,
		fontSize      : FORM.selectListTitleFontSize,
	},
	itemText          : {
		flex      : 1,
		fontFamily: FORM.selectListFontFamily,
		fontSize  : FORM.selectListFontSize,
	},
	itemIcon          : {
		width: 40,
	},
	itemIconRight     : {
		textAlign: "right",
	},
	itemActive        : {},
	itemActiveText    : {},
	itemActiveIcon    : {},
	footer            : {
		overflow      : "hidden",
		justifyContent: "flex-end",
		position      : "absolute",
		bottom        : 0,
		left          : 0,
		right         : 0,
		height        : 150,
		paddingBottom : 20 + BOTTOM_BAR_HEIGHT,
	},
	footerImage       : {
		position: "absolute",
		top     : 0,
		left    : 0,
		right   : 0,
		width   : "100%",
		height  : 150,
	},
	footerInner       : {
		paddingHorizontal: CONTENT.paddingHorizontal,
	},
});

export {
	styles,
	themes,
};
