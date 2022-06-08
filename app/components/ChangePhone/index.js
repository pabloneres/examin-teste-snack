import React, { Component } from "react"
import PropTypes from "prop-types";
import {
	InteractionManager,
	Keyboard,
} from "react-native";

import { API_ERRO_TYPE_VALIDATION } from "./../../config/general";

import { authService } from "./../../redux/services";

import { validateField } from "./../../helpers/validate";

import UIButton from "../Button";
import UIDialog from "../Dialog";
import UIDialogConfirm from "../DialogConfirm";
import UIDialogLoading from "../DialogLoading";
import UIInput from "../Input";
import UITitle from "../Title";

class UIChangePhone extends Component {
	static propTypes = {
		onComplete: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			visible              : false,
			isSending            : false,
			dialogVisible        : false,
			dialogVerticalButtons: false,
			dialogTitle          : "",
			dialogMessage        : "",
			dialogButtons        : [],
			fields               : {
				celular: {
					label       : "Celular",
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
			celular: {
				type : "text",
				rules: "required",
			},
		};

		return field !== null ? rules[field] : rules;
	};

	_validateField = (field) => {
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
		this.celular.setValue("");
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
				celular: this.celular.getValue(),
			};

			authService.changeCellphone(data)
			.then((response) => {
				this.setState({
					isSending: false,
				});

				// Reset fields
				this._resetFields();

				// Close
				this.close();

				// onComplete
				this.props.onComplete(data.celular);
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
								dialogButtons: [],
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
							dialogButtons: [],
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
						dialogButtons: [],
					});
				}
			});
		}
	};

	open = () => {
		this.setState({
			visible: true,
		}, () => {
			InteractionManager.runAfterInteractions(() => {
				this.celular.focus();
			});
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
				<UITitle size={20} style={{marginBottom: 30}}>Informe o novo número</UITitle>
				<UIInput
					ref={el => this.celular = el}
					placeholder={this.state.fields.celular.label}
					mask="(99) 99999-9999"
					keyboardType="number-pad"
					returnKeyType="done"
					onBlur={() => this._validateField("celular")}
					hasError={this.state.fields.celular.hasError}
					errorMessage={this.state.fields.celular.errorMessage}
					containerStyle={{marginHorizontal: 30, marginBottom: 25}}
					elementStyle={{borderRadius: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}
					style={{paddingHorizontal: 0, fontSize: 17}}
				/>
				<UIButton
					type="block"
					title="CONFIRMAR"
					style={{marginVertical: 5}}
					onPress={this._onSubmit}
				/>
				<UIDialogConfirm
					visible={this.state.dialogVisible}
					title={this.state.dialogTitle}
					verticalButtons={this.state.dialogVerticalButtons}
					message={this.state.dialogMessage}
					onTouchOutside={this._onCloseDialog}
					buttons={this.state.dialogButtons.length > 0 ? this.state.dialogButtons : [
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

export default UIChangePhone;
