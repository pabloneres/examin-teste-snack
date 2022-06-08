import { StyleSheet } from "react-native";
import {
	COLOR_SECONDARY,
	SWITCH,
} from "./../../config/styles";

const themes = {
	default  : {
		wrapColor        : SWITCH.wrapColor,
		buttonColor      : SWITCH.buttonColor,
		activeWrapColor  : SWITCH.activeWrapColor,
		activeButtonColor: SWITCH.activeButtonColor,
		buttonX          : 2,
		buttonXActive    : 20,
		containerStyle   : {},
		buttonStyle      : {},
	},
	secondary: {
		wrapColor        : SWITCH.wrapColor,
		buttonColor      : SWITCH.buttonColor,
		activeWrapColor  : COLOR_SECONDARY,
		activeButtonColor: SWITCH.activeButtonColor,
		buttonX          : 2,
		buttonXActive    : 22,
		containerStyle   : {},
		buttonStyle      : {},
	},
};

const styles = StyleSheet.create({
	container: {
		justifyContent : "center",
		width          : 40,
		height         : 22,
		borderRadius   : 11,
		backgroundColor: "#ccc",
	},
	button   : {
		width       : 18,
		height      : 18,
		borderRadius: 9,
	},
});

export {
	styles,
	themes,
};
