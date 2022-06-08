import React, { Component } from "react";
import { connect } from "react-redux";
import {
	TouchableOpacity,
	View,
} from "react-native";

import {
	UIButton,
	UIHeader,
	UIIcon,
	UIScrollView,
	UISwitch,
	UIText,
	UIViewScreen,
	UIModal
} from "./../../components";

import { FONTS } from "~/config/styles";
import { generalActions, authActions } from "./../../redux/actions";

import styles from "./styles";

class AccountSettings extends Component {
	constructor(props) {
		super(props)

		this.state = {
			faceId            : false,
			modalRemoveAccount: false
		}
	}

	_onChangeNotifications = (checked) => {
		if( checked )
		{
			this.props.onEnableNotifications();
		}
		else
		{
			this.props.onDisableNotifications();
		}
	};

	_onPressLogoutConfirm = () => {
		this.setState({
			modalRemoveAccount: false
		}, () => {

			// Logout
			this.props.silentLogout();

			// Go to home
			this.props.navigation.popToTop();
		})
	};

	render() {
		const {notifiable}                 = this.props;
		const {faceId, modalRemoveAccount} = this.state

		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{title: "Configurações"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView>
					<View style={{flex: 1}}>
						<View style={styles.item}>
							<UIText color="#26160F" style={{flex: 1}}>Notificações</UIText>
							<UISwitch
								checked={notifiable}
								onChange={this._onChangeNotifications}
							/>
						</View>

						<View style={styles.listSeparator} />
						<View style={styles.item}>
							<UIText color="#26160F" style={{flex: 1}}>Face/Touch ID</UIText>
							<UISwitch
								checked={faceId}
								onChange={() => {
									this.setState({faceId: !faceId})
								}}
							/>
						</View>
						<View style={styles.listSeparator} />
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => this.props.navigation.navigate("TermsOfUse")}
							style={styles.item}>
							<UIText color="#26160F" style={{flex: 1}}>Termos de Uso</UIText>
							<UIIcon name="arrow-right-light" color="#989292" />
						</TouchableOpacity>
						<View style={styles.listSeparator} />
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
							style={styles.item}>
							<UIText color="#26160F" style={{flex: 1}}>Política de Privacidade</UIText>
							<UIIcon name="arrow-right-light" color="#989292" />
						</TouchableOpacity>
						<View style={styles.listSeparator} />
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => this.props.navigation.navigate("About")}
							style={styles.item}>
							<UIText color="#26160F" style={{flex: 1}}>Sobre</UIText>
							<UIIcon name="arrow-right-light" color="#989292" />
						</TouchableOpacity>
						<View style={styles.listSeparator} />
					</View>
					<UIButton
						type="block"
						theme="secondary"
						iconPosition="left"
						title="EXCLUIR CONTA"
						onPress={() => this.modal.show()}
					/>
				</UIScrollView>
				<UIModal
					ref={el => this.modal = el}
					buttons={[
						{
							title  : "Cancelar",
							onPress: () => this.modal.hide(),
							theme  : "secondary",
							type   : "block"
						},
						{
							title  : "Excluir",
							onPress: () => this.modal.hide(),
							type   : "block"
						},
					]}
				>
					<UIText>
						Ao excluir sua conta você perderá todas as suas informações.
						{'\n\n'}
						Deseja continuar?
					</UIText>
				</UIModal>
			</UIViewScreen>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		notifiable: state.general.notifiable,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onEnableNotifications : () => {
			dispatch(generalActions.enableNotifications());
		},
		onDisableNotifications: () => {
			dispatch(generalActions.disableNotifications());
		},
		silentLogout          : () => {
			dispatch(authActions.silentLogout());
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
