import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
	TouchableOpacity,
} from "react-native";

import { COLOR_PRIMARY } from "./../../config/styles";

import styles from "./styles";

import UIIcon from "./../Icon";
import UIText from "./../Text";

class Item extends PureComponent {
	static propTypes = {
		item       : PropTypes.object.isRequired,
		onPressItem: PropTypes.func.isRequired,
	};

	_onPress = () => {
		this.props.onPressItem(this.props.item);
	};

	render() {
		const {item} = this.props;

		return (
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={this._onPress}
				style={styles.item}>
				<UIText weight="medium" size={16} color="#3d3d3d" style={{flex: 1}}>{item.full_name}</UIText>
			</TouchableOpacity>
		);
	}
}

export default Item;
