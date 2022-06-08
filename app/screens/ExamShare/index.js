import React, { Component } from "react";
import { Keyboard, View } from "react-native";
import { UIButton, UIDialogConfirm, UIDialogLoading, UIHeader, UIInput, UIInputComplete, UIScrollView, UIText, UIView, UIViewScreen } from "~/components";
import { validateField } from "~/helpers/validate";
import fakeRequest from "~/helpers/fakeRequest";

class ExamShare extends Component {
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
					label       : "Nome do profissional",
					hasError    : false,
					errorMessage: "",
				},
			}
		}
	}

	componentDidMount() {
		// setTimeout(() => {
		// 	this.name.focus()
		// }, 200)
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
						title: "Compartilhar"
					}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView>
					<UIView flex={1}>
						<UIText textAlign="center" lineHeight={11}>
							Informe o nome do profissional {'\n'}
							que irá receber o exame
						</UIText>

						<UIView mt={30}>
							<UIInputComplete
								label={this.state.fields.name.label}
								placeholder={this.state.fields.name.label}
								ref={el => this.name = el}
								onBlur={() => this._validateField("name")}
								hasError={this.state.fields.name.hasError}
								errorMessage={this.state.fields.name.errorMessage}
							/>
						</UIView>
					</UIView>
					<UIButton
						onPress={this.onSubmit}
						type="block"
						theme="secondary"
						title="ENVIAR"
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
		)
	}
}

export default ExamShare