import React, { Component } from "react";
import PropTypes from "prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
	Keyboard,
	Platform,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Modal,
	View,
	ViewPropTypes,
} from "react-native";

import moment from "moment";

import {
	themes,
	styles,
} from "./styles";

import UIIcon from "./../Icon";

moment.locale('pt-br');

class UIInputDate extends Component {
	static propTypes = {
		theme              : PropTypes.oneOf(["default"]),
		icon               : PropTypes.string,
		iconSize           : PropTypes.number,
		editable           : PropTypes.bool,
		placeholder        : PropTypes.string,
		value              : PropTypes.any, // Date object
		pickerValue        : PropTypes.any, // Date object
		onPress            : PropTypes.func,
		onSelect           : PropTypes.func,
		onRequestClose     : PropTypes.func,
		showDateFormat     : PropTypes.string,
		allowClear         : PropTypes.bool,
		onClear            : PropTypes.func,
		containerStyle     : ViewPropTypes.style,
		labelStyle         : Text.propTypes.style,
		elementStyle       : ViewPropTypes.style,
		fieldStyle         : Text.propTypes.style,
		iconColor          : PropTypes.string,
		showArrow          : PropTypes.bool,
		label              : PropTypes.string,
		hasError           : PropTypes.bool,
		errorMessage       : PropTypes.string,
		mode               : PropTypes.any,
		display            : PropTypes.any,
		dateTimePickerProps: PropTypes.object,
		iosTitle           : PropTypes.any,
	};

	static defaultProps = {
		theme              : "default",
		editable           : true,
		iconSize           : 17,
		placeholder        : "",
		pickerValue        : moment().toDate(),
		showDateFormat     : "DD/MM/YYYY",
		allowClear         : false,
		mode               : "date",
		display            : "spinner",
		showArrow          : true,
		label              : "",
		hasError           : false,
		errorMessage       : "",
		dateTimePickerProps: {},
		iosTitle           : "Selecione",
	};

	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
			value       : this.props.value ? this.props.value : null,
			pickerValue : this.props.value instanceof Date ? this.props.value : this.props.pickerValue,
		};
	}

	/**
	 * Get config theme
	 *
	 * @param attr
	 */
	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	/**
	 * Focus field
	 */
	focus = () => {
		this.show();
	};

	/**
	 * Show modal
	 */
	show = () => {
		if( !this.state.modalVisible )
		{
			// Dismiss keyboard
			Keyboard.dismiss();

			this.setState({
				modalVisible: true
			});

			if( this.props.onPress )
			{
				this.props.onPress();
			}

			return true;
		}
	};

	/**
	 * Set value
	 *
	 * @param value - String or Date object
	 * @param fromFormat - Format string to Date object
	 */
	setValue = (value, fromFormat = null) => {
		this.setState({
			value      : typeof value?.getMonth === 'function' ? value : moment(value, fromFormat).toDate(),
			pickerValue: typeof value?.getMonth === 'function' ? value : moment(value, fromFormat).toDate(),
		});
	};

	/**
	 * Get value
	 *
	 * @param format
	 */
	getValue = (format = null) => {
		const {value} = this.state;

		if( format )
		{
			return value ? moment(value).format(format) : "";
		}

		return value ? moment(value) : "";
	};

	onClear = () => {
		this.setState({
			value      : null,
			pickerValue: moment().toDate(),
		}, () => {
			if( this.props.onClear )
			{
				this.props.onClear();
			}
		});
	};

	/**
	 * Cancel
	 */
	onCancel = () => {
		this.setState({
			modalVisible: false,
		}, () => {
			if( this.props.onRequestClose )
			{
				this.props.onRequestClose(this.state.value);
			}
		});
	};

	/**
	 * Change
	 *
	 * @param event
	 * @param date
	 */
	onChange = (event, date) => {
		if( event.type === "dismissed" )
		{
			this.onCancel();
		}
		else
		{
			this.setState({
				modalVisible: false,
				value       : date,
				pickerValue : date,
			}, () => {
				if( this.props.onSelect )
				{
					this.props.onSelect(this.state.value);
				}
			});
		}
	};

	/**
	 * IOS - Change
	 *
	 * @param event
	 * @param date
	 */
	onIosChange = (event, date) => {
		if( date !== undefined )
		{
			this.setState({
				pickerValue: date,
			});
		}
	};

	/**
	 * iOS - Confirm
	 */
	onIosConfirm = () => {
		this.setState(state => ({
			modalVisible: false,
			value       : state.pickerValue,
		}), () => {
			if( this.props.onSelect )
			{
				this.props.onSelect(this.state.value);
			}
		});
	};

	render() {
		let arrowColor           = this.getThemeConfig("arrowColor");
		let borderColor          = this.getThemeConfig("borderColor");
		let disabledColor        = this.getThemeConfig("disabledColor");
		let disabledBackground   = this.getThemeConfig("disabledBackground");
		let iconColor            = this.getThemeConfig("iconColor");
		let clearColor           = this.getThemeConfig("clearColor");
		let errorColor           = this.getThemeConfig("errorColor");
		let errorStyle           = this.getThemeConfig("errorStyle");
		let placeholderTextColor = this.getThemeConfig("placeholderColor");

		let elementStyle = [styles.element];
		elementStyle.push(this.getThemeConfig("elementStyle"));
		elementStyle.push(this.props.elementStyle);

		let labelStyle = [styles.label];
		labelStyle.push(this.getThemeConfig("labelStyle"));
		labelStyle.push(this.props.labelStyle);

		let fieldStyle = [styles.field];
		fieldStyle.push(this.getThemeConfig("fieldStyle"));
		fieldStyle.push(this.props.fieldStyle);

		const {value} = this.state;

		if( !value )
		{
			fieldStyle.push({color: placeholderTextColor});
		}

		let error = null;

		if( this.props.icon )
		{
			fieldStyle.push({paddingLeft: 0});
		}

		if( !this.props.editable )
		{
			borderColor = disabledColor;

			elementStyle.push({backgroundColor: disabledBackground});
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

		elementStyle.push({borderColor: borderColor});

		return (
			<View style={[styles.container, this.props.containerStyle]}>
				{this.props.label.length > 0 && (
					<Text style={labelStyle}>
						{this.props.label}
					</Text>
				)}
				<TouchableWithoutFeedback
					disabled={!this.props.editable}
					onPress={this.show}>
					<View style={elementStyle}>
						{this.props.icon && (
							<View style={styles.icon}>
								<UIIcon
									name={this.props.icon}
									color={iconColor}
									size={this.props.iconSize}
								/>
							</View>
						)}
						<Text numberOfLines={1} style={fieldStyle}>
							{value ? moment(value).format(this.props.showDateFormat) : this.props.placeholder}
						</Text>
						{this.props.allowClear && !!value && (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={this.onClear}
								style={styles.clearBtn}>
								<UIIcon name="input-clear" size={9} color={clearColor} />
							</TouchableOpacity>
						)}
						{this.props.showArrow && <View style={styles.arrow}>
							<UIIcon name="select-arrow" size={10} color={this.props.iconColor || arrowColor} />
						</View>}
					</View>
				</TouchableWithoutFeedback>
				{error}
				{this.state.modalVisible && Platform.OS === "android" && <DateTimePicker
					{...this.props.dateTimePickerProps}
					mode={this.props.mode}
					display={this.props.display}
					value={this.state.pickerValue}
					onChange={this.onChange}
				/>}
				{Platform.OS === "ios" && (
					<Modal
						animationType="slide"
						transparent
						visible={this.state.modalVisible}
						onRequestClose={this.onCancel}>
						<TouchableWithoutFeedback onPress={this.onCancel}>
							<View style={styles.iosModalOverlay} />
						</TouchableWithoutFeedback>
						<View pointerEvents="box-none" style={styles.iosModalContainerWrap}>
							<View style={styles.iosModalContainer}>
								<View style={styles.iosModalTitleContainer}>
									<Text style={styles.iosModalTitleText}>{this.props.iosTitle}</Text>
								</View>
								<DateTimePicker
									{...this.props.dateTimePickerProps}
									mode={this.props.mode}
									display={this.props.display}
									value={this.state.pickerValue}
									onChange={this.onIosChange}
									textColor="#000"
									locale="pt-BR"
								/>
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={this.onIosConfirm}
									style={styles.iosModalConfirmBtn}>
									<Text style={styles.iosModalConfirmBtnText}>Confirmar</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={this.onCancel}
								style={styles.iosModalCancelBtn}>
								<Text style={styles.iosModalCancelBtnText}>Cancelar</Text>
							</TouchableOpacity>
						</View>
					</Modal>
				)}
			</View>
		);
	}
}

export default UIInputDate;
