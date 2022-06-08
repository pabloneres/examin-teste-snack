import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	Text,
	View,
} from "react-native";

import styles from "./styles";

class UIBadge extends Component {
	static propTypes = {
		text     : PropTypes.any,
		styleText: PropTypes.any,
		viewProps: PropTypes.any,
	};

	static defaultProps = {
		text: "",
	};

	render() {
		return (
			<View {...this.props.viewProps} style={[styles.container, this.props.style]}>
				<Text style={[styles.text, this.props.styleText]}>
					{this.props.text}
				</Text>
			</View>
		);
	}
}

export default UIBadge;
