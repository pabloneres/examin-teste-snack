import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	Animated,
	TouchableOpacity,
} from "react-native";

import {
	themes,
	styles,
} from "./styles";

class UISwitch extends Component {
	static propTypes = {
		theme   : PropTypes.oneOf(["default", "secondary"]),
		checked : PropTypes.bool.isRequired,
		onChange: PropTypes.func.isRequired,
		editable: PropTypes.bool,
	};

	static defaultProps = {
		theme   : "default",
		editable: true,
	};

	constructor(props) {
		super(props);

		this.state = {
			anim: new Animated.Value(0),
		};
	}

	componentDidMount() {
		if( this.props.checked )
		{
			this.setState({
				anim: new Animated.Value(1),
			});
		}
		else
		{
			this.setState({
				anim: new Animated.Value(0),
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if( prevProps.checked !== this.props.checked )
		{
			if( this.props.checked )
			{
				this.check();
			}
			else
			{
				this.uncheck();
			}
		}
	}

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	onChange = () => {
		this.props.onChange(!this.props.checked);
	};

	check = () => {
		Animated.timing(this.state.anim, {
			toValue        : 1,
			duration       : 150,
			useNativeDriver: false,
		}).start();
	};

	uncheck = () => {
		Animated.timing(this.state.anim, {
			toValue        : 0,
			duration       : 150,
			useNativeDriver: false,
		}).start();
	};

	render() {
		let wrapColor         = this.getThemeConfig("wrapColor");
		let buttonColor       = this.getThemeConfig("buttonColor");
		let activeWrapColor   = this.getThemeConfig("activeWrapColor");
		let activeButtonColor = this.getThemeConfig("activeButtonColor");
		let buttonX           = this.getThemeConfig("buttonX");
		let buttonXActive     = this.getThemeConfig("buttonXActive");
		let containerStyle    = this.getThemeConfig("containerStyle");
		let buttonStyle       = this.getThemeConfig("buttonStyle");

		return (
			<TouchableOpacity
				activeOpacity={this.props.editable ? 0.8 : 1}
				onPress={this.props.editable ? this.onChange : null}>
				<Animated.View style={[
					styles.container,
					containerStyle,
					{
						backgroundColor: this.state.anim.interpolate({inputRange: [0, 1], outputRange: [wrapColor, activeWrapColor]}),
					}]}>
					<Animated.View style={[
						styles.button,
						buttonStyle,
						{
							backgroundColor: this.state.anim.interpolate({inputRange: [0, 1], outputRange: [buttonColor, activeButtonColor]}),
							transform      : [{
								translateX: this.state.anim.interpolate({
									inputRange : [0, 1],
									outputRange: [buttonX, buttonXActive]
								}),
							}],
						}]}
					/>
				</Animated.View>
			</TouchableOpacity>
		);
	}
}

export default UISwitch;
