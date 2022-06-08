import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "~/screens/ExamAlert/styles";
import { UIIcon, UIText, UIView } from "~/components";
import { FONTS, MENU_FLOAT } from "~/config/styles";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import PropTypes from "prop-types";

class Item extends Component {
	static propTypes = {
		title    : PropTypes.string.isRequired,
		frequency: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[styles.item, this.props.style]}>
				<View>
					<UIText size={FONTS.sizeLarge} color="#26160f">{this.props.title}</UIText>
					<UIText color="#26160f" size={13}>Periodicidade: {this.props.frequency}</UIText>
				</View>
				<Menu style={styles.itemMenu}>
					<MenuTrigger customStyles={{TriggerTouchableComponent: TouchableOpacity, triggerTouchable: {activeOpacity: 0.6}, triggerWrapper: styles.itemMenuTrigger}}>
						<UIIcon name="menu-dot" primary size={20} />
					</MenuTrigger>
					<MenuOptions customStyles={{OptionTouchableComponent: TouchableOpacity, optionTouchable: {activeOpacity: 0.6}, optionsContainer: styles.itemMenuOptionContainer, optionWrapper: styles.itemMenuOptionWrap, optionText: styles.itemMenuOptionText}}>
						<MenuOption
							text="Ativar alerta"
							onSelect={this.props.onActiveAlert}
						/>
						<View style={MENU_FLOAT.styleOptionDivider} />
						<MenuOption
							text="Excluir"
							onSelect={this.props.onDelete}
						/>
					</MenuOptions>
				</Menu>
			</View>
		)
	}
}

export default Item