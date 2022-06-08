// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------
// Only HEX colors
export const COLOR_PRIMARY    = "#925529";
export const COLOR_SECONDARY  = "#425c9e";
export const COLOR_THIRD      = "#f6ede8"; //NOT DEFINED
export const COLOR_FOURTH     = "#fbf9f9";
export const TEXT_COLOR       = "#000";
export const TEXT_COLOR_ALT   = "#79848d";
export const TITLE_COLOR      = "#252525";
export const SUBTITLE_COLOR   = "#989292";
export const BACKGROUND_COLOR = "#fff";
export const BORDER_COLOR     = "#f2e7e7";
export const BORDER_RADIUS    = 5;
export const ERROR_COLOR      = "#d50000";

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------
export const FONTS = {
	fontFamily      : "grotesk",
	fontFamilyMedium: "groteskmedium",
	fontFamilyBold  : "groteskbold",
	fontFamilyBlack : "groteskbold",
	sizeExtraSmall  : 9,
	sizeSmall       : 10,
	sizeMiddle      : 12,
	sizeBase        : 14,
	sizeLarge       : 17,
	sizeExtraLarge  : 21,
	sizeIcon        : 17,
	lineHeightPlus  : 7,
	color           : TEXT_COLOR,
	colorAlt        : TEXT_COLOR_ALT,
	titleColor      : TITLE_COLOR,
};

// -----------------------------------------------------------------------------
// Header
// -----------------------------------------------------------------------------
export const HEADER = {
	height            : 56,
	backgroundColor   : "#fbf9f9",
	fontFamily        : FONTS.fontFamilyBold,
	fontSize          : FONTS.sizeLarge,
	color             : "#2d2e2e",
	subTitleFontFamily: FONTS.fontFamily,
	subTitleFontSize  : FONTS.sizeMiddle,
	subTitleColor     : SUBTITLE_COLOR,
	iconWidth         : 55,
	iconSize          : 17,
	iconColor         : "#000",
};

// -----------------------------------------------------------------------------
// StatusBar
// -----------------------------------------------------------------------------
export const STATUS_BAR_WHITE = {
	style          : "dark",
	backgroundColor: "#fff",
};

export const STATUS_BAR_PRIMARY = {
	style          : "dark",
	backgroundColor: "#fbf9f9",
};

export const STATUS_BAR_DARK = {
	style          : "light",
	backgroundColor: "#000",
};

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------
export const CONTENT = {
	paddingVertical  : 14,
	paddingHorizontal: 14,
};

// -----------------------------------------------------------------------------
// Buttons
// -----------------------------------------------------------------------------
export const BUTTONS = {
	paddingHorizontal: 30,
	height           : 48,
	iconMargin       : 8,
	fontFamily       : FONTS.fontFamilyBold,
	fontSize         : 15,
	iconSize         : 17,
	borderRadius     : BORDER_RADIUS,
};

