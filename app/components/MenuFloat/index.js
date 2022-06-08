import React, { Component, Fragment } from "react";
import { TouchableOpacity, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import styles from "./styles";

import UIIcon from '../Icon'
import UIText from '../Text'

import { FONTS, MENU_FLOAT } from "~/config/styles";

class UIMenuFloat extends Component {
	static propTypes = {
		trigger     : PropTypes.element,
		options     : PropTypes.arrayOf(PropTypes.shape({
			title  : PropTypes.string.isRequired,
			onPress: PropTypes.func.isRequired
		})),
		styleWrapper: ViewPropTypes.style,
		textAlign   : PropTypes.string
	}

	static defaultProps = {
		textAlign: "left"
	}

	_renderTrigger = () => {
		if( React.isValidElement(this.props.trigger) )
		{
			return this.props.trigger
		}
		return <UIIcon name="menu-dot" primary size={20} />
	}

	render() {
		const {options, trigger, styleWrapper} = this.props
		return (
			<View style={{flex: 1, alignItems: "flex-end"}}>
				<Menu>
					<MenuTrigger customStyles={{TriggerTouchableComponent: TouchableOpacity, triggerTouchable: {activeOpacity: 0.6}, triggerWrapper: [styles.itemMenuTrigger, styleWrapper]}}>
						{this._renderTrigger()}
					</MenuTrigger>
					<MenuOptions customStyles={{OptionTouchableComponent: TouchableOpacity, optionTouchable: {activeOpacity: 0.6}, optionsContainer: styles.itemMenuOptionContainer, optionWrapper: styles.itemMenuOptionWrap, optionText: [styles.itemMenuOptionText, {textAlign: this.props.textAlign}]}}>
						{
							options.map((item, index) => (
								<View key={index}>
									<MenuOption
										text={item.title}
										onSelect={item.onPress}
									/>
									{options.length - 1 !== index && <View style={MENU_FLOAT.styleOptionDivider} />}
								</View>
							))
						}
					</MenuOptions>
				</Menu>
			</View>
		)
	}
}

export default UIMenuFloat