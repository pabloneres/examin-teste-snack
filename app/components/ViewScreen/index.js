import React, { Component } from "react";
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import {
	KeyboardAvoidingView,
	Platform,
	View,
	ViewPropTypes
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
	STATUS_BAR_WHITE,
	STATUS_BAR_PRIMARY,
	STATUS_BAR_DARK
} from "./../../config/styles";

import { STATUS_BAR_HEIGHT } from "./../../config/general";

import styles from "./styles";

class UIViewScreen extends Component {
	static propTypes = {
		...ViewPropTypes,
		enableStatusBar      : PropTypes.bool,
		enableStatusBarHeight: PropTypes.bool,
		hasForm              : PropTypes.bool,
		statusBarTheme       : PropTypes.oneOf(["default", "primary", "dark"]),
		statusBarProps       : PropTypes.any,
		iosFixModalHeight    : PropTypes.bool,
	};

	static defaultProps = {
		style                : {},
		hasForm              : false,
		enableStatusBar      : false,
		enableStatusBarHeight: null,
		statusBarTheme       : "primary",
		statusBarProps       : {},
		iosFixModalHeight    : true,
	};

	render() {
		const {enableStatusBar, enableStatusBarHeight, hasForm, awareScrollView, statusBarProps, statusBarTheme, style, iosFixModalHeight, ...rest} = this.props;

		const enableStatusBarHeightFinal = enableStatusBarHeight === null ? enableStatusBar : enableStatusBarHeight;

		const isIOS = Platform.OS === "ios";

		let props = {
			...rest,
			style: {
				...styles.screen,
				...style,
			}
		};

		let STATUS_BAR_CONFIG = STATUS_BAR_WHITE;

		if( statusBarTheme === "primary" )
		{
			STATUS_BAR_CONFIG = STATUS_BAR_PRIMARY;
		}
		else if( statusBarTheme === "dark" )
		{
			STATUS_BAR_CONFIG = STATUS_BAR_DARK;
		}

		let ComponentView = (hasForm && awareScrollView) ? KeyboardAwareScrollView : (hasForm) ? KeyboardAvoidingView : View

		if( isIOS && hasForm )
		{
			props = {
				...props,
				behavior: "padding",
				contentContainerStyle: {flex: 1}
			};
		}

		if ( awareScrollView ) {
			props = {
				...props, 
				contentContainerStyle: {flex: 1}
			}
		}

		return (
			<ComponentView {...props}>
				{(enableStatusBarHeightFinal || (enableStatusBar && isIOS && iosFixModalHeight)) && <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: STATUS_BAR_CONFIG.backgroundColor}} />}
				{enableStatusBar && <StatusBar translucent {...STATUS_BAR_CONFIG} {...statusBarProps} />}
				{this.props.children}
			</ComponentView>
		);
	}
}

export default UIViewScreen;
