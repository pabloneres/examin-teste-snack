import { StyleSheet } from "react-native";
import {
	COLOR_PRIMARY,
} from "./../../config/styles";

export default StyleSheet.create({
	fullTextWrapper: {
		opacity : 0,
		position: "absolute",
		left    : 0,
		top     : 0,
	},
	viewMoreBtn    : {
		alignSelf: "flex-start",
	},
	viewMoreText   : {
		color: COLOR_PRIMARY,
	},
	transparent    : {
		opacity: 0,
	},
});
