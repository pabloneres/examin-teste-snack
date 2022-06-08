import React, { Component } from 'react'

import { View, TouchableOpacity, Image, Text, Keyboard, Platform } from 'react-native'
import {
	UIViewScreen,
	UIScrollView,
	UIButton,
	UIIcon,
	UIInput,
	UIHeader,
	UIPasswordRecovery,
	UIView,
	UIText,
	UIInputMask,
	UIDialogConfirm,
	UIDialogLoading
} from '~/components'
import * as Device from 'expo-device';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux'

import { TIMEOUT_TRANSITION_FIX, API_ERRO_TYPE_VALIDATION } from "~/config/general";

import { validateField } from "~/helpers/validate";
import styles from './styles'
import { FONTS } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";
import { authActions } from "~/redux/actions";

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSending            : false,
			dialogVisible        : false,
			dialogTitle          : "",
			dialogMessage        : "",
			dialogVerticalButtons: false,
			dialogButtons        : [],
			fields               : {
				name    : {
					label       : "Nome completo",
					hasError    : false,
					errorMessage: "",
				},
				document: {
					label       : "Cpf",
					placeholder : "000.000.000-00",
					hasError    : false,
					errorMessage: "",
				},
				phone   : {
					label       : "Telefone",
					hasError    : false,
					errorMessage: "",
				},
				email   : {
					label       : "E-mail",
					hasError    : false,
					errorMessage: "",
				},
				password: {
					label       : "Senha",
					hasError    : false,
					errorMessage: "",
				},
			},
			acceptTermOfUse      : false,
			acceptPrivacyPolicy  : false,
			avatar               : {
				name: "",
				type: "",
				uri : "",
			},
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.name && this.name.focus();
		}, Platform.OS === 'ios' ? 0 : 150);
	}

	_validateRules = (field = null) => {
		const rules = {
			name    : {
				type    : "text",
				rules   : "required|minwords:2",
				messages: {
					minwords: "Informe seu nome completo",
				},
			},
			document: {
				type : "text",
				rules: "required"
			},
			email   : {
				type : "text",
				rules: "required|email",
			},
			password: {
				type    : "text",
				rules   : "required|minlength:6",
				messages: {
					minlength: "Deve contar no mínimo 6 caracteres",
				},
			},
			phone   : {
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

	_onPressEditAvatar = () => {
		this.setState({
			dialogVisible        : true,
			dialogTitle          : "O que deseja fazer?",
			dialogMessage        : "",
			dialogVerticalButtons: true,
			dialogButtons        : [
				{
					title      : "TIRAR FOTO COM A CÂMERA",
					onPress    : () => {
						this._onCloseDialog();

						setTimeout(() => {
							this.avatarUseCamera();
						}, TIMEOUT_TRANSITION_FIX);
					},
					buttonProps: {
						type: "small",
					}
				},
				{
					title      : "ESCOLHER FOTO DA GALERIA",
					onPress    : () => {
						this._onCloseDialog();

						setTimeout(() => {
							this.avatarUseLibrary();
						}, TIMEOUT_TRANSITION_FIX);
					},
					buttonProps: {
						type: "small"
					}
				},
			],
		});
	};

	_onCloseDialog = () => {
		this.setState({
			dialogVisible: false,
		});
	};

	avatarUseCamera = () => {
		ImagePicker.requestCameraPermissionsAsync().then((response) => {
			//console.log("sucess", response);
		})
		.catch((error) => {
			//console.log("error", error);
		})
		.finally(() => {
			const options = {
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality   : 0.8,
			};

			ImagePicker.launchCameraAsync(options).then((result) => {
				if( !result.cancelled )
				{
					this._onSelectPhoto(result);
				}
			}).catch((data) => {
				this.setState({
					dialogVisible        : true,
					dialogTitle          : "Ocorreu um erro!",
					dialogMessage        : String(data),
					dialogVerticalButtons: false,
					dialogButtons        : [],
				});
			});
		});
	}

	avatarUseLibrary = () => {
		ImagePicker.requestMediaLibraryPermissionsAsync().then((response) => {
			//console.log("sucess", response);
		})
		.catch((error) => {
			//console.log("error", error);
		})
		.finally(() => {
			const options = {
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality   : 0.8,
			};

			ImagePicker.launchImageLibraryAsync(options).then((result) => {
				if( !result.cancelled )
				{
					this._onSelectPhoto(result);
				}
			}).catch((data) => {
				this.setState({
					dialogVisible        : true,
					dialogTitle          : "Ocorreu um erro!",
					dialogMessage        : String(data),
					dialogVerticalButtons: false,
					dialogButtons        : [],
				});
			});
		});
	}

	_onSelectPhoto = (result) => {
		ImageManipulator.manipulateAsync(
			result.uri,
			[{resize: {width: 170}}],
			{compress: 0.9, format: ImageManipulator.SaveFormat.JPEG}
		).then((result) => {
			let localUri = result.uri;
			let filename = localUri.split('/').pop();

			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
			let mime  = match ? `image/${match[1]}` : `image`;

			this.setState({
				avatar: {
					name: filename,
					type: mime,
					uri : localUri,
				},
			});
		}).catch(() => {
			this.setState({
				dialogVisible        : true,
				dialogTitle          : "Ocorreu um erro ao processar imagem!",
				dialogMessage        : String(data),
				dialogVerticalButtons: false,
				dialogButtons        : [],
			});
		});
	};

	getRedirectTo = () => {
		return this.props.route.params?.redirectTo ?? null;
	};

	_onSubmit = () => {
		let validateForm = this._validateFields();

		if( validateForm.hasError ) return false;

		// Dismiss keyboard
		setTimeout(Keyboard.dismiss, 150);

		if( !this.state.acceptTermOfUse )
		{
			this.setState({
				dialogVisible: true,
				dialogTitle  : "Falha",
				dialogMessage: "Você precisa aceitar a política de privacidade.",
				dialogButtons: [],
			});

			return false;
		}

		this.setState({
			isSending: true,
		});

		const data = {
			token_name         : Device.deviceName ?? `${Device.brand} ${Device.modelName}`,
			name               : this.name.getValue(),
			document           : this.document.getValue(),
			email              : this.email.getValue(),
			phone              : this.phone.getValue(),
			password           : this.password.getValue(),
			termsofuse_accepted: 1,
		};

		let accessToken = "";

		fakeRequest(true, "register").then((response) => {
			accessToken = response.data.access_token

			return fakeRequest(true, "getUserData")
		}).then((response) => {
			this.setState({
				isSending: false,
			});

			this.props.onRegister({
				accessToken: accessToken,
				...response.data.data,
			});

			// Need confirm number
			// if ( true ) { // TODO
			// 	return this.props.navigation.replace("PhoneConfirm", {
			// 		redirectTo: this.getRedirectTo(),
			// 	})
			// }

			// Need complete register
			if( !response.data.data.is_completed )
			{
				return this.props.navigation.replace('RegisterComplete', {
					redirectTo: this.getRedirectTo(),
				});
			}

			const redirectTo = this.getRedirectTo();

			if( redirectTo )
			{
				// Go to redirect
				return this.props.navigation.replace(redirectTo.name, redirectTo.params);
			}

			// Go to home
			this.props.navigation.popToTop();
		}).catch((data) => {
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

	render() {
		const {avatar} = this.state

		return (
			<UIViewScreen enableStatusBar hasForm>
				<UIHeader
					left={{
						icon   : "back",
						onPress: () => this.props.navigation.replace("Login")
					}}
					center={{title: "Criar conta"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView keyboardShouldPersistTaps="handled">
					<View style={styles.loginContainer}>
						<View style={{flex: 1, marginBottom: 30}}>
							<View style={styles.avatarWrap}>
								<View style={styles.avatar}>
									{
										avatar?.uri ? (
											<Image style={styles.avatarImage} source={{uri: avatar?.uri}} resizeMode="cover" />
										) : (
											<UIIcon name="userRound" color="#c4c4c4" size={80} />
										)
									}
									<TouchableOpacity
										activeOpacity={0.6}
										onPress={this._onPressEditAvatar}
										style={styles.avatarBtn}>
										<UIIcon name="camera" primary size={15} />
									</TouchableOpacity>
								</View>
							</View>
							<UIInput
								label={this.state.fields.name.label}
								placeholder={this.state.fields.name.label}
								ref={el => this.name = el}
								onBlur={() => this._validateField("name")}
								hasError={this.state.fields.name.hasError}
								errorMessage={this.state.fields.name.errorMessage}
								onSubmitEditing={(e) => this.document.focus()}
							/>
							<UIInputMask
								ref={el => this.document = el}
								type="cpf"
								label={this.state.fields.document.label}
								placeholder={this.state.fields.document.placeholder}
								maxLength={14}
								keyboardType="number-pad"
								onBlur={() => this._validateField("document")}
								hasError={this.state.fields.document.hasError}
								errorMessage={this.state.fields.document.errorMessage}
								onSubmitEditing={(e) => this.phone.focus()}
							/>
							<UIInputMask
								ref={el => this.phone = el}
								type="cel-phone"
								label={this.state.fields.phone.label}
								placeholder={this.state.fields.phone.label}
								options={{
									maskType: 'BRL',
									withDDD : true,
									dddMask : '(99) '
								}}
								keyboardType="number-pad"
								blurOnSubmit={false}
								onBlur={() => this._validateField("phone")}
								hasError={this.state.fields.phone.hasError}
								errorMessage={this.state.fields.phone.errorMessage}
								onSubmitEditing={(e) => this.email.focus()}
							/>
							<UIInput
								label={this.state.fields.email.label}
								ref={el => this.email = el}
								placeholder={this.state.fields.email.label}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								blurOnSubmit={false}
								onBlur={() => this._validateField("email")}
								hasError={this.state.fields.email.hasError}
								errorMessage={this.state.fields.email.errorMessage}
								onSubmitEditing={(e) => this.password.focus()}
							/>
							<UIInput
								label={this.state.fields.password.label}
								ref={el => this.password = el}
								placeholder={this.state.fields.password.label}
								secureTextEntry
								autoCapitalize="none"
								autoCorrect={false}
								returnKeyType="send"
								onBlur={() => this._validateField("password")}
								hasError={this.state.fields.password.hasError}
								errorMessage={this.state.fields.password.errorMessage}
								containerStyle={{marginBottom: 25}}
								// iOS
								textContentType="password"
								passwordRules="minlength: 1;"
							/>
							<View style={{flexDirection: "row", alignItems: "flex-end"}}>
								<TouchableOpacity
									activeOpacity={0.6}
									onPress={() => {
										Keyboard.dismiss();

										this.setState({acceptTermOfUse: !this.state.acceptTermOfUse});
									}}
									style={styles.acceptOptionWrap}>
									<View style={styles.acceptOptionCheck(this.state.acceptTermOfUse)}>
										{this.state.acceptTermOfUse && <View style={styles.checkedOption(this.state.acceptTermOfUse)} />}
									</View>
								</TouchableOpacity>
								<View style={styles.textOption}>
									<UIText color="#989292" size={15}>Estou de acordo com a {" "}
										<Text style={{fontSize: 15}} onPress={() => this.props.navigation.navigate("PrivacyPolicy")} style={{textDecorationLine: "underline"}}>Política {"\n"} de Privacidade</Text> e {" "}
										<Text style={{fontSize: 15}} onPress={() => this.props.navigation.navigate("TermsOfUse")} style={{textDecorationLine: "underline"}}>Termos de Uso</Text>
									</UIText>
								</View>
							</View>
						</View>
						<UIButton
							theme="secondary"
							type="block"
							title="CONFIRMAR"
							onPress={this._onSubmit}
						/>
					</View>
				</UIScrollView>
				<UIDialogConfirm
					visible={this.state.dialogVisible}
					title={this.state.dialogTitle}
					verticalButtons={this.state.dialogVerticalButtons}
					message={this.state.dialogMessage}
					onTouchOutside={this._onCloseDialog}
					buttons={this.state.dialogButtons.length ? this.state.dialogButtons : [
						{
							title  : "CONTINUAR",
							onPress: this._onCloseDialog,
						},
					]}
				/>
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
		onRegister: (data) => {
			dispatch(authActions.register(data));
		},
	}
};

export default connect(null, mapDispatchToProps)(Register);