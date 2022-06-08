import React, { Component } from "react";
import { Keyboard, Platform, View } from "react-native";
import { UIButton, UICitiesModal, UIDialogConfirm, UIDialogLoading, UIHeader, UIInput, UIModal, UIScrollView, UIView, UIViewScreen } from "~/components";
import { validateField } from "~/helpers/validate";
import { TIMEOUT_TRANSITION_FIX } from "~/config/general";
import fakeRequest from "~/helpers/fakeRequest";
import * as ImagePicker from "expo-image-picker";

class NewVaccine extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSending            : false,
			dialogVisible        : false,
			dialogTitle          : "",
			dialogMessage        : "",
			dialogVerticalButtons: false,
			dialogButtons        : [],
			fields               : {
				name: {
					label       : "Nome da vacina",
					hasError    : false,
					errorMessage: "",
				}
			}
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.name && this.name.focus();
		}, Platform.OS === 'ios' ? 0 : 150);
	}

	_validateRules = (field = null) => {
		const rules = {
			name: {
				type : "text",
				rules: "required|minwords:1",
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

	_onPressAttachment = () => {
		this.setState({
			dialogVisible        : true,
			dialogTitle          : "O que deseja fazer?",
			dialogMessage        : "",
			dialogVerticalButtons: true,
			dialogButtons        : [
				{
					title      : "Biblioteca",
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
				{
					title      : "Tira foto",
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
			],
		});
	};

	_onCloseDialog = () => {
		this.setState({
			dialogVisible: false,
		});
	};

	onSubmit = () => {
		let validateForm = this._validateFields();

		if( validateForm.hasError ) return false;

		// Dismiss keyboard
		setTimeout(Keyboard.dismiss, 150);
		this.setState({
			isSending: true,
		});

		fakeRequest(true) //TODO
		.then((response) => {
			this.setState({
				isSending: false,
			});

			this.props.navigation.goBack()
		})
	}

	render() {
		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{
						title: "Nova vacina"
					}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView>
					<UIView flex={1}>
						<UIInput
							label={this.state.fields.name.label}
							placeholder={this.state.fields.name.label}
							ref={el => this.name = el}
							onBlur={() => this._validateField("name")}
							hasError={this.state.fields.name.hasError}
							errorMessage={this.state.fields.name.errorMessage}
						/>
						<UIButton
							type="block"
							theme="secondary"
							title="ANEXAR ARQUIVO"
							onPress={this._onPressAttachment}
						/>
					</UIView>
					<UIButton
						type="block"
						title="CADASTRAR VACINA"
						onPress={this.onSubmit}
					/>
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
		);
	}
}

export default NewVaccine