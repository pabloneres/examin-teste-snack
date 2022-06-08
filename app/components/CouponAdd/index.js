import React, { Component } from "react"
import PropTypes from "prop-types";
import {
	Keyboard,
} from "react-native"

import styles from "./styles";

import UIButton from "./../Button"
import UIDialogConfirm from "./../DialogConfirm"
import UIDialog from "./../Dialog"
import UIInput from "./../Input"

import { cartService } from "./../../redux/services";

import { validateField } from "./../../helpers/validate";

class UICouponAdd extends Component {
	static propTypes = {
		onAddCoupon: PropTypes.func.isRequired,
		cartHash   : PropTypes.any.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			visible      : false,
			isSending    : false,
			dialogVisible: false,
			dialogTitle  : "",
			dialogMessage: "",
			dialogButtons: [],
			fields       : {
				code: {
					label       : "DIGITE O CÓDIGO DO SEU CUPOM",
					hasError    : false,
					errorMessage: "",
				},
			},
		}
	}

	open = () => {
		this.setState({
			visible: true,
		}, () => {
			setTimeout(() => {
				this.code && this.code.focus();
			}, 300);
		});
	};

	close = () => {
		if( this.state.isSending ) return false;

		this.setState({
			visible: false,
		});
	};

	_onCloseDialog = () => {
		this.setState({
			dialogVisible: false,
		});
	};

	_validateRules = (field = null) => {
		const rules = {
			code: {
				type : "text",
				rules: "required",
			},
		};

		return field !== null ? rules[field] : rules;
	};

	_validateField = (field) => {
		if( !this[field] )
		{
			return {
				hasError    : false,
				errorMessage: '',
			};
		}

		let field_config   = this._validateRules(field);
		let field_value    = this[field].getValue();
		let field_validate = validateField(field_config, field_value);

		// Update field error on state
		this.setState(state => ({
			fields: {
				...state.fields,
				[field]: {
					...state.fields[field],
					hasError    : field_validate.hasError,
					errorMessage: field_validate.message,
				}
			}
		}));

		return {
			hasError    : field_validate.hasError,
			errorMessage: field_validate.message,
		};
	};

	_validateFields = () => {
		let fields_config = this._validateRules();

		let hasError = false;

		Object.entries(fields_config).forEach(([key, value]) => {
			// Validate field
			let validateField = this._validateField(key);

			// Save has error
			if( validateField.hasError )
			{
				hasError = true;
			}
		});

		return {
			hasError: hasError,
		}
	};

	_onSubmit = () => {
		// Dismiss keyboard
		setTimeout(Keyboard.dismiss, 150);

		let validateForm = this._validateFields();

		if( !validateForm.hasError )
		{
			this.setState({
				isSending: true,
			});

			const {cartHash} = this.props;

			cartService.couponAdd({
				cart_hash: cartHash,
				code     : this.code.getValue().trim().toUpperCase(),
			})
			.then((response) => {
				this.setState({
					isSending: false,
				});

				setTimeout(() => {
					this.close();

					// On add coupon
					this.props.onAddCoupon(response.data.data);
				}, 200);
			})
			.catch((data) => {
				this.setState({
					isSending    : false,
					dialogVisible: true,
					dialogTitle  : String(data),
					dialogMessage: "",
					dialogButtons: [],
				});
			});
		}
	};

	render() {
		const {visible, isSending} = this.state;

		return (
			<UIDialog
				visible={visible}
				alignBottom={true}
				onTouchOutside={this.close}
				avoidKeyboard={true}
				dialogStyle={styles.dialogStyle}
				contentStyle={styles.contentStyle}
				scrollProps={{keyboardShouldPersistTaps: "handled", bounces: false}}>
				<UIInput
					ref={el => this.code = el}
					label={this.state.fields.code.label}
					placeholder="Cupom"
					autoCapitalize="characters"
					autoCorrect={false}
					editable={!isSending}
					returnKeyType="done"
					onBlur={() => this._validateField("code")}
					hasError={this.state.fields.code.hasError}
					errorMessage={this.state.fields.code.errorMessage}
				/>
				<UIButton
					type="block"
					title={isSending ? "ADICIONANDO CUPOM" : "ADICIONAR CUPOM"}
					disabled={isSending}
					isLoading={isSending}
					onPress={this._onSubmit}
					style={{marginVertical: 5}}
				/>
				<UIButton
					type="icon"
					theme="white"
					iconName="x"
					disabled={isSending}
					borderRadius="round"
					onPress={this.close}
					style={styles.btnClose}
				/>
				<UIDialogConfirm
					visible={this.state.dialogVisible}
					title={this.state.dialogTitle}
					message={this.state.dialogMessage}
					onTouchOutside={this._onCloseDialog}
					buttons={this.state.dialogButtons.length ? this.state.dialogButtons : [
						{
							title  : "CONTINUAR",
							onPress: this._onCloseDialog,
						},
					]}
				/>
			</UIDialog>
		);
	}
}

export default UICouponAdd;
