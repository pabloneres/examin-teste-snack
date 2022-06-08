import React, { Component } from "react"
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import {
	Text,
	TouchableOpacity,
	View,
	ViewPropTypes,
} from "react-native"

import { STATUS_BAR_DARK } from "./../../config/styles";

import {
	styles,
	themes,
} from "./styles";

import UIDialog from "./../Dialog"
import UIIcon from "./../Icon"

class UIDialogConfirm extends Component {
	static propTypes = {
		...UIDialog.propTypes,
		message        : PropTypes.string,
		messageStyle   : Text.propTypes.style,
		buttonsStyle   : ViewPropTypes.style,
		buttons        : PropTypes.arrayOf(
			PropTypes.shape({
				title      : PropTypes.string.isRequired,
				icon       : PropTypes.string,
				disabled   : PropTypes.bool,
				onPress    : PropTypes.func.isRequired,
				styleButton: ViewPropTypes.style,
				styleText  : Text.propTypes.style,
				styleIcon  : PropTypes.any,
			}),
		).isRequired,
		verticalButtons: PropTypes.bool,
		alignBottom    : PropTypes.bool,
		theme          : PropTypes.oneOf(["default"]),
	};

	static defaultProps = {
		theme          : "default",
		verticalButtons: false,
		alignBottom    : true,
	};

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	_renderMessage = () => {
		const {message, messageStyle} = this.props;

		if( message )
		{
			return (
				<Text style={[styles.text, messageStyle]}>
					{message}
				</Text>
			)
		}
	};

	_renderButton = (button, index) => {
		const icon      = button.icon;
		const textStyle = button.styleText || {};
		const styleIcon = button.styleIcon || {};

		const themeButtonStyle = this.getThemeConfig("buttonStyle");

		return (
			<TouchableOpacity
				key={index}
				activeOpacity={0.6}
				onPress={button.onPress}
				disabled={button.disabled}
				style={[themeButtonStyle, this.props.verticalButtons ? styles.buttonVertical : styles.button, button.styleButton || {}]}>
				{!!icon && <UIIcon name={icon} style={styleIcon} />}
				<Text style={[this.props.verticalButtons ? styles.buttonVerticalText : styles.buttonText, textStyle, button.disabled ? styles.buttonDisabledText : {}]}>
					{button.title}
				</Text>
			</TouchableOpacity>
		);
	};

	_renderButtons = () => {
		const {verticalButtons} = this.props;

		let buttonsElements = [];

		this.props.buttons.forEach((button, index) => {
			if( index > 0 )
			{
				buttonsElements.push(<View key={`${index}-s`} style={verticalButtons ? styles.buttonVerticalSeparator : styles.buttonSeparator} />);
			}

			buttonsElements.push(this._renderButton(button, index));
		});

		return buttonsElements;
	};

	_renderContent = () => {
		const {children} = this.props;

		return (children ? children : this._renderMessage());
	};

	render() {
		const {verticalButtons, buttonsStyle, ...rest} = this.props;

		return (
			<UIDialog
				{...rest}
				buttons={this._renderButtons()}
				buttonsStyle={[verticalButtons ? styles.buttonsContainerVertical : styles.buttonsContainer, buttonsStyle || {}]}>
				<StatusBar {...STATUS_BAR_DARK} />
				{this._renderContent()}
			</UIDialog>
		);
	}
}



export default UIDialogConfirm;
