import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInputMask } from "react-native-masked-text";
import {
	Animated,
	Platform,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewPropTypes,
} from "react-native";

import {
	FORM,
} from "./../../config/styles";

import {
	themes,
	styles,
} from "./styles";

import UIIcon from "./../Icon";
import UILoading from "./../Loading";

class UIInputMask extends Component {
	static propTypes = {
		theme            : PropTypes.oneOf(["default", "secondary"]),
		containerStyle   : ViewPropTypes.style,
		labelStyle       : Text.propTypes.style,
		elementStyle     : ViewPropTypes.style,
		iconPosition     : PropTypes.oneOf(["left", "right"]),
		icon             : PropTypes.string,
		iconSize         : PropTypes.number,
		label            : PropTypes.string,
		counter          : PropTypes.bool,
		hasError         : PropTypes.bool,
		errorMessage     : PropTypes.string,
		textareaMinHeight: PropTypes.number,
		isLoading        : PropTypes.bool,
		allowClear       : PropTypes.bool,
		onClear          : PropTypes.func,
		showButton       : PropTypes.bool,
		buttonIcon       : PropTypes.string,
		buttonIconSize   : PropTypes.number,
		onPressButton    : PropTypes.func,
		buttonStyle      : ViewPropTypes.style,
		buttonColor      : PropTypes.string,
		showPasswordIcon : PropTypes.bool,
	};

	static defaultProps = {
		theme            : "default",
		editable         : true,
		iconPosition     : "left",
		iconSize         : 17,
		label            : "",
		hasError         : false,
		errorMessage     : "",
		textareaMinHeight: FORM.fieldHeight,
		isLoading        : false,
		allowClear       : false,
		showButton       : false,
		buttonIconSize   : 20,
		onPressButton    : () => {
		},
		returnKeyType    : "next",
		showPasswordIcon : true,
	};

	constructor(props) {
		super(props);

		this.state = {
			value            : (this.props.value === null || typeof this.props.value === "undefined") ? "" : String(this.props.value),
			focusAnim        : new Animated.Value(0),
			maxLength        : this.props.maxLength,
			textareaMinHeight: this.props.textareaMinHeight ? this.props.textareaMinHeight : FORM.fieldHeight,
			textareaHeight   : this.props.textareaMinHeight ? this.props.textareaMinHeight : FORM.fieldHeight,
			secureTextEntry  : this.props.secureTextEntry,
			focus            : false,
		};
	}

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	/**
	 * Focus on input
	 */
	focus = () => {
		if( !this.textInput.getElement().isFocused() )
		{
			this.textInput.getElement().focus();
		}
	};

	/**
	 * Blur on input
	 */
	blur = () => {
		if( this.textInput.getElement().isFocused() )
		{
			this.textInput.getElement().blur();
		}
	};

	/**
	 * Set value
	 *
	 * @param value
	 */
	setValue = (value) => {
		this.setState({
			value: (value === null || typeof value === "undefined") ? "" : String(value),
		});
	};

	/**
	 * Get value
	 */
	getValue = () => this.state.value;

	onChangeText = (value) => {
		let newValue = value;

		this.setState({
			value: newValue
		});

		if( this.props.onChangeText )
		{
			this.props.onChangeText(newValue);
		}
	};

	updateText = (e) => {
		const text = e.nativeEvent.text;

		this.setState({
			value: text
		});

		if( this.props.onEndEditing )
		{
			this.props.onEndEditing(e);
		}
	};

	onFocus = (e) => {
		Animated.timing(this.state.focusAnim, {
			toValue        : 1,
			duration       : 150,
			useNativeDriver: false,
		}).start();

		this.setState({
			focus: true,
		});

		if( this.props.onFocus )
		{
			this.props.onFocus(e);
		}
	};

	onBlur = (e) => {
		Animated.timing(this.state.focusAnim, {
			toValue        : 0,
			duration       : 150,
			useNativeDriver: false,
		}).start();

		this.setState({
			focus: false,
		});

		if( this.props.onBlur )
		{
			this.props.onBlur(e);
		}
	};

	onClear = () => {
		this.setState({
			value: ""
		}, () => {
			if( this.props.onClear )
			{
				this.props.onClear();
			}
		});
	};

