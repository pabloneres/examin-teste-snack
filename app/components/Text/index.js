import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import {
	COLOR_PRIMARY,
	COLOR_SECONDARY,
	COLOR_THIRD,
	FONTS,
} from "./../../config/styles";

class UIText extends Component {
	static propTypes = {
		...Text.propTypes,
		weight    : PropTypes.oneOf(["regular", "medium", "bold"]),
		lineHeight: PropTypes.number,
		size      : PropTypes.number,
		color     : PropTypes.string,
		textAlign : PropTypes.oneOf(["left", "right", "center", "justify"]),
		alt       : PropTypes.bool,
		primary   : PropTypes.bool,
		secondary : PropTypes.bool,
		third     : PropTypes.bool,
	};

	static defaultProps = {
		weight   : "regular",
		size     : FONTS.sizeBase,
		color    : FONTS.color,
		textAlign: "left",
		alt      : false,
		primary  : false,
		secondary: false,
		third    : false,
	};

	render() {
		const {weight, size, color, textAlign, lineHeight, style, alt, primary, secondary, third, ...rest} = this.props;

		const styleNew = {
			fontFamily: FONTS.fontFamily,
			fontSize  : size,
			lineHeight: (lineHeight || size) + FONTS.lineHeightPlus,
			color     : color,
			textAlign : textAlign,
		};

		if( alt )
		{
			styleNew.color = FONTS.colorAlt;
		}
		else if( primary )
		{
			styleNew.color = COLOR_PRIMARY;
		}
		else if( secondary )
		{
			styleNew.color = COLOR_SECONDARY;
		}
		else if( third )
		{
			styleNew.color = COLOR_THIRD;
		}

		if( weight === "medium" )
		{
			styleNew.fontFamily = FONTS.fontFamilyMedium;
		}
		else if( weight === "bold" )
		{
			styleNew.fontFamily = FONTS.fontFamilyBold;
		}

		if( style )
		{
			if( style instanceof Array )
			{
				let fontSize      = null;
				let lineHeightNew = null;

				style.forEach(s => {
					if( s.hasOwnProperty("fontSize") )
					{
						fontSize = s.fontSize;
					}

					if( s.hasOwnProperty("lineHeight") )
					{
						lineHeightNew = s.lineHeight;
					}
				});

				if( fontSize !== null && lineHeightNew === null && !lineHeight )
				{
					styleNew.lineHeight = fontSize + FONTS.lineHeightPlus;
				}
			}
			else if( style.hasOwnProperty("fontSize") && !style.hasOwnProperty("lineHeight") && !lineHeight )
			{
				styleNew.lineHeight = style.fontSize + FONTS.lineHeightPlus;
			}
		}

		return <Text
			{...rest}
			style={[styleNew, style]}
		/>;
	}
}

export default UIText;
