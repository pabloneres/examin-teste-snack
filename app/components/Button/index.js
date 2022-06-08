import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import {
	ActivityIndicator,
	Platform,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
	ViewPropTypes,
} from "react-native";

import {
	themes,
	styles,
	types,
} from "./styles";

import UIIcon from "./../Icon";

class UIButton extends Component {
	static propTypes = {
		type            : PropTypes.oneOf(["default", "small", "block", "block_small", "icon"]),
		theme           : PropTypes.oneOf(["default", "secondary", "light", "black", "white", "outline", "link", "link_white", "transparent"]),
		borderRadius    : PropTypes.oneOf(["radius", "round"]),
		shadow          : PropTypes.bool,
		shadowOnDisabled: PropTypes.bool,
		gradient        : PropTypes.bool,
		title           : PropTypes.string,
		iconName        : PropTypes.string,
		iconPosition    : PropTypes.oneOf(["left", "right"]),
		uppercase       : PropTypes.bool,
		disabled        : PropTypes.bool,
		style           : ViewPropTypes.style,
		styleButton     : ViewPropTypes.style,
		styleText       : Text.propTypes.style,
		styleIcon       : PropTypes.any,
		styleLoading    : PropTypes.any,
		isLoading       : PropTypes.bool,
		loadingColor    : PropTypes.string,
		borderless      : PropTypes.bool,
		pressColor      : PropTypes.string,
		onPress         : PropTypes.func,
	};

	static defaultProps = {
		theme           : "default",
		type            : "default",
		borderRadius    : "radius",
		shadow          : false,
		shadowOnDisabled: false,
		gradient        : false,
		title           : "",
		iconName        : "",
		iconPosition    : "left",
		uppercase       : false,
		disabled        : false,
		isLoading       : false,
		onPress         : () => {
		},
	};

	getTypeConfig = (attr) => (
		types[this.props.type][attr]
	);

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	render() {
		let typeStyleWrap           = this.getTypeConfig("styleWrap");
		let typeStyleButton         = this.getTypeConfig("styleButton");
		let typeStyleIcon           = this.getTypeConfig("styleIcon");
		let typeStyleIconPosition   = this.getTypeConfig("styleIconPosition_" + this.props.iconPosition);
		let typeStyleText           = this.getTypeConfig("styleText");
		let disabledColor           = this.getThemeConfig("disabledColor");
		let disabledBackgroundColor = this.getThemeConfig("disabledBackgroundColor");
		let styleWrap               = [this.getThemeConfig("styleWrap")];
		let styleButton             = this.getThemeConfig("styleButton");
		let styleText               = [this.getThemeConfig("styleText")];
		let styleActiveOpacity      = this.getThemeConfig("activeOpacity");
		let styleIcon               = this.getThemeConfig("styleIcon");
		let androidBorderless       = typeof this.props.borderless !== "undefined" ? this.props.borderless : this.getThemeConfig("androidBorderless");
		let androidPressColor       = typeof this.props.pressColor !== "undefined" ? this.props.pressColor : this.getThemeConfig("androidPressColor");
		let loadingColor            = typeof this.props.loadingColor !== "undefined" ? this.props.loadingColor : this.getThemeConfig("loadingColor");

		let WrapView      = this.props.gradient ? LinearGradient : View;
		let gradientProps = this.props.gradient ? {...this.getThemeConfig("gradientProps")} : {};

		if( this.props.disabled )
		{
			styleWrap.push({backgroundColor: disabledBackgroundColor});
			gradientProps.colors = [disabledBackgroundColor, disabledBackgroundColor];
			styleText.push({color: disabledColor});

			if( this.props.shadow && this.props.shadowOnDisabled )
			{
				styleWrap.push(this.getThemeConfig("styleWrapShadow"));
			}
		}
		else
		{
			if( this.props.shadow )
			{
				styleWrap.push(this.getThemeConfig("styleWrapShadow"));
			}
		}

		const icon = this.props.iconName ? (
			<UIIcon
				style={[styles.icon, typeStyleIcon, typeStyleIconPosition, styleIcon, this.props.styleIcon]}
				name={this.props.iconName}
			/>
		) : null;

		const text = this.props.title ? (
			<Text
				style={[styles.text, typeStyleText, styleText, this.props.uppercase ? {textTransform: "uppercase"} : {}, this.props.styleText]}>
				{this.props.title}
			</Text>
		) : null;

		const loading = this.props.isLoading ? <ActivityIndicator color={loadingColor} size="small" style={[{marginHorizontal: 10}, this.props.styleLoading]} /> : null;

		if( Platform.OS === "android" )
		{
			return (
				<WrapView {...gradientProps} style={[styles.wrap, styles["wrapBorder_" + this.props.borderRadius], typeStyleWrap, styleWrap, androidBorderless ? {} : {overflow: "hidden"}, this.props.style]}>
					<TouchableNativeFeedback
						onPress={this.props.onPress}
						delayPressIn={0}
						disabled={this.props.disabled}
						background={TouchableNativeFeedback.Ripple(androidPressColor, androidBorderless)}>
						<View style={[styles.button, styles["wrapBorder_" + this.props.borderRadius], typeStyleButton, styleButton, this.props.styleButton]}>
							{this.props.iconPosition === "left" && icon}
							{loading}
							{text}
							{this.props.iconPosition === "right" && icon}
							{this.props.children}
						</View>
					</TouchableNativeFeedback>
				</WrapView>
			);
		}

		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				activeOpacity={styleActiveOpacity}
				disabled={this.props.disabled}
				style={[styles.wrap, styles["wrapBorder_" + this.props.borderRadius], typeStyleWrap, styleWrap, this.props.style]}>
				<WrapView {...gradientProps} style={[styles.button, styles["wrapBorder_" + this.props.borderRadius], typeStyleButton, styleButton, this.props.styleButton]}>
					{this.props.iconPosition === "left" && icon}
					{loading}
					{text}
					{this.props.iconPosition === "right" && icon}
					{this.props.children}
				</WrapView>
			</TouchableOpacity>
		);
	}
}

export default UIButton;
