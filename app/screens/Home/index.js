import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { UIButton, UIHeader, UIText, UIViewScreen, UIView, UIScrollView, UIIcon } from '../../components'
import { connect } from "react-redux";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

import { FONTS, MENU_FLOAT } from "~/config/styles";
import styles from "./styles";

import Card from "./card";
import Button from "./button";

import IconCard1 from "~/assets/svg/iconcard1.svg"
import IconCard2 from "~/assets/svg/iconcard2.svg"
import IconCard3 from "~/assets/svg/iconcard3.svg"
import IconCard4 from "~/assets/svg/iconcard4.svg"

import Iconanamnese from "~/assets/svg/iconanamnese.svg"
import Iconuser from "~/assets/svg/iconuser.svg"
import Icontinker from "~/assets/svg/icontinker.svg"
import Task from "./task";
import { authActions } from "~/redux/actions";
import { isIPhoneWithMonobrow } from "~/helpers/statusBarHeight";

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks: [
				{
					title     : "Finalizar cadastro",
					onContinue: () => this.props.navigation.navigate("AccountEdit")
				},
				{
					title     : "Alterar senha de acesso",
					onContinue: () => this.props.navigation.navigate("AccountPassword")
				},
				{
					title     : "Preencher Anamnese",
					onContinue: () => this.props.navigation.navigate("Anamnese")
				},
			]
		}
	}

	componentDidMount() {
		if( !this.props.isAuthenticated )
		{
			return this.props.navigation.navigate("Login")
		}
	}

	_renderTop = () => {
		const {userData} = this.props

		return (
			<View style={styles.profileContainer}>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate("AccountEdit")}
					activeOpacity={.7}
					style={styles.imageContainer}>
					<Image style={{width: "100%", height: "100%"}} source={{uri: userData.avatar?.uri}} />
				</TouchableOpacity>
				<UIView ml={15}>
					<UIText size={11} color="#989292">{userData.document}</UIText>
					<Menu>
						<MenuTrigger customStyles={{TriggerTouchableComponent: TouchableOpacity, triggerTouchable: {activeOpacity: 0.6}, triggerWrapper: styles.itemMenuTrigger}}>
							<UIText size={FONTS.sizeLarge} weight="bold" primary>
								Olá, {userData.name.split(' ')[0]}
							</UIText>
							<UIIcon name="select-arrow-b" primary size={7} style={{marginTop: Platform.OS === "ios" ? 2 : 5, marginLeft: 5}} />
						</MenuTrigger>
						<MenuOptions customStyles={{OptionTouchableComponent: TouchableOpacity, optionTouchable: {activeOpacity: 0.6}, optionsContainer: styles.itemMenuOptionContainer, optionWrapper: styles.itemMenuOptionWrap, optionText: styles.itemMenuOptionText}}>
							<MenuOption
								text="Configurações"
								onSelect={() => this.props.navigation.navigate("AccountSettings")}
							/>
							<View style={MENU_FLOAT.styleOptionDivider} />
							<MenuOption
								text="Sair"
								onSelect={this._onPressLogoutConfirm}
							/>
						</MenuOptions>
					</Menu>
					<UIText size={11} color="#26160F">{userData.phone}</UIText>
				</UIView>
			</View>
		)
	}

	_onPressLogoutConfirm = () => {
		// Logout
		this.props.silentLogout();

		// Go to login
		this.props.navigation.navigate("Login");
	};

	onCloseTask = (index) => {
		const task = this.state.tasks.splice(index, 1)

		this.setState({
			task: task
		})
	}

	render() {
		const {tasks} = this.state

		return (
			<UIViewScreen enableStatusBar>
				{this._renderTop()}
				<UIScrollView keyboardShouldPersistTaps="handled">
					<View>
						{
							this.state.tasks.map((item, index) => (
								<Task
									key={index}
									title={item.title}
									onClose={() => this.onCloseTask(index)}
									onContinue={item.onContinue}
								/>
							))
						}
					</View>
					<View style={[styles.cardsContainer, tasks.length > 0 ? {marginTop: 15} : {}]}>
						<Card
							backgroundColor="#61604A"
							backgorundImage={require("~/assets/img/imagecard1.png")}
							icon={<IconCard1 />}
							name="Exames Médicos"
							onPress={() => this.props.navigation.navigate("MedicalExam")}
						/>
						<Card
							backgroundColor="#B9A584"
							backgorundImage={require("~/assets/img/imagecard2.png")}
							icon={<IconCard2 />}
							name="Exames Odontológicos"
							onPress={() => this.props.navigation.navigate("DentalExam")}
						/>
						<Card
							backgroundColor="#ECA125"
							backgorundImage={require("~/assets/img/imagecard3.png")}
							icon={<IconCard3 />}
							name="Carteira de Vacinação"
							onPress={() => this.props.navigation.navigate("VaccinationCard")}
						/>
						<Card
							backgroundColor="#723C1F"
							backgorundImage={require("~/assets/img/imagecard4.png")}
							icon={<IconCard4 />}
							name="Alerta de exames"
							badge={2}
							onPress={() => this.props.navigation.navigate("ExamAlert")}
						/>
					</View>
					<View style={styles.containerButtons}>
						<Button
							icon={<Iconanamnese />}
							name="Anamnese"
							onPress={() => this.props.navigation.navigate("Anamnese")}
						/>
						<Button
							icon={<Iconuser />}
							name={`Informações \npessoais`}
							styleText={{lineHeight: 14, marginTop: 4}}
							onPress={() => this.props.navigation.navigate("AccountEdit")}
						/>
						<Button
							last={true}
							icon={<Icontinker />}
							name="Lembretes"
							badge={2}
							onPress={() => this.props.navigation.navigate("Reminders")}
						/>
					</View>
				</UIScrollView>
			</UIViewScreen>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		userData       : state.auth.userData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		silentLogout: () => {
			dispatch(authActions.silentLogout());
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)