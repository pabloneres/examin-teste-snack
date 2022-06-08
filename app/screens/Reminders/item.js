import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { UIIcon, UIMenuFloat, UIText, UIView } from "~/components";
import { FONTS } from "~/config/styles";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import PropTypes from "prop-types";

class Item extends Component {
	static propTypes = {
		title    : PropTypes.string.isRequired,
		date     : PropTypes.string.isRequired,
		onDelete : PropTypes.func,
		onDetails: PropTypes.func
	}

	render() {
		return (
			<View style={[styles.item, this.props.style]} opacity={this.props.inactive ? .5 : 1}>
				<View width="90%">
					<TouchableOpacity
						activeOpacity={.7}
						onPress={this.props.onDetails}
					><UIText size={FONTS.sizeLarge} color="#26160f">{this.props.title}</UIText></TouchableOpacity>
					<UIText color="#26160f" size={13}>{this.props.date}</UIText>
				</View>
				<UIMenuFloat
					options={[
						{
							title  : "Detalhes",
							onPress: this.props.onDetails
						},
						{
							title  : "Excluir",
							onPress: this.props.onDelete
						}
					]}
				/>
			</View>
		)
	}
}

export default Item