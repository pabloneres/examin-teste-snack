import React, { Component, Fragment } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { UIButton, UIDialogConfirm, UIDialogLoading, UIHeader, UIIcon, UIInputDate, UILoading, UIModal, UIScrollView, UIText, UIView, UIViewScreen } from '~/components'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import styles from './styles';
import Item from './item'
import { CONTENT } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";
import Toast from "react-native-root-toast";

import { TOAST } from "~/config/styles";

class ExamAlert extends Component {
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
			alerts               : []
		}
	}

	componentDidMount() {
		this.loadAlerts()
	}

	loadAlerts = () => {
		fakeRequest(true, "alerts")
		.then((response) => {
			this.setState({
				isLoading: false,
				alerts   : response.data.data
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

	onDelete = (id) => { //TODO
		let alerts = this.state.alerts
		alerts.splice(id, 1)

		this.setState(state => ({
			alerts,
		}))
	}

	onActive = (id) => { //TODO
		this.modal.show()
	}

	renderList = () => {
		const {alerts} = this.state
		return (
			<View style={{flex: 1}}>
				{
					alerts.map((item, index) => (
						<Fragment key={index}>
							<Item
								title={item.title}
								frequency={item.frequency}
								onActiveAlert={() => this.onActive(index)} //TODO
								onDelete={() => this.onDelete(index)} //TODO
							/>
							{(alerts.length !== index + 1) && <View style={styles.dividerRow} />}
						</Fragment>
					))
				}
			</View>
		)
	}

	render() {
		const {isLoading} = this.state

		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{title: "Alerta de exames"}}
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
								{this.renderList()}
								{/*<View style={{paddingBottom: CONTENT.paddingVertical}}>*/}

								{/*</View>*/}
								<UIButton
									type="block"
									theme="secondary"
									title="PERSONALIZAR"
									onPress={() => this.props.navigation.navigate("Personalize")}
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
				<UIModal
					ref={el => this.modal = el}
					title="Agendar alerta"
					buttons={[
						{
							title  : "CANCELAR",
							onPress: () => this.modal.hide(),
							theme  : "secondary",
							type   : "block"
						},
						{
							title  : "SALVAR",
							onPress: () => this.modal.hide(),
							type   : "block"
						},
					]}
				>
					<UIInputDate
						mode="date"
						iconColor="#000"
						value={new Date()} />
					<UIInputDate
						mode="time"
						value={new Date()}
						iconColor="#000"
						showDateFormat="HH:mm" />
				</UIModal>
			</UIViewScreen>
		)
	}
}

export default ExamAlert