import React, { Component } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import * as Device from 'expo-device';
import { UIButton, UIHeader, UIIcon, UIInput, UIInputMask, UIScrollView, UIText, UIView, UIViewScreen } from '../../components'

import { validateField } from "~/helpers/validate";
import LogoFullBlack from '~/assets/svg/logo_full_black.svg'
import styles from "./styles";
import { FONTS } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";
import { UIDialogLoading } from "~/components";
import { API_ERRO_TYPE_VALIDATION } from "~/config/general";
import { connect } from "react-redux";
import { authActions } from "~/redux/actions";

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isSending    : false,
			dialogVisible: false,
			dialogTitle  : "",
			dialogMessage: "",
			dialogButtons: [],
			fields       : {
				document: {
					label       : "Cpf",
					placeholder : "000.000.000-00",
					hasError    : false,
					errorMessage: "",
				},
				password: {
					label       : "Senha",
					placeholder : "••••••••",
					hasError    : false,
					errorMessage: "",
				},
			},
		}
	}

	_validateRules = (field = null) => {
		const rules = {
			document: {
				type : "text",
				rules: "required",
			},
			password: {
				type    : "text",
				rules   : "required|minlength:6",
				messages: {
					minlength: "Deve contar no mínimo 6 caracteres",
				},
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

		let hasError          = false;
		let focusedErrorField = false;

		Object.entries(fields_config).forEach(([key, value]) => {
			// Validate field
			let validateField = this._validateField(key);
			// Save has error
			if( validateField.hasError )
			{
				if( !focusedErrorField )
				{
					focusedErrorField = true
					this[key].focus()
				}
				hasError = true;
			}
		});

		return {
			hasError: hasError,
		}
	};

	_onSubmit = () => {
		let validateForm = this._validateFields();

		if( validateForm.hasError ) return false;

		// Dismiss keyboard
		setTimeout(Keyboard.dismiss, 150);

		this.setState({
			isSending: true,
		});

		const data = {
			document  : this.document.getValue(),
			password  : this.password.getValue(),
			token_name: Device.deviceName ?? `${Device.brand} ${Device.modelName}`,
		};

		let accessToken = "";

		// authService.login(data) //TODO
		fakeRequest(true, "login")
		.then((response) => {
			accessToken = response.data.access_token;

			// Update accessToken from api instance
			// apiUpdateAccessToken(`Bearer ${accessToken}`); //TODO

			// Get user data
			// return authService.getUserData();
			return fakeRequest(true, "getUserData")
		})
		.then((response) => {
			this.setState({
				isSending: false,
			});

			this.props.onLogin({
				accessToken: accessToken,
				...response.data.data,
			});

			// Go to home
			this.props.navigation.popToTop();
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
	};

	render() {
		return (
			<UIViewScreen enableStatusBar hasForm statusBarTheme="default">
				<UIScrollView keyboardShouldPersistTaps="handled">
					<UIView align="center" mt={40}>
						<LogoFullBlack />
						<UIText style={{marginTop: 30}} color="#000" weight="bold" size={FONTS.sizeLarge}>Entre usando</UIText>
						<View style={styles.containerSocialLogin}>
							<TouchableOpacity activeOpacity={.7} style={[styles.buttonSocialLogin, {backgroundColor: "#4267b2", marginLeft: 0}]}>
								<UIIcon name="facebook" color="#fff" size={25} />
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={.7} style={[styles.buttonSocialLogin, {backgroundColor: "#db4437"}]}>
								<UIIcon name="google" color="#fff" size={25} />
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={.7} style={[styles.buttonSocialLogin, {backgroundColor: "#000"}]}>
								<UIIcon name="apple" color="#fff" size={25} />
							</TouchableOpacity>
						</View>
						<UIText color="#989292">Ou informe seus dados de acesso</UIText>
					</UIView>
					<View style={{flex: 1, marginTop: 10}}>
						<UIInputMask
							ref={el => this.document = el}
							type="cpf"
							label={this.state.fields.document.label}
							placeholder={this.state.fields.document.placeholder}
							maxLength={14}
							keyboardType="number-pad"
							onSubmitEditing={(e) => this.password.focus()}
							onBlur={() => this._validateField("document")}
							hasError={this.state.fields.document.hasError}
							errorMessage={this.state.fields.document.errorMessage}
						/>
						<UIInput
							ref={el => this.password = el}
							label={this.state.fields.password.label}
							placeholder={this.state.fields.password.placeholder}
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="send"
							onSubmitEditing={this._onSubmit}
							onBlur={() => this._validateField("password")}
							hasError={this.state.fields.password.hasError}
							errorMessage={this.state.fields.password.errorMessage}
							// iOS
							textContentType="password"
							passwordRules="minlength: 1;"
						/>
						<TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("PasswordRecovery")}>
							<UIText textAlign="right" color="#26160F" weight="bold" size={FONTS.sizeMiddle} style={{marginBottom: 20}}>ESQUECI MINHA SENHA</UIText>
						</TouchableOpacity>
						<UIButton
							type="block"
							title="ENTRAR"
							theme="secondary"
							onPress={this._onSubmit}
						/>
					</View>
					<UIText textAlign="center" color="#989292" style={{marginBottom: 15}}>Novo por aqui? Crie sua conta</UIText>
					<UIButton
						onPress={() => this.props.navigation.navigate("Register")}
						type="block"
						title="CRIAR CONTA"
					/>
				</UIScrollView>
				<UIDialogLoading
					visible={this.state.isSending}
					message="Aguarde..."
				/>
			</UIViewScreen>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onLogin: (data) => {
			dispatch(authActions.login(data));
		},
	}
};

export default connect(null, mapDispatchToProps)(Login);
