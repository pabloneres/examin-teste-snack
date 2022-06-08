import React, { Component, Fragment } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { UIButton, UIDialogConfirm, UIDialogLoading, UIHeader, UIIcon, UILoading, UIScrollView, UIText, UIView, UIViewScreen } from '~/components'
import styles from './styles'
import { CHECKBOX, CONTENT, TOAST } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";
import { API_ERRO_TYPE_VALIDATION } from "~/config/general";
import Toast from "react-native-root-toast";

class Anamnese extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading            : true,
			isSending            : false,
			dialogVisible        : false,
			dialogTitle          : "",
			dialogMessage        : "",
			dialogVerticalButtons: false,
			dialogButtons        : [],
			list                 : []
		}
	}

	componentDidMount() {
		this.loadAnamnese()
	}

	loadAnamnese = () => {
		fakeRequest(true, "anamnese")
		.then((response) => {
			this.setState({
				isLoading: false,
				list     : response.data.data
			})
		}).catch((data) => {
			this.setState({
				isLoading: false,
			});
		});
	}

	_onCloseDialog = () => {
		this.setState({
			dialogVisible: false,
		});
	};

	onCheckOption = (index, indexList) => {
		const list = this.state.list

		list[index].list[indexList].checked = !list[index].list[indexList].checked

		this.setState({
			list
		})
	}

	_onSubmit = () => {
		this.setState({
			isSending: true,
		});

		fakeRequest(true).then((response) => {
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
		}).catch((data) => {
			this.setState({
				isSending    : false,
				dialogVisible: true,
				dialogTitle  : "Falha",
				dialogMessage: String(data),
				dialogButtons: [],
			});
		})
	}

	render() {
		const {list, isLoading} = this.state
		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{title: "Anamnese"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView>
					{
						isLoading ? (
							<View style={styles.loading}>
								<UILoading />
							</View>
						) : (
							<Fragment>
								<View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
									{
										list.map((item, index) => {
											return (
												<View key={index} style={styles.listItemContainer}>
													<UIView mb={20} mt={index === 0 ? 0 : 10}>
														<UIText weight="bold" color="#000">{item.title}</UIText>
													</UIView>
													{
														item.list.map((listItem, indexList) => {
															return (
																<View key={indexList} style={styles.optionContainer}>
																	<TouchableOpacity onPress={() => this.onCheckOption(index, indexList)} style={CHECKBOX.acceptOptionCheck}>
																		{listItem.checked && <View style={CHECKBOX.checkedOption} />}
																	</TouchableOpacity>
																	<UIText color="#696969">{listItem.title}</UIText>
																</View>
															)
														})
													}
												</View>
											)
										})
									}
								</View>
								{/*<View style={{paddingBottom: CONTENT.paddingVertical}}>*/}

								{/*</View>*/}
								<UIButton
									type="block"
									title="SALVAR ANAMNESE"
									theme="secondary"
									onPress={this._onSubmit}
								/>
							</Fragment>
						)
					}
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

export default Anamnese