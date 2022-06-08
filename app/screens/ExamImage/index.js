import React, { Component } from "react";
import { View, TouchableOpacity, Image, FlatList, VirtualizedList, Dimensions } from 'react-native'
import { UIButton, UIHeader, UIScrollView, UIText, UIView, UIViewScreen } from "~/components";
import PropTypes from "prop-types";
import IconTrash from "~/assets/svg/trash.svg"
import { CONTENT, FONTS } from "~/config/styles";

import styles from './styles'

const width = Dimensions.get("screen").width

class ExamImage extends Component {
	constructor(props) {
		super(props);
	}

	renderItem = (item) => {
		return (
			<View style={styles.imageContainer}>
				<TouchableOpacity activeOpacity={.6} onPress={() => this.onSelectImage(item)}>
					<Image
						style={styles.imageStyles}
						resizeMode="cover"
						source={{
							uri   : item.uri,
							width : (width / 2),
							height: (width / 2) - 10
						}}
					/>
				</TouchableOpacity>
				<UIText textAlign="center" size={FONTS.sizeMiddle}>{item.date}</UIText>
			</View>
		)
	}

	onSelectImage = (item) => {
		const {header} = this.props.route.params
		return this.props.navigation.navigate("ExamImageDetail", {
			header: {
				...header,
				subTitle: item.date
			},
			item
		})
	}

	render() {
		const {header, images} = this.props.route.params

		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={header}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView bounces={false}>
					<UIView pt={15} flex={1}>
						<View style={styles.imagesContainer}>
							<FlatList
								numColumns={2}
								data={images}
								renderItem={({item}) => this.renderItem(item)}
								keyExtractor={item => item.id}
							/>
						</View>
					</UIView>
					<UIButton
						theme="secondary"
						type="block"
						title="COMPARTILHAR"
						onPress={() => this.props.navigation.navigate("ExamShare")}
					/>
					<UIButton
						style={{marginTop: 10}}
						type="block"
						title="BAIXAR PDF"
					/>
				</UIScrollView>
			</UIViewScreen>
		)
	}
}

export default ExamImage