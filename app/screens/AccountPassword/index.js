import React, { Component } from "react";
import {
	Keyboard,
	Platform,
	View,
} from "react-native";
import {
	UIButton,
	UIDialogConfirm,
	UIDialogLoading,
	UIHeader,
	UIInput,
	UIScrollView,
	UIViewScreen,
} from "./../../components";

import { API_ERRO_TYPE_VALIDATION } from "./../../config/general";

import { authService } from "./../../redux/services";

import { validateField } from "./../../helpers/validate";
import fakeRequest from "~/helpers/fakeRequest";

class AccountPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSending     : false,
			dialogVisible : false,
			dialogTitle   : "",
			dialogMessage : "",
			dialogButtons : [],
			dialogGoToBack: false,
			fields        : {
				password    : {
					label       : "Senha atual",
					placeholder : "••••••••",
					hasError    : false,
					errorMessage: "",
				},
				password_new: {
					label       : "Nova senha",
					placeholder : "••••••••",
					hasError    : false,
					errorMessage: "",
				},
			},
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.password && this.password.focus();
		}, Platform.OS === 'ios' ? 0 : 150);
	}

	_onCloseDialog = () => {
		this.setState({
			dialogVisible: false,
		}, () => {
			if( this.state.dialogGoToBack )
			{
				this.props.navigation.goBack();
			}
		});
	};

	_validateRules = (field = null) => {
		const rules = {
			password    : {
				type : "text",
				rules: "required",
			},
			password_new: {
				type    : "text",
				rules   : "required|minlength:6",
				messages: {
					minlength: "Deve conter no mínimo 6 caracteres",
				},
			}
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

		if( validateForm.hasError ) return false;

		this.setState({
			isSending: true,
		});

		const data = {
			password    : this.password.getValue(),
			password_new: this.password_new.getValue(),
		};

		// authService.changePassword(data)
		fakeRequest(true)
		.then((response) => {
			this.setState({
				isSending     : false,
				dialogGoToBack: true,
				dialogVisible : true,
				dialogTitle   : "Senha alterada",
				dialogMessage : "Sua senha foi alterada com sucesso.",
				dialogButtons : [
					{
						title  : "CONTINUAR",
						onPress: this._onCloseDialog,
					},
				],
			});
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
	};

	render() {
		return (
			<UIViewScreen enableStatusBar hasForm awareScrollView>
				<UIHeader
					left="backButton"
					center={{title: "Alterar senha"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView
					keyboardShouldPersistTaps="handled"
					style={{paddingTop: 20}}>
					<View style={{flex: 1}}>
						<UIInput
							ref={el => this.password = el}
							label={this.state.fields.password.label}
							placeholder={this.state.fields.password.placeholder}
							secureTextEntry={true}
							autoCapitalize="none"
							autoCorrect={false}
							blurOnSubmit={false}
							onSubmitEditing={(e) => this.password_new.focus()}
							onBlur={() => this._validateField("password")}
							hasError={this.state.fields.password.hasError}
							errorMessage={this.state.fields.password.errorMessage}
							// iOS
							textContentType="password"
							passwordRules="minlength: 1;"
						/>
						<UIInput
							ref={el => this.password_new = el}
							label={this.state.fields.password_new.label}
							placeholder={this.state.fields.password_new.placeholder}
							secureTextEntry={true}
							autoCapitalize="none"
							autoCorrect={false}
							blurOnSubmit={false}
							onSubmitEditing={this._onSubmit}
							onBlur={() => this._validateField("password_new")}
							hasError={this.state.fields.password_new.hasError}
							errorMessage={this.state.fields.password_new.errorMessage}
							// iOS
							textContentType="newPassword"
							passwordRules="minlength: 1;"
						/>
						{/* <UIInput
							ref={el => this.password_new_confirmation = el}
							label={this.state.fields.password_new_confirmation.label}
							placeholder={this.state.fields.password_new_confirmation.label}
							secureTextEntry={true}
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="done"
							blurOnSubmit={false}
							onSubmitEditing={(e) => Keyboard.dismiss()}
							onBlur={() => this._validateField("password_new_confirmation")}
							hasError={this.state.fields.password_new_confirmation.hasError}
							errorMessage={this.state.fields.password_new_confirmation.errorMessage}
							// iOS
							textContentType="newPassword"
							passwordRules="minlength: 1;"
						/> */}
					</View>
					<UIButton
						type="block"
						theme="secondary"
						title="SALVAR"
						style={{marginTop: 20}}
						onPress={this._onSubmit}
					/>
				</UIScrollView>
				<UIDialogConfirm
					visible={this.state.dialogVisible}
					title={this.state.dialogTitle}
					message={this.state.dialogMessage}
					onTouchOutside={this._onCloseDialog}
					buttons={this.state.dialogButtons.length ? this.state.dialogButtons : [
						{
							title  : "Continuar",
							onPress: this._onCloseDialog,
						},
					]}
				/>
				<UIDialogLoading
					visible={this.state.isSending}
					message="Aguarde..."
				/>
			</UIViewScreen>
		);
	}
}

export default AccountPassword;
