import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
	ActivityIndicator,
} from "react-native";

import {
	COLOR_PRIMARY,
} from "./../../config/styles";

const themes = {
	default: {
		color: COLOR_PRIMARY,
	},
	white  : {
		color: "#fff",
	},
};

class UILoading extends PureComponent {
	static propTypes = {
		size : PropTypes.oneOf(["small", "large"]),
		theme: PropTypes.oneOf(["default", "white"]),
		color: PropTypes.any,
	};

	static defaultProps = {
		theme: "default",
		size : "large",
		color: null,
	};

	render() {
		const {theme, color, ...rest} = this.props;

		return (
			<ActivityIndicator color={color ? color : themes[theme].color} {...rest} />
		);
	}
}

export default UILoading;
