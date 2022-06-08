import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewPropTypes,
} from "react-native";

import {
	themes,
	styles,
} from "./styles";

import UICitiesModal from "./../CitiesModal";
import UIIcon from "./../Icon";

class UIInputCity extends Component {
	static propTypes = {
		theme         : PropTypes.oneOf(["default"]),
		placeholder   : PropTypes.string,
		onSelectItem  : PropTypes.func,
		value         : PropTypes.any,
		valueLabel    : PropTypes.string,
		containerStyle: ViewPropTypes.style,
		labelStyle    : Text.propTypes.style,
		elementStyle  : ViewPropTypes.style,
		iconPosition  : PropTypes.oneOf(["left", "right"]),
		icon          : PropTypes.string,
		iconSize      : PropTypes.number,
		label         : PropTypes.string,
		hasError      : PropTypes.bool,
		errorMessage  : PropTypes.string,
		allowClear    : PropTypes.bool,
		onClear       : PropTypes.func,
		showArrow     : PropTypes.bool,
	};

	static defaultProps = {
		theme       : "default",
		placeholder : "Pesquisar cidade",
		value       : "",
		valueLabel  : "",
		editable    : true,
		iconPosition: "right",
		iconSize    : 17,
		label       : "",
		hasError    : false,
		errorMessage: "",
		allowClear  : false,
		showArrow   : true,
	};

	constructor(props) {
		super(props);

		this.state = {
			value     : (this.props.value === null || typeof this.props.value === "undefined") ? "" : this.props.value,
			valueLabel: this.props.valueLabel || "",
		};
	}

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	/**
	 * Focus on input
	 */
	focus = () => {
		if( this.props.editable )
		{
			this.citiesModal.show();
		}
	};

	/**
	 * Set value
	 *
	 * @param item
	 */
	setValue = (item) => {
		if( !item )
		{
			this.setState({
				value     : "",
				valueLabel: "",
			});
		}
		else
		{
			this.setState({
				value     : item.value,
				valueLabel: item.valueLabel,
			});
		}
	};

	onSelectItem = (item) => {
		this.setState({
			value     : item.id,
			valueLabel: item.name,
		}, () => {
			if( this.props.onSelectItem )
			{
				this.props.onSelectItem(this.getValue());
			}
		});
	};

	/**
	 * Get value
	 */
	getValue = () => this.state.value;

	/**
	 * Get value label
	 */
	getValueLabel = () => this.state.valueLabel;

	onClear = () => {
		this.setState({
			value     : "",
			valueLabel: "",
		}, () => {
			if( this.props.onClear )
			{
				this.props.onClear();
			}
		});
	};

	render() {
		let backgroundColor      = this.getThemeConfig("backgroundColor");
		let arrowColor           = this.getThemeConfig("arrowColor");
		let borderColor          = this.getThemeConfig("borderColor");
		let labelColor           = this.getThemeConfig("labelColor");
		let disabledColor        = this.getThemeConfig("disabledColor");
		let disabledBackground   = this.getThemeConfig("disabledBackground");
		let iconColor            = this.getThemeConfig("iconColor");
		let clearColor           = this.getThemeConfig("clearColor");
		let errorColor           = this.getThemeConfig("errorColor");
		let errorStyle           = this.getThemeConfig("errorStyle");
		let placeholderTextColor = this.getThemeConfig("placeholderColor");

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

		inputStyle.push(this.getThemeConfig("inputStyle"));
		inputStyle.push(this.props.style);

		const {valueLabel} = this.state;

		if( !valueLabel )
		{
			inputStyle.push({color: placeholderTextColor});
		}

		let elementStyle = [];
		elementStyle.push(styles.element);
		elementStyle.push(this.getThemeConfig("elementStyle"));
		elementStyle.push(this.props.elementStyle);

		let error = null;

		if( !this.props.editable )
		{
			backgroundColor = disabledBackground;
			borderColor     = disabledColor;

			inputStyle.push({color: placeholderTextColor});
		}

		if( this.props.hasError )
		{
			borderColor = errorColor;

			error = (
				<Text style={[styles.error, errorStyle, {color: errorColor}]}>
					{this.props.errorMessage}
				</Text>
			);
		}

		elementStyle.push({backgroundColor: backgroundColor, borderColor: borderColor});

		return (
			<View style={[styles.container, this.props.containerStyle]}>
				{this.props.label.length > 0 && (
					<Text style={labelStyle} onPress={this.show}>
						{this.props.label}
					</Text>
				)}
				<TouchableWithoutFeedback
					disabled={!this.props.editable || this.props.isLoading}
					onPress={this.focus}>
					<View style={elementStyle}>
						{this.props.icon && this.props.iconPosition === "left" && (
							<View style={styles.icon}>
								<UIIcon
									name={this.props.icon}
									color={iconColor}
									size={this.props.iconSize}
								/>
							</View>
						)}
						<Text numberOfLines={1} style={inputStyle}>
							{this.state.valueLabel || this.props.placeholder}
						</Text>
						{this.props.allowClear && String(this.state.value).length > 0 && (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={this.onClear}
								style={styles.clearBtn}>
								<UIIcon name="input-clear" size={16} color={clearColor} />
							</TouchableOpacity>
						)}
						{this.props.icon && this.props.iconPosition === "right" && (
							<View style={styles.icon}>
								<UIIcon
									name={this.props.icon}
									color={iconColor}
									size={this.props.iconSize}
								/>
							</View>
						)}
						{this.props.showArrow && <View style={styles.arrow}>
							<UIIcon name="select-arrow" color={arrowColor} size={10} />
						</View>}
					</View>
				</TouchableWithoutFeedback>
				{error}
				<UICitiesModal
					ref={el => this.citiesModal = el}
					onSelectItem={this.onSelectItem}
				/>
			</View>
		);
	}
}

export default UIInputCity;
