import { StyleSheet } from 'react-native'
import { BORDER_RADIUS, BUTTONS, COLOR_THIRD, CONTENT } from '~/config/styles'
import { MENU_FLOAT } from '~/config/styles'
import { Dimensions } from "react-native";

const BUTTON_SIZE = ((Dimensions.get("screen").width - (CONTENT.paddingHorizontal * 2)) / 3) - 5

export default StyleSheet.create({
	profileContainer        : {
		flexDirection    : "row",
		alignItems       : "center",
		paddingHorizontal: CONTENT.paddingHorizontal,
		paddingTop       : 30,
		paddingBottom    : 20,
		backgroundColor  : "#fbf9f9",
		borderBottomWidth: 1,
		borderBottomColor: "#f2e7e7"
	},
	imageContainer          : {
		width          : 55,
		height         : 55,
		borderRadius   : 55 / 2,
		backgroundColor: "#979797",
		overflow       : "hidden"
	},
	cardsContainer          : {},
	cardStyles              : {
		marginBottom: 10,
		width       : "100%",
		height      : 152,
		borderRadius: 8,
		overflow    : "hidden",
	},
	backgroundImageContainer: {
		position: 'absolute',
		width   : "70%",
		height  : "100%",
		right   : 0
	},
	backgroundImage         : {
		height    : "100%",
		width     : "100%",
		marginLeft: "auto",
	},
	cardContent             : {
		flex          : 1,
		flexDirection : "column",
		padding       : 20,
		justifyContent: "space-between",
		zIndex        : 5
	},
	badgeCard               : {
		position: "absolute",
		top     : 20,
		right   : 20,
		zIndex  : 5
	},
	containerButtons        : {
		flexDirection : "row",
		justifyContent: "space-between",
	},
	buttonStyles            : {
		width          : BUTTON_SIZE,
		height         : BUTTON_SIZE,
		backgroundColor: "#fff",
		borderColor    : "#f2e7e7",
		borderWidth    : 1,
		borderRadius   : 20
	},
	buttonContent           : {
		flex             : 1,
		flexDirection    : "column",
		paddingTop       : 15,
		paddingBottom    : 0,
		paddingHorizontal: 15,
		justifyContent   : "space-between"
	},
	badgeButton             : {
		position: "absolute",
		top     : 15,
		right   : 15,
		zIndex  : 5
	},
	taskStyles              : {
		marginBottom   : 10,
		borderRadius   : BORDER_RADIUS,
		width          : "100%",
		height         : 48,
		backgroundColor: COLOR_THIRD,
		flexDirection  : "row",
		justifyContent : "space-between",
		alignItems     : "center"
	},
	taskContent             : {
		width         : "85%",
		paddingLeft   : 20,
		paddingRight  : 5,
		flexDirection : "row",
		justifyContent: "space-between"
	},
	itemMenuTrigger         : {
		flexDirection: "row",
		alignItems   : "center",
	},
	itemMenuOptionContainer : {
		...MENU_FLOAT.styleContainer,
		marginTop: -6,
	},
	itemMenuOptionWrap      : MENU_FLOAT.styleOptionWrap,
	itemMenuOptionText      : {
		...MENU_FLOAT.styleOptionText,
		textAlign: "left",
	},
})