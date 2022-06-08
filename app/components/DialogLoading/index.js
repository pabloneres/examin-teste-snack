import React, { Component } from "react";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import {
	ActivityIndicator,
	Text,
	View,
} from "react-native";

import { STATUS_BAR_DARK } from "./../../config/styles";

import {
	styles,
	themes,
} from "./styles";

import UIDialog from "./../Dialog";

class UIDialogLoading extends Component {
	static propTypes = {
		...UIDialog.propTypes,
		message               : PropTypes.string.isRequired,
		messageStyle          : Text.propTypes.style,
		activityIndicatorSize : PropTypes.any,
		activityIndicatorStyle: PropTypes.any,
		theme                 : PropTypes.oneOf(["default"]),
	};

	static defaultProps = {
		theme                : "default",
		activityIndicatorSize: "large",
		titleStyle           : styles.title,
		contentStyle         : styles.content,
	};

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	render() {
		// Fix bug ios multiple modal
		if( !this.props.visible ) return null;

		const themeIndicatorColor = this.getThemeConfig("indicatorColor");

		const {message, messageStyle, activityIndicatorSize, activityIndicatorStyle, ...rest} = this.props;

		return (
			<UIDialog
				dialogStyle={{paddingTop: 0}}
				animationIn="fadeIn"
				// Fix bug ios multiple modal
				animationOut="fadeOut"
				animationOutTiming={1}
				{...rest}>
				<StatusBar {...STATUS_BAR_DARK} />
				<View style={styles.container}>
					<ActivityIndicator animating={true} color={themeIndicatorColor} size={activityIndicatorSize} style={activityIndicatorStyle} />
					<Text style={[styles.text, messageStyle]}>
						{message}
					</Text>
				</View>
			</UIDialog>
		);
	}
}

export default UIDialogLoading;
