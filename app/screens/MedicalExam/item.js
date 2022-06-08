import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native"

import styles from './styles'
import { UIIcon, UIText, UIView } from "~/components";
import { FONTS } from "~/config/styles";

import ArrowRightLight from '~/assets/svg/arrow-right-light.svg'
import PropTypes from "prop-types";

class Item extends Component {
	static propTypes = {
		title   : PropTypes.string.isRequired,
		subTitle: PropTypes.string.isRequired,
		onPress : PropTypes.func
	}

	render() {
		const {title, subTitle, onPress} = this.props
		return (
			<TouchableOpacity
				onPress={onPress}
				activeOpacity={.6}
				style={styles.vaccineContainer}
			>
				<UIView>
					<UIText size={FONTS.sizeLarge}>{title}</UIText>
					<UIText color="#989292" size={FONTS.sizeMiddle}>{subTitle}</UIText>
				</UIView>
				<ArrowRightLight />
			</TouchableOpacity>
		)
	}
}

export default Item