// -----------------------------------------------------------------------------
// FORM
// -----------------------------------------------------------------------------
export const FORM = {
	fontFamily                : FONTS.fontFamily,
	fieldHeight               : 48,
	fieldSpacing              : 10,
	textareaMinHeight         : 100,
	placeholderColor          : "#989292",
	selectArrowColor          : "#9eabb5",
	labelMarginBottom         : 5,
	labelFontFamily           : FONTS.fontFamilyBold,
	labelFontSize             : 11,
	labelFontColor            : "#26160f",
	labelTextAlign            : "left",
	errorFontFamily           : FONTS.fontFamily,
	errorFontSize             : FONTS.sizeSmall,
	counterFontSize           : FONTS.sizeSmall,
	counterColor              : "#9c9c9c",
	fieldFontSize             : 15,
	fieldColor                : COLOR_PRIMARY,
	fieldBackgroundColor      : "#fbf9f9",
	fieldBorderWidth          : 1,
	fieldBorderColor          : "#f2e7e7",
	fieldBorderRadius         : 5,
	fieldFocusPlaceholderColor: "#9eabb5",
	fieldFocusBackgroundColor : "#ffffff",
	fieldFocusBorderColor     : COLOR_PRIMARY,
	fieldFocusLabelColor      : COLOR_PRIMARY,
	iconColor                 : "#9eabb5",
	clearColor                : COLOR_PRIMARY,
	buttonColor               : "#2d2e2e",
	fieldDisabledBorderColor  : "#d9d9d9",
	fieldDisabledBackground   : "#f2f2f2",
	selectListHeight          : 54,
	selectListFontFamily      : FONTS.fontFamily,
	selectListFontSize        : FONTS.sizeLarge,
	selectListColor           : "#2d2e2e",
	selectListIconColor       : "#eeeeee",
	selectActiveListColor     : COLOR_PRIMARY,
	selectActiveListIconColor : COLOR_PRIMARY,
	selectListSeparatorColor  : "#f3f4f6",
	selectListTitleFontFamily : FONTS.fontFamilyBold,
	selectListTitleFontSize   : 20,
	selectListTitleColor      : COLOR_PRIMARY,
};

// -----------------------------------------------------------------------------
// SWITCH
// -----------------------------------------------------------------------------
export const SWITCH = {
	wrapColor        : COLOR_PRIMARY,
	buttonColor      : "#fff",
	activeWrapColor  : "#61604a",
	activeButtonColor: "#fff",
};

// -----------------------------------------------------------------------------
// MODAL
// -----------------------------------------------------------------------------
export const MODAL = {
	titleFontFamily: FONTS.fontFamilyBold,
	titleFontSize  : 16,
	titleColor     : "#252525",
	textFontFamily : FONTS.fontFamily,
	textFontSize   : FONTS.sizeBase,
	textColor      : TEXT_COLOR,
	overlayRGBA    : "rgba(0, 0, 0, 0.5)",
	backgroundColor: "#ffffff",
	headerHeight   : 56,
	headerIconColor: "#2d2e2e",
	borderRadius   : 5,
};

// -----------------------------------------------------------------------------
// Toast
// -----------------------------------------------------------------------------
export const TOAST = {
	styleContainer: {
		alignItems       : "center",
		paddingVertical  : 12,
		paddingHorizontal: 20,
		marginHorizontal : 30,
		minWidth         : "90%",
		maxWidth         : "90%",
		backgroundColor  : "rgba(0,0,0, 1)",
		borderRadius     : 10,
	},
	styleText     : {
		fontFamily: FONTS.fontFamily,
		fontSize  : FONTS.sizeBase,
		color     : "#fff",
		textAlign : "center",
	},
};

// -----------------------------------------------------------------------------
// MenuFloat
// -----------------------------------------------------------------------------
export const MENU_FLOAT = {
	styleContainer    : {
		paddingVertical: 5,
		width          : "auto",
		minWidth       : 150,
		borderRadius   : 8,
		elevation      : 0,
		shadowOpacity  : 0,
	},
	styleOptionWrap   : {
		paddingVertical  : 14,
		paddingHorizontal: 18,
	},
	styleOptionDivider: {
		marginHorizontal: 0,
		height          : 1,
		backgroundColor : "#f2e7e7",
	},
	styleOptionText   : {
		fontFamily: FONTS.fontFamily,
		fontSize  : 13,
		color     : "#252525",
	},
};

//--------------------------------------------------
// CheckBox
// -------------------------------------------------

export const CHECKBOX = {
	acceptOptionCheck: {
		alignItems     : "center",
		justifyContent : "center",
		width          : 22,
		height         : 22,
		borderWidth    : 2,
		borderColor    : BORDER_COLOR,
		borderRadius   : 5,
		backgroundColor: COLOR_FOURTH,
		marginRight    : 15
	},
	checkedOption    : {
		backgroundColor: COLOR_PRIMARY,
		width          : 14,
		height         : 14,
		borderRadius   : 2,
	},
}