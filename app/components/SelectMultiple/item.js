import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import {
	Text,
	TouchableOpacity,
} from "react-native";

import {
	styles,
	themes,
} from "./styles";

import UIIcon from "./../Icon";

class Item extends PureComponent {
	static propTypes = {
		theme         : PropTypes.any,
		title         : PropTypes.string,
		active        : PropTypes.bool,
		onPress       : PropTypes.func,
		showCheckIcon : PropTypes.bool,
		iconPosition  : PropTypes.oneOf(["left", "right"]),
		itemStyle     : PropTypes.any,
		itemLabelStyle: PropTypes.any,
	};

	static defaultProps = {
		title : "",
		active: false,
	};

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	render() {
		let themeItemStyle           = this.getThemeConfig("itemStyle");
		let themeItemTextStyle       = this.getThemeConfig("itemTextStyle");
		let themeItemTitleStyle      = this.getThemeConfig("itemTitleStyle");
		let themeItemIconStyle       = this.getThemeConfig("itemIconStyle");
		let themeItemActiveStyle     = this.getThemeConfig("itemActiveStyle");
		let themeItemActiveTextStyle = this.getThemeConfig("itemActiveTextStyle");
		let themeItemActiveIconStyle = this.getThemeConfig("itemActiveIconStyle");

		let itemStyle = [styles.item];
		itemStyle.push(themeItemStyle);

		let titleStyle = [styles.itemTitle];
		titleStyle.push(themeItemTitleStyle);

		let textStyle = [styles.itemText];
		textStyle.push(themeItemTextStyle);

		let iconStyle = [this.props.iconPosition === 'left' ? styles.itemIcon : styles.itemIconRight];
		iconStyle.push(themeItemIconStyle);

		let iconName = "checkbox";

		if( this.props.active )
		{
			itemStyle.push(styles.itemActive);
			itemStyle.push(themeItemActiveStyle);

			textStyle.push(styles.itemActiveText);
			textStyle.push(themeItemActiveTextStyle);

			iconStyle.push(styles.itemActiveIcon);
			iconStyle.push(themeItemActiveIconStyle);

			iconName = "checkbox-fill";
		}

		if( this.props.showCheckIcon )
		{
			itemStyle.push({paddingLeft: 0});
		}

		if( this.props.itemStyle )
		{
			itemStyle.push(this.props.itemStyle);
		}

		if( this.props.itemLabelStyle )
		{
			textStyle.push(this.props.itemLabelStyle);
		}

		return (
			<Fragment>
				{!!this.props.title && <Text style={titleStyle}>{this.props.title}</Text>}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={this.props.onPress}
					style={itemStyle}>
					{(this.props.showCheckIcon && this.props.iconPosition === 'left') && <UIIcon style={iconStyle} name={iconName} size={20} />}
					<Text style={textStyle}>
						{this.props.label}
					</Text>
					{(this.props.showCheckIcon && this.props.iconPosition === 'right') && <UIIcon style={iconStyle} name={iconName} size={20} />}
				</TouchableOpacity>
			</Fragment>
		);
	}
}

export default Item;
