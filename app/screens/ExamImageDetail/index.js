import React, { Component } from "react";
import { View, TouchableOpacity, Image } from 'react-native'
import { UIButton, UIHeader, UIScrollView, UIViewScreen } from "~/components";
import PropTypes from "prop-types";
import IconTrash from "~/assets/svg/trash.svg"
import { BACKGROUND_COLOR, CONTENT } from "~/config/styles";
import ImageViewer from 'react-native-image-zoom-viewer';

class ExamImageDetail extends Component {
	render() {
		const {header, item} = this.props.route.params

		const images = [{
			url: item.uri
		}]

		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={header}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView bounces={false}>
					<View style={{flex: 1}}>
						<ImageViewer
							style={{flex: 1}}
							renderIndicator={() => <></>}
							backgroundColor={BACKGROUND_COLOR}
							imageUrls={images}
							saveToLocalByLongPress={false}
						/>
					</View>
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

export default ExamImageDetail