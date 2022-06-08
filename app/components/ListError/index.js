import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	View,
} from "react-native";

import UIButton from "./../../components/Button";
import UIText from "./../../components/Text";

import { TEXTS } from "./../../config/general";

import styles from "./styles";

class UIListError extends Component {
	static propTypes = {
		onPressButton: PropTypes.func.isRequired,
		text         : PropTypes.string,
		textButton   : PropTypes.string,
		style        : PropTypes.any,
		textProps    : PropTypes.any,
		buttonProps  : PropTypes.any,
	};

	static defaultProps = {
		text       : TEXTS.listError,
		textButton : TEXTS.listErrorButton,
		style      : {},
		textProps  : {},
		buttonProps: {},
	};

	render() {
		const {onPressButton, text, textButton, style, textProps, buttonProps} = this.props;

		return (
			<View style={[styles.container, style]}>
				<UIText weight="medium" color="#787f83" textAlign="center" style={{marginBottom: 20}} {...textProps}>
					{text}
				</UIText>
				<UIButton
					type="small"
					title={textButton}
					onPress={onPressButton}
					uppercase={false}
					{...buttonProps}
				/>
			</View>
		);
	}
}

export default UIListError;
