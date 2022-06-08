import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	View,
} from "react-native";

import UIText from "./../../components/Text";

import { TEXTS } from "./../../config/general";

import styles from "./styles";

class UIListEmpty extends Component {
	static propTypes = {
		text     : PropTypes.string,
		style    : PropTypes.any,
		textProps: PropTypes.any,
	};

	static defaultProps = {
		text     : TEXTS.listEmpty,
		style    : {},
		textProps: {},
	};

	render() {
		const {text, style, textProps} = this.props;

		return (
			<View style={[styles.container, style]}>
				<UIText weight="medium" color="#787f83" textAlign="center" {...textProps}>
					{text}
				</UIText>
			</View>
		);
	}
}

export default UIListEmpty;
