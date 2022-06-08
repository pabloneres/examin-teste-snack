import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";

import {
	BORDER_RADIUS,
} from "./../../config/styles";

class UIView extends Component {
	static propTypes = {
		...ViewPropTypes,
		row       : PropTypes.bool,
		wrap      : PropTypes.bool,
		direction : PropTypes.oneOf(["ltr", "rtl"]),
		flex      : PropTypes.number,
		flexBasis : PropTypes.any,
		flexGrow  : PropTypes.number,
		flexShrink: PropTypes.number,
		alignSelf : PropTypes.oneOf(["stretch", "flex-start", "flex-end", "center", "space-between", "space-around"]),
		align     : PropTypes.oneOf(["stretch", "flex-start", "flex-end", "center", "baseline"]),
		justify   : PropTypes.oneOf(["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]),
		width     : PropTypes.any,
		height    : PropTypes.any,
		radius    : PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
		overflow  : PropTypes.oneOf(["visible", "hidden", "scroll"]),
		p         : PropTypes.number,
		pt        : PropTypes.number,
		pb        : PropTypes.number,
		pl        : PropTypes.number,
		pr        : PropTypes.number,
		m         : PropTypes.number,
		mt        : PropTypes.number,
		mb        : PropTypes.number,
		ml        : PropTypes.number,
		mr        : PropTypes.number,
		bg        : PropTypes.string,
	};

	static defaultProps = {
		row      : false,
		wrap     : false,
		direction: "ltr",
		align    : "stretch",
		justify  : "flex-start",
		radius   : false,
		overflow : "visible",
	};

	render() {
		const {row, wrap, direction, flex, flexBasis, flexGrow, flexShrink, alignSelf, align, justify, width, height, radius, overflow, p, pt, pb, pl, pr, m, mt, mb, ml, mr, bg, style, ...rest} = this.props;

		const styleNew = {
			flexDirection : row ? "row" : "column",
			flexWrap      : wrap ? "wrap" : "nowrap",
			direction,
			alignItems    : align,
			justifyContent: justify,
			overflow,
		};

		if( typeof flex === 'number' )
		{
			styleNew.flex = flex;
		}

		if( flexBasis !== undefined )
		{
			styleNew.flexBasis = flexBasis;
		}

		if( flexGrow !== undefined )
		{
			styleNew.flexGrow = flexGrow;
		}

		if( flexShrink !== undefined )
		{
			styleNew.flexShrink = flexShrink;
		}

		if( alignSelf !== undefined )
		{
			styleNew.alignSelf = alignSelf;
		}

		if( width !== undefined )
		{
			styleNew.width = width;
		}

		if( height !== undefined )
		{
			styleNew.height = height;
		}

		if( radius )
		{
			styleNew.borderRadius = radius === true ? BORDER_RADIUS : radius;
		}

		if( typeof p === 'number' )
		{
			styleNew.padding = p;
		}

		if( typeof pt === 'number' )
		{
			styleNew.paddingTop = pt;
		}

		if( typeof pb === 'number' )
		{
			styleNew.paddingBottom = pb;
		}

		if( typeof pl === 'number' )
		{
			styleNew.paddingLeft = pl;
		}

		if( typeof pr === 'number' )
		{
			styleNew.paddingRight = pr;
		}

		if( typeof m === 'number' )
		{
			styleNew.margin = m;
		}

		if( typeof mt === 'number' )
		{
			styleNew.marginTop = mt;
		}

		if( typeof mb === 'number' )
		{
			styleNew.marginBottom = mb;
		}

		if( typeof ml === 'number' )
		{
			styleNew.marginLeft = ml;
		}

		if( typeof mr === 'number' )
		{
			styleNew.marginRight = mr;
		}

		if( bg !== undefined )
		{
			styleNew.backgroundColor = bg;
		}

		return <View
			{...rest}
			style={[styleNew, style]}
		/>;
	}
}

export default UIView;
