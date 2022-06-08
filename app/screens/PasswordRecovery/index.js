import React, { Component, Fragment } from "react";
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
	UIIcon,
	UIInput,
	UIScrollView,
	UIText,
	UIView,
	UIViewScreen,
} from "~/components";

import { API_ERRO_TYPE_VALIDATION } from "~/config/general";

import { authService } from "~/redux/services";

import { validateField } from "~/helpers/validate";
import { FONTS } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";
import styles from "./styles";

class PasswordRecovery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSent        : false,
			isSending     : false,
			dialogVisible : false,
			dialogTitle   : "",
			dialogContent : null,
			dialogMessage : "",
			dialogButtons : [],
			dialogGoToBack: false,
			fields        : {
				email: {
					label       : "E-mail",
					placeholder : "Informe seu e-mail",
					hasError    : false,
					errorMessage: "",
				},
			},
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.email && this.email.focus();
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

	_onSubmit = () => {
		// Dismiss keyboard
		setTimeout(Keyboard.dismiss, 150);

		let validateForm = this._validateFields();

		if( validateForm.hasError ) return false;

		this.setState({
			isSending: true,
		});

		const data = {
			email: this.email.getValue(),
		};

		// authService.changePassword(data)
		fakeRequest()
		.then((response) => {
			this.setState({
				isSending: false,
				isSent   : true,
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
		const {isSent} = this.state

		return (
			<UIViewScreen enableStatusBar hasForm awareScrollView>
				<UIHeader
					left={{
						icon   : "back",
						onPress: () => this.props.navigation.goBack()
					}}
					center={{title: "Recuperar senha"}}
					right="empty"
				/>
				<UIScrollView
					keyboardShouldPersistTaps="handled"
					style={{paddingTop: 10}}>
					{
						isSent ? (
							<Fragment>
								<View style={{flex: 1}}>
									<UIView mt={20} mb={25}>
										<UIText textAlign="center" size={FONTS.sizeLarge} weight="bold">Sucesso!</UIText>
										<UIText textAlign="center" style={{marginTop: 20}}>
											As instruções para recuperar {"\n"} sua senha foram enviadas no e-mail {'\n'}
											<UIText textAlign="center" style={{textDecorationLine: 'underline'}}>{this.email.getValue()}</UIText>
										</UIText>
									</UIView>
								</View>
								<UIButton
									theme="secondary"
									type="block"
									title="Voltar"
									onPress={() => this.props.navigation.goBack()}
								/>
							</Fragment>
						) : (
							<Fragment>
								<View style={{flex: 1}}>
									<UIView mt={20} mb={25}>
										<UIText textAlign="center" color="#000">
											Informe o e-mail vinculado a conta {"\n"} para recuperar a sua senha.
										</UIText>
									</UIView>
									<UIInput
										ref={el => this.email = el}
										placeholder={this.state.fields.email.placeholder}
										label={this.state.fields.email.label}
										keyboardType="email-address"
										autoCapitalize="none"
										blurOnSubmit={false}
										onSubmitEditing={this._onSubmit}
										onBlur={() => this._validateField("email")}
										hasError={this.state.fields.email.hasError}
										errorMessage={this.state.fields.email.errorMessage}
										// iOS
										textContentType="username"
									/>

								</View>
								<UIButton
									theme="secondary"
									type="block"
									title="ENVIAR"
									onPress={this._onSubmit}
								/>
							</Fragment>
						)
					}
				</UIScrollView>
				<UIDialogLoading
					visible={this.state.isSending}
					message="Aguarde..."
				/>
			</UIViewScreen>
		);
	}
}

export default PasswordRecovery;
