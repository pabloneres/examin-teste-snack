import React, { Component } from 'react'

import { View, TouchableOpacity, Image, Text, Keyboard } from 'react-native'
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
	UIDialogLoading,
	UISelect,
	UISelectModal,
	UIInputDate, UIInputCity
} from '~/components'
import * as Device from 'expo-device';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import moment from 'moment';
import { connect } from "react-redux"

import { TIMEOUT_TRANSITION_FIX, API_ERRO_TYPE_VALIDATION } from "~/config/general";

import { validateField } from "~/helpers/validate";
import styles from './styles'
import { authActions } from "~/redux/actions";
import fakeRequest from "~/helpers/fakeRequest";
import DateTimePicker from "@react-native-community/datetimepicker";

class AccountEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSending            : false,
			dialogVisible        : false,
			dialogTitle          : "",
			dialogMessage        : "",
			dialogVerticalButtons: false,
			dialogButtons        : [],
			avatar               : {
				name: "",
				type: "",
				uri : "",
			},
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
				gender  : {
					label       : "Sexo",
					hasError    : false,
					errorMessage: "",
				},
				birth   : {
					label       : "Nascimento",
					hasError    : false,
					errorMessage: "",
				},
				uf      : {
					label       : "Estado",
					hasError    : false,
					errorMessage: "",
				},
				city    : {
					label       : "Cidade",
					hasError    : false,
					errorMessage: "",
				},
				password: {
					label       : "Criar senha",
					hasError    : false,
					errorMessage: "",
				},
			},
			acceptTermOfUse      : false,
			acceptPrivacyPolicy  : false,
		}
	}

	componentDidMount() {
		const {userData} = this.props;

		if( userData.avatar )
		{
			this.setState(state => ({
				avatar: userData.avatar
			}))
		}

		// Fill form
		this.name.setValue(userData.name);
		this.phone.setValue(userData.phone);
		this.email.setValue(userData.email);
		this.document.setValue(userData.document);

		if( userData.gender )
		{
			this.gender.setValue(userData.gender);
		}

		if( userData.birth )
		{
			this.birth.setValue(userData.birth);
		}

	};

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
			phone   : {
				type : "text",
				rules: "required",
			},
			email   : {
				type : "text",
				rules: "required|email",
			},
			gender  : {
				type : "text",
				rules: "required",
			},
			birth   : {
				type : "text",
				rules: "required",
			},
			uf      : {
				type : "text",
				rules: "required",
			},
			city    : {
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

	_onSubmit = () => {
		// Dismiss keyboard
		setTimeout(Keyboard.dismiss, 150);

		let validateForm = this._validateFields();

		if( validateForm.hasError ) return false;

		this.setState({
			isSending: true,
		});

		const data = {
			token_name: Device.deviceName ?? `${Device.brand} ${Device.modelName}`,
			name      : this.name.getValue(),
			document  : this.document.getValue(),
			phone     : this.phone.getValue(),
			email     : this.email.getValue(),
			gender    : this.gender.getValue(),
			birth     : this.birth.getValue(),
			// city      : this.city.getValue(), //TODO
		};

		if( this.state.avatar.uri )
		{
			data.avatar = this.state.avatar;
		}

		fakeRequest(true, "return", data).then((response) => {
			this.setState({
				isSending    : false,
				dialogVisible: true,
				dialogTitle  : "Dados atualizados",
				dialogMessage: "Seus dados foram atualizados com sucesso.",
				dialogButtons: [
					{
						title  : "CONTINUAR",
						onPress: () => {
							this._onCloseDialog();

							this.props.navigation.goBack();
						},
					},
				],
			});

			this.props.onEditUserData(response.data.data);
			this.props.onEditUserAvatar(data.avatar)
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
		const {userData} = this.props;
		const {avatar}   = this.state
		return (
			<UIViewScreen enableStatusBar hasForm>
				<UIHeader
					left="backButton"
					center={{title: "Editar perfil"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView keyboardShouldPersistTaps="handled">
					<View style={styles.content}>
						<View style={styles.loginContainer}>
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
								ref={el => this.name = el}
								placeholder={this.state.fields.name.label}
								onBlur={() => this._validateField("name")}
								hasError={this.state.fields.name.hasError}
								errorMessage={this.state.fields.name.errorMessage}
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
							/>
							<UISelect
								ref={el => this.gender = el}
								label={this.state.fields.gender.label}
								placeholder={this.state.fields.gender.label}
								title={this.state.fields.gender.label}
								options={[
									{value: "Masculino", label: "Masculino"},
									{value: "Feminino", label: "Feminino"},
								]}
								onSelectItem={() => this._validateField("gender")}
								hasError={this.state.fields.gender.hasError}
								errorMessage={this.state.fields.gender.errorMessage}
							/>
							{/*<DatePicker*/}
							{/*	style={styles.datePickerStyle}*/}
							{/*	date={date} //initial date from state*/}
							{/*	mode="date" //The enum of date, datetime and time*/}
							{/*	placeholder="select date"*/}
							{/*	format="DD-MM-YYYY"*/}
							{/*	minDate="01-01-2016"*/}
							{/*	maxDate="01-01-2019"*/}
							{/*	confirmBtnText="Confirm"*/}
							{/*	cancelBtnText="Cancel"*/}
							{/*	customStyles={{*/}
							{/*		dateIcon : {*/}
							{/*			//display: 'none',*/}
							{/*			position  : 'absolute',*/}
							{/*			left      : 0,*/}
							{/*			top       : 4,*/}
							{/*			marginLeft: 0,*/}
							{/*		},*/}
							{/*		dateInput: {*/}
							{/*			marginLeft: 36,*/}
							{/*		},*/}
							{/*	}}*/}
							{/*	onDateChange={(date) => {*/}
							{/*		setDate(date);*/}
							{/*	}}*/}
							{/*/>*/}
							<UIInputDate
								ref={el => this.birth = el}
								label={this.state.fields.birth.label}
								placeholder={this.state.fields.birth.label}
								onSelect={() => this._validateField("birth")}
								hasError={this.state.fields.birth.hasError}
								errorMessage={this.state.fields.birth.errorMessage}
								mode="date"
								dateTimePickerProps={{
									maximumDate: moment().toDate(),
								}}
								pickerValue={moment().subtract(18, "years").toDate()}
							/>
							<UIInputCity
								label={this.state.fields.city.label}
								ref={el => this.city = el}
								placeholder={this.state.fields.city.label}
								autoCapitalize="none"
								autoCorrect={false}
								blurOnSubmit={false}
								onBlur={() => this._validateField("city")}
								hasError={this.state.fields.city.hasError}
								errorMessage={this.state.fields.city.errorMessage}
							/>
							<UIButton
								borderRadius="round"
								style={{backgroundColor: "transparent", height: 40, justifyContent: "center", marginVertical: 20}}
								iconName="lock"
								styleIcon={{fontSize: 12, color: "#000"}}
								onPress={() => this.props.navigation.navigate("AccountPassword")}
							>
								<UIText color="#000" weight="bold" size={12}>ALTERAR SENHA DE ACESSO</UIText>
							</UIButton>
						</View>
						<UIButton
							theme="secondary"
							type="block"
							title="SALVAR"
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

const mapStateToProps = (state, ownProps) => {
	return {
		userData: state.auth.userData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onEditUserData  : (data) => {
			dispatch(authActions.editUserData(data));
		},
		onEditUserAvatar: (avatar) => {
			dispatch(authActions.editUserAvatar(avatar));
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountEdit);