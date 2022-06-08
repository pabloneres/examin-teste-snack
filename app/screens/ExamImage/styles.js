import { StyleSheet } from "react-native";
import { BORDER_RADIUS, CONTENT } from "~/config/styles";

export default StyleSheet.create({
	imagesContainer: {
		flexDirection: "row",
	},
	imageContainer : {
		flex            : 1,
		marginHorizontal: 3,
		borderRadius    : BORDER_RADIUS,
		overflow        : "hidden",
		marginBottom    : 10,
	},
	imageStyles    : {
		width       : "100%",
		borderRadius: BORDER_RADIUS,
	}
})