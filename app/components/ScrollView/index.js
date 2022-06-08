import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	ScrollView,
	View,
} from "react-native";

import {
	themes,
	styles,
} from "./styles";

class UIScrollView extends Component {
	static propTypes = {
		theme: PropTypes.oneOf(["default", "round"])
	};

	static defaultProps = {
		theme: "default"
	};

	scrollX = (x) => {
		this.scrollview.scrollTo({x, y: 0, animated: true});
	};

	scrollY = (y) => {
		this.scrollview.scrollTo({x: 0, y, animated: true});
	};

	scrollToTop = () => {
		if( this.props.horizontal )
		{
			this.scrollX(0);
		}
		else
		{
			this.scrollY(0);
		}
	};

	scrollToEnd = () => {
		this.scrollview.scrollToEnd();
	};

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	render() {
		const {style, theme, ...rest} = this.props;

		let styleWrap          = this.getThemeConfig("styleWrap");
		let styleScrollContent = this.getThemeConfig("styleScrollContent");

		return <View style={styleWrap}>
			<ScrollView
				{...rest}
				ref={el => this.scrollview = el}
				contentContainerStyle={[styles.scrollContentStyle, styleScrollContent, style]}
			/>
		</View>;
	}
}

export default UIScrollView;
