import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

import UIText from "./../Text";

class UIReadMore extends Component {
	static propTypes = {
		renderViewMore: PropTypes.func,
		renderViewLess: PropTypes.func,
		afterCollapse : PropTypes.func,
		afterExpand   : PropTypes.func,
		numberOfLines : PropTypes.number.isRequired,
		textStyle     : PropTypes.any,
		viewMoreColor : PropTypes.any,
	};

	static defaultProps = {
		afterCollapse: () => {
		},
		afterExpand  : () => {
		},
		textStyle    : {},
	};

	constructor(props) {
		super(props);

		this.state = {
			isFulltextShown: true,
			numberOfLines  : this.props.numberOfLines,
		};

		this.trimmedTextHeight = null;
		this.fullTextHeight    = null;
		this.shouldShowMore    = false;
	}

	hideFullText = () => {
		if( this.state.isFulltextShown && this.trimmedTextHeight && this.fullTextHeight )
		{
			this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;

			this.setState({
				isFulltextShown: false,
			});
		}
	};

	onLayoutTrimmedText = (event) => {
		const {height} = event.nativeEvent.layout;

		this.trimmedTextHeight = height;
		this.hideFullText();
	};

	onLayoutFullText = (event) => {
		const {height} = event.nativeEvent.layout;

		this.fullTextHeight = height;
		this.hideFullText();
	};

	onPressMore = () => {
		this.setState({
			numberOfLines: null,
		}, () => {
			this.props.afterExpand();
		});
	};

	onPressLess = () => {
		this.setState({
			numberOfLines: this.props.numberOfLines,
		}, () => {
			this.props.afterCollapse();
		});
	};

	renderViewMore = () => (
		<TouchableOpacity
			activeOpacity={0.6}
			onPress={this.onPressMore}
			style={styles.viewMoreBtn}>
			<UIText style={[styles.viewMoreText, this.props.viewMoreColor ? {color: this.props.viewMoreColor} : {}]}>Mostrar mais</UIText>
		</TouchableOpacity>
	);

	renderViewLess = () => (
		<TouchableOpacity
			activeOpacity={0.6}
			onPress={this.onPressLess}
			style={styles.viewMoreBtn}>
			<UIText style={[styles.viewMoreText, this.props.viewMoreColor ? {color: this.props.viewMoreColor} : {}]}>Mostrar menos</UIText>
		</TouchableOpacity>
	);

	renderFooter = () => {
		if( this.shouldShowMore !== true ) return null;

		const {numberOfLines} = this.state;

		if( numberOfLines > 0 )
		{
			return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
		}

		return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
	};

	renderFullText = () => {
		if( !this.state.isFulltextShown ) return null;

		return (
			<View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
				<UIText style={this.props.textStyle}>
					{this.props.children}
				</UIText>
			</View>
		);
	};

	render() {
		return (
			<View style={this.state.isFulltextShown ? styles.transparent : {}}>
				<View onLayout={this.onLayoutTrimmedText}>
					<UIText style={this.props.textStyle} numberOfLines={this.state.numberOfLines}>
						{this.props.children}
					</UIText>
					{this.renderFooter()}
				</View>
				{this.renderFullText()}
			</View>
		);
	}
}

export default UIReadMore;
