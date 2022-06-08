import React, { Component } from "react";
import { View, TouchableOpacity, Image, Keyboard } from 'react-native'
import { UIButton, UIDialogLoading, UIHeader, UIModal, UIScrollView, UIText, UIViewScreen } from "~/components";
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import IconTrash from "~/assets/svg/trash.svg"
import { CONTENT } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";

class ShowVaccine extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isSending: false,
			data     : {}
		}
	}

	componentDidMount() {
		this.setState({
			data: this.props.route.params
		})
	}

	onDelete = () => {
		this.modal.hide()
		this.setState({
			isSending: true,
		});

		fakeRequest(true) //TODO
		.then((response) => {
			this.setState({
				isSending: false,
			});

			this.props.navigation.goBack()
		})
	}

	share = () => {
		captureRef(this.container, {
			format : 'jpg',
			quality: 0.72,
		}).then((response) => {
			let file = response;

			if( !response.startsWith('file:///') )
			{
				file = `file:///${response}`;
			}

			return Sharing.shareAsync(file, {
				UTI     : "image/jpeg",
				mimeType: "image/jpeg",
			});
		}).catch((data) => {
			this.setState({
				dialogVisible: true,
				dialogTitle  : "Falha",
				dialogMessage: String(data),
			});
		});
	};

	render() {
		const {data} = this.state

		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{
						title   : data.title,
						subTitle: data.subTitle
					}}
					right={{
						icon     : "trash",
						onPress  : () => this.modal.show(),
						styleIcon: {fontSize: 20}
					}}
					navigation={this.props.navigation}
				/>
				<UIScrollView>
					<ViewShot
						ref={el => this.container = el}
						style={{flexGrow: 1, backgroundColor: "#fff"}}
					>
						<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
							<Image
								source={{uri: data.image, height: "100%", width: "100%"}}
							/>
						</View>
					</ViewShot>
					<UIButton
						theme="secondary"
						type="block"
						title="COMPARTILHAR"
						onPress={this.share}
					/>
				</UIScrollView>
				<UIModal
					ref={el => this.modal = el}
					buttons={[
						{
							title  : "Cancelar",
							onPress: () => this.modal.hide(),
							theme  : "secondary",
							type   : "block"
						},
						{
							title  : "Excluir",
							onPress: this.onDelete,
							type   : "block"
						},
					]}
				>
					<UIText>
						Deseja mesmo excluir esse arquivo?
					</UIText>
				</UIModal>
				<UIDialogLoading
					visible={this.state.isSending}
					message="Aguarde..."
				/>
			</UIViewScreen>
		)
	}
}

export default ShowVaccine