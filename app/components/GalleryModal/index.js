import React, { Component } from "react";
import PropTypes from "prop-types";
import Gallery from "react-native-image-gallery";
import { StatusBar } from "expo-status-bar";
import {
	Dimensions,
	Modal,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { STATUS_BAR_DARK, HEADER } from "./../../config/styles";

import styles from "./styles";

import UIIcon from "./../Icon"

class UIGalleryModal extends Component {
	static propTypes = {
		visible     : PropTypes.bool.isRequired,
		initialIndex: PropTypes.number,
		onClose     : PropTypes.func,
		images      : PropTypes.arrayOf(
			PropTypes.shape({
				caption   : PropTypes.string,
				source    : PropTypes.shape({
					uri: PropTypes.string.isRequired,
				}),
				dimensions: PropTypes.shape({
					width : PropTypes.number,
					height: PropTypes.number,
				}),
			}),
		).isRequired,
	};

	static defaultProps = {
		visible     : false,
		initialIndex: 0,
	};

	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			index  : this.props.initialIndex,
			images : this.props.images
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const newState = {};

		if( prevProps.images !== this.props.images )
		{
			newState.images = this.props.images;
		}

		if( Object.keys(newState).length )
		{
			this.setState(newState);
		}
	}

	open = (index = 0) => {
		this.setState({
			visible: true,
			index  : index,
		});
	}

	close = () => {
		this.setState({
			visible: false,
		}, () => {
			if( this.props.onClose )
			{
				this.props.onClose();
			}
		});
	}

	onChangeImage = (index) => {
		this.setState({
			index: index
		});
	}

	_renderError = () => {
		return (
			<View style={styles.error}>
				<Text style={styles.errorText}>A imagem não pode ser exibida...</Text>
			</View>
		)
	};

	_renderCaption = () => {
		const {images, index} = this.state;

		if( images[index] && images[index].caption )
		{
			return (
				<View style={styles.footer}>
					<Text style={styles.footerText}>{images[index].caption}</Text>
				</View>
			)
		}
	};

	_renderGalleryCount = () => {
		const {index, images} = this.state;

		return (
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.btnClose}
					onPress={this.close}>
					<UIIcon name="x" size={HEADER.iconSize} color="#fff" />
				</TouchableOpacity>
				{images.length > 1 && <Text style={styles.count}>{index + 1} de {images.length}</Text>}
			</View>
		)
	};

	render() {
		const {images, index} = this.state;

		return (
			<Modal
				animationType="fade"
				visible={this.state.visible}
				transparent={true}
				onRequestClose={this.close}>
				<StatusBar {...STATUS_BAR_DARK} />
				<SafeAreaView style={{flex: 1, backgroundColor: STATUS_BAR_DARK.backgroundColor}} forceInset={{bottom: "never"}}>
					<View style={{flex: 1, position: "relative"}}>
						<Gallery
							style={styles.gallery}
							images={images}
							initialPage={index}
							errorComponent={this._renderError}
							onPageSelected={(index) => this.onChangeImage(index)}
							flatListProps={{
								initialNumToRender: index + 3,
								initialScrollIndex: index,
								getItemLayout     : (data, index) => ({length: Dimensions.get("screen").width, offset: Dimensions.get("screen").width * index, index})
							}}
						/>
						{this._renderGalleryCount()}
						{this._renderCaption()}
					</View>
				</SafeAreaView>
			</Modal>
		)
	}
}

export default UIGalleryModal;