	render() {
		let themeBackgroundColor = this.getThemeConfig("backgroundColor");
		let themeBorderColor     = this.getThemeConfig("borderColor");
		let labelColor           = this.state.focus ? this.getThemeConfig("focusLabelColor") : this.getThemeConfig("labelColor");
		let disabledColor        = this.getThemeConfig("disabledColor");
		let disabledBackground   = this.getThemeConfig("disabledBackground");
		let focusBackgroundColor = this.getThemeConfig("focusBackgroundColor");
		let focusBorderColor     = this.getThemeConfig("focusBorderColor");
		let iconColor            = this.getThemeConfig("iconColor");
		let clearColor           = this.getThemeConfig("clearColor");
		let buttonColor          = this.getThemeConfig("buttonColor");
		let buttonStyle          = this.getThemeConfig("buttonStyle");
		let errorColor           = this.getThemeConfig("errorColor");
		let errorStyle           = this.getThemeConfig("errorStyle");
		let placeholderTextColor = this.state.focus ? this.getThemeConfig("focusPlaceholderColor") : this.getThemeConfig("placeholderColor");
		let counterStyle         = this.getThemeConfig("counterStyle");
		let backgroundColor      = focusBackgroundColor;
		let borderColor          = focusBorderColor;

		if( this.state.focus )
		{
			iconColor = labelColor;
		}

		let labelStyle = [];
		labelStyle.push(styles.label);
		labelStyle.push(this.getThemeConfig("labelStyle"));
		labelStyle.push(this.props.labelStyle);
		labelStyle.push({color: labelColor});

		let inputStyle = [];
		inputStyle.push(styles.input);

		if( this.props.icon )
		{
			if( this.props.iconPosition === "left" )
			{
				inputStyle.push({paddingLeft: 0});
			}
		}

		if( this.props.multiline )
		{
			inputStyle.push(styles.textarea);

			// AutoGrow textarea
			if( Platform.OS === "android" )
			{
				inputStyle.push({height: this.state.textareaHeight < this.state.textareaMinHeight ? this.state.textareaMinHeight : this.state.textareaHeight});
			}
		}

		inputStyle.push(this.getThemeConfig("inputStyle"));
		inputStyle.push(this.props.style);

		let elementStyle = [];
		elementStyle.push(styles.element);
		elementStyle.push(this.getThemeConfig("elementStyle"));
		elementStyle.push(this.props.elementStyle);

		let error   = null;
		let counter = null;

		if( !this.props.editable )
		{
			themeBackgroundColor = disabledBackground;
			backgroundColor      = disabledBackground;
			themeBorderColor     = disabledColor;
			borderColor          = disabledColor;
		}

		if( this.props.hasError )
		{
			themeBorderColor = errorColor;
			borderColor      = errorColor;

			error = (
				<Text style={[styles.error, errorStyle, {color: errorColor}]}>
					{this.props.errorMessage}
				</Text>
			);
		}

		if( this.props.counter )
		{
			counter = (
				<Text style={[styles.counter, counterStyle]}>
					{`${this.state.value.length} / ${this.state.maxLength}`}
				</Text>
			);
		}

		elementStyle.push({
			backgroundColor: this.state.focusAnim.interpolate({
				inputRange : [0, 1],
				outputRange: [themeBackgroundColor, backgroundColor]
			}),
			borderColor    : this.state.focusAnim.interpolate({
				inputRange : [0, 1],
				outputRange: [themeBorderColor, borderColor]
			}),
		});

		return (
			<View style={[styles.container, this.props.containerStyle]}>
				{this.props.label.length > 0 && (
					<Animated.Text style={labelStyle}>
						{this.props.label}
					</Animated.Text>
				)}
				<Animated.View style={elementStyle}>
					{this.props.icon && this.props.iconPosition === "left" && (
						<View style={[styles.icon, this.props.multiline ? styles.iconTextarea : {}]}>
							<UIIcon
								name={this.props.icon}
								color={iconColor}
								size={this.props.iconSize}
							/>
						</View>
					)}
					<TextInputMask
						ref={el => this.textInput = el}
						{...this.props}
						style={inputStyle}
						placeholderTextColor={placeholderTextColor}
						value={this.state.value}
						underlineColorAndroid="transparent"
						maxLength={this.state.maxLength}
						textAlignVertical={this.props.multiline ? "top" : "auto"}
						secureTextEntry={this.state.secureTextEntry}
						onChangeText={this.onChangeText}
						onEndEditing={this.updateText}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						onContentSizeChange={(e) => {
							if( this.props.multiline )
							{
								this.setState({textareaHeight: e.nativeEvent.contentSize.height})
							}
						}}
					/>
					{this.props.isLoading && (
						<View style={styles.loading}>
							<UILoading size="small" />
						</View>
					)}
					{this.props.allowClear && !this.props.isLoading && this.state.value.length > 0 && (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this.onClear}
							style={styles.clearBtn}>
							<UIIcon name="input-clear" size={9} color={clearColor} />
						</TouchableOpacity>
					)}
					{this.props.showButton && !this.props.isLoading && (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={this.props.onPressButton}
							style={[styles.button, buttonStyle, this.props.buttonStyle]}>
							<UIIcon name={this.props.buttonIcon} color={this.props.buttonColor ? this.props.buttonColor : buttonColor} size={this.props.buttonIconSize} />
						</TouchableOpacity>
					)}
					{this.props.secureTextEntry && this.props.showPasswordIcon && (
						<TouchableWithoutFeedback
							disabled={!this.props.editable || !this.state.value.length}
							onPress={() => this.setState({
								secureTextEntry: !this.state.secureTextEntry
							})}>
							<View style={styles.iconPassword}>
								<UIIcon
									name={this.state.secureTextEntry ? "eye-show" : "eye-hide"}
									color={iconColor}
									size={17}
								/>
							</View>
						</TouchableWithoutFeedback>
					)}
					{this.props.icon && this.props.iconPosition === "right" && (
						<View style={[styles.icon, this.props.multiline ? styles.iconTextarea : {}]}>
							<UIIcon
								name={this.props.icon}
								color={iconColor}
								size={this.props.iconSize}
							/>
						</View>
					)}
				</Animated.View>
				<View style={styles.footer}>
					{error}
					{counter}
				</View>
			</View>
		);
	}
}

export default UIInputMask;
