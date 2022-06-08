import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	ImageBackground,
	Text,
	View,
	ViewPropTypes,
	TouchableOpacity
} from "react-native";

import {
	COLOR_PRIMARY,
	CONTENT, FONTS,
	HEADER,
} from "./../../config/styles";

import { STATUS_BAR_HEIGHT } from "./../../config/general";

import {
	themes,
	styles,
} from "./styles";

import UIButton from "./../Button";
import UIText from "../Text";

class UIHeader extends Component {
	static propTypes = {
		theme                 : PropTypes.oneOf(["default", "primary", "image"]),
		navigation            : PropTypes.any,
		shadow                : PropTypes.bool,
		scrollMarginHorizontal: PropTypes.bool,
		enableStatusBar       : PropTypes.bool,
		statusBarColor        : PropTypes.any,
		styleWrap             : ViewPropTypes.style,
		styleContainer        : ViewPropTypes.style,
		styleTitle            : PropTypes.any,
		styleSubTitle         : PropTypes.any,
		tabs                  : PropTypes.array,
		onChangeTab           : PropTypes.func,
		left                  : PropTypes.oneOfType([
			PropTypes.oneOf(["backButton", "backButtonX", "empty"]),
			PropTypes.func,
			PropTypes.bool,
			PropTypes.element,
			PropTypes.shape({
				icon           : PropTypes.string.isRequired,
				styleButtonWrap: ViewPropTypes.style,
				styleButton    : ViewPropTypes.style,
				styleIcon      : PropTypes.any,
				onPress        : PropTypes.func
			}),
		]),
		center                : PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.bool,
			PropTypes.element,
			PropTypes.shape({
				title   : PropTypes.string,
				subTitle: PropTypes.string,
			}),
		]),
		right                 : PropTypes.oneOfType([
			PropTypes.oneOf(["backButton", "backButtonX", "empty"]),
			PropTypes.func,
			PropTypes.bool,
			PropTypes.element,
			PropTypes.shape({
				icon           : PropTypes.string.isRequired,
				styleButtonWrap: ViewPropTypes.style,
				styleButton    : ViewPropTypes.style,
				styleIcon      : PropTypes.any,
				onPress        : PropTypes.func
			}),
		]),
	};

	static defaultProps = {
		theme                 : "default",
		scrollMarginHorizontal: false,
		enableStatusBar       : false,
		left                  : false,
		center                : false,
		right                 : false,
		shadow                : false,
	};

	constructor(props) {
		super(props);

		this.state = {
			activeTab: null
		}
	}

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	/**
	 * Back button action
	 *
	 * @returns {boolean}
	 */
	actionBackButton = () => {
		this.props.navigation.goBack();
	};

	renderTitleAndSubTitle() {
		let styleTitle    = this.getThemeConfig("styleTitle");
		let styleSubTitle = this.getThemeConfig("styleSubTitle");

		return (
			<View>
				{!!this.props.center.title &&
					<Text numberOfLines={1} style={[styles.titleText, styleTitle, this.props.styleTitle]}>
						{this.props.center.title}
					</Text>
				}
				{!!this.props.center.subTitle &&
					<Text numberOfLines={1} style={[styles.subTitleText, styleSubTitle, this.props.styleSubTitle]}>
						{this.props.center.subTitle}
					</Text>
				}
			</View>
		)
	}

	renderButton(item, position) {
		let styleButtonWrap        = this.getThemeConfig("styleButtonWrap");
		let styleButton            = this.getThemeConfig("styleButton");
		let styleButtonIcon        = this.getThemeConfig("styleButtonIcon");
		let styleAndroidPressColor = this.getThemeConfig("androidPressColor");

		return (
			<UIButton
				type="icon"
				theme="transparent"
				iconName={item.icon}
				style={[styles.buttonWrap, styleButtonWrap, item.styleButtonWrap]}
				styleButton={[styles.button, styleButton, item.styleButton]}
				styleIcon={[styles.buttonIcon, styleButtonIcon, item.styleIcon]}
				onPress={item.onPress}
				borderless={true}
				pressColor={styleAndroidPressColor}
			/>
		)
	}

	renderString(item, position) {
		let styleButtonWrap        = this.getThemeConfig("styleButtonWrap");
		let styleButton            = this.getThemeConfig("styleButton");
		let styleButtonIcon        = this.getThemeConfig("styleButtonIcon");
		let styleAndroidPressColor = this.getThemeConfig("androidPressColor");

		if( item === "backButton" || item === "backButtonX" )
		{
			return (
				<UIButton
					type="icon"
					theme="transparent"
					iconName={item === "backButtonX" ? "x" : "back"}
					style={[styles.buttonWrap, styleButtonWrap]}
					styleButton={[styles.button, styleButton]}
					styleIcon={[styles.buttonIcon, styleButtonIcon]}
					onPress={this.actionBackButton}
					borderless={true}
					pressColor={styleAndroidPressColor}
				/>
			)
		}
		else if( item === "empty" )
		{
			return (
				<View style={{width: HEADER.iconWidth}} />
			)
		}

		return null;
	}

	render() {
		let styleContainer = [this.getThemeConfig("styleContainer")];
		const themeImage   = this.props.theme === "image";

		if( this.props.shadow && !themeImage )
		{
			styleContainer.push(this.getThemeConfig("styleContainerShadow"));
		}

		let styleWrapMargin = {};

		if( this.props.scrollMarginHorizontal )
		{
			styleWrapMargin = {marginHorizontal: -CONTENT.paddingHorizontal};
		}

		// Use children if there is
		if( React.Children.count(this.props.children) )
		{
			return (
				<View style={[styles.containerWrap, this.props.styleWrap, styleWrapMargin]}>
					{this.props.enableStatusBar && <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: this.props.statusBarColor ? this.props.statusBarColor : this.getThemeConfig("statusBarBackground")}} />}
					<View style={[styles.container, styleContainer, this.props.styleContainer]}>
						{this.props.children}
					</View>
				</View>
			)
		}

		let leftElements   = null;
		let centerElements = null;
		let rightElements  = null;

		if( this.props.left !== false && this.props.left !== null )
		{
			if( React.isValidElement(this.props.left) )
			{
				leftElements = this.props.left;
			}
			else if( typeof this.props.left === "object" )
			{
				leftElements = this.renderButton(this.props.left, "left");
			}
			else if( typeof this.props.left === "function" )
			{
				leftElements = this.props.left();
			}
			else if( typeof this.props.left === "string" )
			{
				leftElements = this.renderString(this.props.left, "left");
			}
		}

		if( this.props.right !== false && this.props.right !== null )
		{
			if( React.isValidElement(this.props.right) )
			{
				rightElements = this.props.right;
			}
			else if( typeof this.props.right === "object" )
			{
				rightElements = this.renderButton(this.props.right, "right");
			}
			else if( typeof this.props.right === "function" )
			{
				rightElements = this.props.right();
			}
			else if( typeof this.props.right === "string" )
			{
				rightElements = this.renderString(this.props.right, "right");
			}
		}

		if( this.props.center !== false && this.props.center !== null )
		{
			if( React.isValidElement(this.props.center) )
			{
				centerElements = this.props.center;
			}
			else if( typeof this.props.center === "object" )
			{
				centerElements = this.renderTitleAndSubTitle();
			}
			else if( typeof this.props.center === "function" )
			{
				centerElements = this.props.center();
			}
			else if( typeof this.props.center === "string" )
			{
				centerElements = this.renderString(this.props.center, "center");
			}
		}

		if( themeImage )
		{
			return (
				<ImageBackground
					source={require("../../assets/img/header.png")}
					resizeMode="cover"
					style={[styles.containerWrap, this.props.styleWrap, styleWrapMargin, this.getThemeConfig("styleContainerWrap"), this.props.shadow ? this.getThemeConfig("styleContainerShadow") : {}]}>
					{this.props.enableStatusBar && <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: this.props.statusBarColor ? this.props.statusBarColor : this.getThemeConfig("statusBarBackground")}} />}
					<View style={[styles.container, styleContainer, this.props.styleContainer]}>
						{leftElements && <View style={styles.leftContainer}>
							{leftElements}
						</View>}
						{centerElements && <View style={styles.centerContainer}>
							{centerElements}
						</View>}
						{rightElements && <View style={styles.rightContainer}>
							{rightElements}
						</View>}
					</View>
				</ImageBackground>
			);
		}

		return (
			<View style={[styles.containerWrap, this.props.styleWrap, styleWrapMargin]}>
				{this.props.enableStatusBar && <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: this.props.statusBarColor ? this.props.statusBarColor : this.getThemeConfig("statusBarBackground")}} />}
				<View style={[styles.container, styleContainer, this.props.styleContainer, this.props.tabs ? {} : styles.borderStyles]}>
					{leftElements && <View style={styles.leftContainer}>
						{leftElements}
					</View>}
					{centerElements && <View style={styles.centerContainer}>
						{centerElements}
					</View>}
					{rightElements && <View style={styles.rightContainer}>
						{rightElements}
					</View>}
				</View>
				{
					this.props.tabs && (
						<View style={[styles.tabsContainer, styles.borderStyles]}>
							{this.props.tabs.map((item, index) => (
								<TouchableOpacity
									key={index}
									activeOpacity={.5}
									style={styles.tab}
									onPress={() => this.props.onChangeTab(item.key)}
								>
									<View style={styles.textTabContainer}>
										<UIText size={FONTS.sizeMiddle} weight="bold">{item.title}</UIText>
									</View>
									{this.props.activeTab === item.key && <View style={styles.activeTabBorder} />}
								</TouchableOpacity>
							))}
						</View>
					)
				}
			</View>
		);
	}
}

export default UIHeader;
