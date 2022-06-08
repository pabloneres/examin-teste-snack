import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

import config from "./../../assets/fonts/icons/selection";

import {
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	COLOR_THIRD,
	FONTS,
} from "./../../config/styles";

const Icon         = createIconSetFromIcoMoon(config);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class UIIcon extends Component {
	static propTypes = {
		name     : PropTypes.string.isRequired,
		size     : PropTypes.number,
		color    : PropTypes.string,
		onPress  : PropTypes.func,
		primary  : PropTypes.bool,
		secondary: PropTypes.bool,
		third    : PropTypes.bool,
	};

	static defaultProps = {
		size     : FONTS.sizeIcon,
		color    : FONTS.color,
		primary  : false,
		secondary: false,
		third    : false,
	};

	render() {
		const {primary, secondary, third, ...rest} = this.props;

		if( primary )
		{
			rest.color = COLOR_PRIMARY;
		}
		else if( secondary )
		{
			rest.color = COLOR_SECONDARY;
		}
		else if( third )
		{
			rest.color = COLOR_THIRD;
		}

		return (
			<AnimatedIcon {...rest} />
		);
	}
}

export default UIIcon;
