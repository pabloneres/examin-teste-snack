import { StyleSheet } from "react-native";
import { BORDER_COLOR, COLOR_FOURTH, COLOR_PRIMARY, COLOR_THIRD } from "~/config/styles";

export default StyleSheet.create({
    optionContainer  : {
        flexDirection : "row",
        marginBottom  : 15,
        alignItems    : "center"
    },
    listItemContainer: {

    },
    acceptOptionCheck: {
		alignItems     : "center",
		justifyContent : "center",
		width          : 28,
		height         : 28,
		borderWidth    : 2,
		borderColor    : BORDER_COLOR,
		borderRadius   : 5,
        backgroundColor: COLOR_FOURTH,
        marginRight    : 15
	},
    checkedOption    : {
        backgroundColor: COLOR_PRIMARY,
        width          : 18,
		height         : 18,
        borderRadius   : 5,
    }
})