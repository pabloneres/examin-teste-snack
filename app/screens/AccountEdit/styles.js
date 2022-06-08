import { StyleSheet } from "react-native";

import { BOTTOM_BAR_HEIGHT, STATUS_BAR_HEIGHT } from "~/config/general";

import {
	BORDER_RADIUS,
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	CONTENT,
	FONTS,
	HEADER,
} from "./../../config/styles";

export default StyleSheet.create({
    header           : {
		alignItems    : "center",
		justifyContent: "center",
		paddingTop    : STATUS_BAR_HEIGHT,
		height        : STATUS_BAR_HEIGHT + 250,
        marginBottom  : 30 
	},
    avatarWrap       : {
		justifyContent: "center",
		alignItems: "center",
		marginTop      : 10,
		marginBottom   : 30,
		backgroundColor: "#fff",
	},
	avatar           : {
        width          : 88,
		height         : 88,
		borderRadius   : 88/2,
		borderWidth	   : 4,
		borderColor    : "#f2e7e7",
		backgroundColor: "#fff",
        justifyContent : "center",
        alignItems     : "center"
	},
	avatarImage      : {
        width       : 88,
        height      : 88,
		borderWidth	: 4,
		borderColor : "#f2e7e7",
        borderRadius: 88/2
	},
	avatarBtn        : {
		alignItems     : "center",
        justifyContent : "center", 
		position       : "absolute",
        bottom         : 0,
		right          : -10,
        width          : 30,
		height         : 30,
		backgroundColor: "#f2e7e7",
		borderRadius   : 30/2,
	},
    btnClose          : {
        position: "absolute",
        top     : STATUS_BAR_HEIGHT + 5,
        left    : 5,
    },
    content          : {
        flex          : 1,
        justifyContent: "space-between"
    },
    loginContainer   : {
        flex             : 1,
    },
    registerSocial           : {
        flexDirection: "column",
        justifyContent: "center",
    },
    buttonSocialLogin: {
        width          : 50,
        height         : 50,
        margin         : 10,
        backgroundColor: "#ffffff38",
        borderRadius   : 25,
        justifyContent : "center",
        alignItems     : "center"
    },
    acceptOptionWrap : {
		flexDirection: "row",
		alignItems   : "center",
		marginBottom : 15,
	},
	acceptOptionCheck: {
		alignItems    : "center",
		justifyContent: "center",
		width         : 28,
		height        : 28,
		borderWidth   : 2,
		borderColor   : "#464646",
		borderRadius  : 6,
	},
	textOption		: {
		marginLeft: 15
	},
	typeOptionWrap  : {
		flexDirection: "row",
		alignItems   : "center",
	},
});
