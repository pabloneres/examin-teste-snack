import React, { Component } from "react"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import {
	Image,
	View,
} from "react-native"

import { COLOR_PRIMARY, MODAL } from "./../../config/styles";

import styles from "./styles";

import UIButton from "./../Button";
import UIScrollView from "./../ScrollView";
import UIText from "./../Text";

class UIOrderSummary extends Component {
	static propTypes = {
		products: PropTypes.array,
	};

	constructor(props) {
		super(props);

		this.state = {
			visible: false,
		}
	}

	open = () => {
		this.setState({
			visible: true,
		});
	};

	close = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		const {visible} = this.state;

		return (
			<Modal
				isVisible={visible}
				hasBackdrop={true}
				backdropColor={MODAL.overlayRGBA}
				backdropOpacity={1}
				onBackButtonPress={this.close}
				onBackdropPress={this.close}
				backdropTransitionOutTiming={0}
				style={styles.summaryModal}>
				<View style={styles.summaryModalInner}>
					<UIScrollView theme="round" style={{paddingTop: 50}}>
						{visible && (
							(this.props.cart?.cart?.products ?? []).map((item, i) => {
								const imageSource = item.file ? {uri: item.file_sizes.site_small} : require("./../../assets/img/no-image.png");

								return (
									<View key={i} style={[styles.summaryItem, i > 0 ? {borderTopWidth: 1} : {}]}>
										<View style={styles.summaryItemImage}>
											<Image style={{width: 70, height: 70}} source={imageSource} resizeMode="contain" />
										</View>
										<View style={styles.summaryItemContent}>
											<UIText lineHeight={10} style={{paddingRight: 30, minHeight: 40}}>{item.name}</UIText>
											<View style={styles.summaryItemContentFooter}>
												<UIText weight="bold" color={COLOR_PRIMARY}>{item.price}</UIText>
												<UIText weight="bold" size={17} color="#252525">{`x ${item.quantity}`}</UIText>
											</View>
										</View>
									</View>
								)
							})
						)}
					</UIScrollView>
					{visible && <UIButton
						type="icon"
						theme="white"
						iconName="x"
						borderRadius="round"
						onPress={this.close}
						style={styles.summaryModalBtnClose}
					/>}
				</View>
			</Modal>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		cart: state.cart,
	};
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(UIOrderSummary);
