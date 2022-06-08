import { StyleSheet } from "react-native";
import { BUTTONS } from "./../../config/styles";

const theme = {
	iconSize: BUTTONS.iconSize,
};

const styles = StyleSheet.create({
	icon: {
		backgroundColor: "transparent",
	}
});

export {
	styles,
	theme,
};
