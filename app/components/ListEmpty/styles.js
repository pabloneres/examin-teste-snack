import { StyleSheet } from "react-native";

import {
	CONTENT,
} from "./../../config/styles";

export default StyleSheet.create({
	container: {
		flexGrow      : 1,
		alignItems    : "center",
		justifyContent: "center",
		padding       : CONTENT.paddingHorizontal,
	},
});
