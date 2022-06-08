import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import {
	Text,
	View,
	ScrollView,
	ViewPropTypes,
} from "react-native";

import { MODAL } from "./../../config/styles";

import {
	styles,
	themes,
} from "./styles";

class UIDialog extends Component {
	static propTypes = {
		visible       : PropTypes.bool,
		onTouchOutside: PropTypes.func,
		dialogStyle   : ViewPropTypes.style,
		contentStyle  : ViewPropTypes.style,
		buttonsStyle  : ViewPropTypes.style,
		buttons       : PropTypes.any,
		messageSuccess: PropTypes.string,
		title         : PropTypes.string,
		titleStyle    : Text.propTypes.style,
		alignBottom   : PropTypes.bool,
		theme         : PropTypes.oneOf(["default"]),
		scrollProps   : PropTypes.any,
	};

	static defaultProps = {
		theme      : "default",
		visible    : false,
		alignBottom: false,
		scrollProps: {},
	};

	getThemeConfig = (attr) => (
		themes[this.props.theme][attr]
	);

	render() {
		const {visible, onTouchOutside, dialogStyle, buttons, buttonsStyle, contentStyle, children, messageSuccess, title, titleStyle, alignBottom, scrollProps, ...rest} = this.props;
		const themeTitleStyle = this.getThemeConfig("titleStyle");

		const messageSuccessRender = messageSuccess ? (
			<Text style={[styles.Success]}>
				{messageSuccess}
			</Text>
		) : null;

		const titleRender = title ? (
			<Text style={[themeTitleStyle, styles.title, titleStyle]}>
				{title}
			</Text>
		) : null;

		
		const contentRender = (
			<ScrollView
				showsVerticalScrollIndicator
				contentContainerStyle={[alignBottom ? styles.contentBottom : styles.content, contentStyle]}
				{...scrollProps}>
				{children}
			</ScrollView>
		);

		const buttonRender = buttons ? (
			<View style={buttonsStyle}>
				{buttons}
			</View>
		) : null;

		return (
			<Modal
				isVisible={visible}
				hasBackdrop={true}
				backdropColor={MODAL.overlayRGBA}
				backdropOpacity={1}
				onBackButtonPress={onTouchOutside}
				onBackdropPress={onTouchOutside}
				style={alignBottom ? styles.modalBottom : styles.modal}
				propagateSwipe
				backdropTransitionOutTiming={0}
				{...rest}>
				<View style={[alignBottom ? styles.dialogBottom : styles.dialog, dialogStyle]}>
					{messageSuccessRender}
					{titleRender}
					{contentRender}
					{buttonRender}
				</View>
			</Modal>
		)
	}
}

export default UIDialog;
