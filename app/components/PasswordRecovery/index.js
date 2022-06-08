import React, { Component } from "react"
import PropTypes from "prop-types";
import { StatusBar } from "expo-status-bar";
import {
	Keyboard,
} from "react-native";

import { STATUS_BAR_DARK } from "./../../config/styles";

import { API_ERRO_TYPE_VALIDATION } from "./../../config/general";

import { authService } from "./../../redux/services";

import { validateField } from "./../../helpers/validate";

import UIButton from "./../Button"
import UIDialog from "./../Dialog"
import UIDialogConfirm from "./../DialogConfirm"
import UIDialogLoading from "./../DialogLoading"
import UIInput from "./../Input"
import UITitle from "./../Title"

class UIPasswordRecovery extends Component {
	static propTypes = {
		onComplete: PropTypes.func.isRequired,
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
				email: {
					label       : "E-mail",
					hasError    : false,
					errorMessage: "",
				},
			},
		}
	}

	_onCloseDialog = () => {
		this.setState({
			dialogVisible: false,
		});
	};

	_validateRules = (field = null) => {
		const rules = {
			email: {
				type : "text",
				rules: "required|email",
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

	_resetFields = () => {
		this.email.setValue("");
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

			const data = {
				email: this.email.getValue(),
			};

			authService.passwordRecovery(data)
			.then((response) => {
				this.setState({
					isSending: false,
				});

				// Reset fields
				this._resetFields();

				// Close
				this.close();

				// onComplete
				this.props.onComplete();
			})
			.catch((data) => {
				// if validation error
				if( data.error_type === API_ERRO_TYPE_VALIDATION )
				{
					let fields          = this.state.fields;
					let hasFieldsErrors = false;
					let dialogError     = null;

					for( let key in data.error_errors )
					{
						if( data.error_errors.hasOwnProperty(key) && fields.hasOwnProperty(key) )
						{
							fields[key].hasError     = true;
							fields[key].errorMessage = data.error_errors[key];

							if( !dialogError )
							{
								dialogError = `${fields[key].label}: ${data.error_errors[key]}`;
							}

							hasFieldsErrors = true;
						}
					}

					if( hasFieldsErrors )
					{
						if( dialogError )
						{
							this.setState({
								isSending    : false,
								fields       : fields,
								dialogVisible: true,
								dialogTitle  : "Falha",
								dialogMessage: dialogError,
							});
						}
						else
						{
							this.setState({
								isSending: false,
								fields   : fields,
							});
						}
					}
					else
					{
						this.setState({
							isSending    : false,
							dialogVisible: true,
							dialogTitle  : "Falha",
							dialogMessage: String(data),
						});
					}
				}
				else
				{
					this.setState({
						isSending    : false,
						dialogVisible: true,
						dialogTitle  : "Falha",
						dialogMessage: String(data),
					});
				}
			});
		}
	};

	open = () => {
		this.setState({
			visible: true,
		});
	};

	close = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		const {visible} = this.state;

		return (
			<UIDialog
				visible={visible}
				alignBottom={true}
				onTouchOutside={this.close}
				avoidKeyboard={true}
				scrollProps={{keyboardShouldPersistTaps: "handled"}}>
				<StatusBar {...STATUS_BAR_DARK} />
				<UITitle size={20}>Digite o e-mail cadastrado{"\n"}para recuperar o acesso ao app!</UITitle>
				<UIInput
					ref={el => this.email = el}
					icon="user"
					label={this.state.fields.email.label}
					placeholder={this.state.fields.email.label}
					keyboardType="email-address"
					autoCapitalize="none"
					onBlur={() => this._validateField("email")}
					hasError={this.state.fields.email.hasError}
					errorMessage={this.state.fields.email.errorMessage}
				/>
				<UIButton
					type="block"
					title="CONTINUAR"
					style={{marginVertical: 5}}
					onPress={this._onSubmit}
				/>
				<UIDialogConfirm
					visible={this.state.dialogVisible}
					title={this.state.dialogTitle}
					message={this.state.dialogMessage}
					onTouchOutside={this._onCloseDialog}
					buttons={this.state.dialogButtons.length ? this.state.dialogButtons : [
						{
							title  : "OK",
							onPress: this._onCloseDialog,
						},
					]}
				/>
				<UIDialogLoading
					visible={this.state.isSending}
					message="Aguarde..."
				/>
			</UIDialog>
		);
	}
}

export default UIPasswordRecovery;
