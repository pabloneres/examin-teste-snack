import React, { Component, Fragment } from 'react'
import { View, TouchableOpacity } from 'react-native'
import {
	UIButton,
	UIHeader,
	UIIcon,
	UIInputDate,
	UIModal,
	UIScrollView, UISelect,
	UIText,
	UIView,
	UIViewScreen
} from '~/components'
import { COLOR_PRIMARY, FONTS, MENU_FLOAT } from "~/config/styles";
import * as Linking from 'expo-linking';
import { years, months } from './date'
import moment from "moment";

class Reminder extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		const {params} = this.props.route

		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{title: "Lembrete"}}
					right="empty"
					// right={{
					// 	icon     : "bell",
					// 	styleIcon: {color: COLOR_PRIMARY},
					// 	onPress  : () => this.modal.show()
					// }}
					navigation={this.props.navigation}
				/>
				<UIScrollView>
					<UIView mb={15}>
						<UIText size={13}>{params.date}</UIText>
					</UIView>
					<UIView mb={20}>
						<UIText weight="medium" size={FONTS.sizeExtraLarge + 2}>{params.title}</UIText>
					</UIView>
					<UIView mb={30}>
						<UIText size={FONTS.sizeMiddle}>{params.description}</UIText>
					</UIView>
					<View>
						<UIView mb={10}>
							<UIText size={FONTS.sizeBase + 2} weight="bold">Selecionamos alguns especialistas no assunto</UIText>
						</UIView>
						{
							params.experts.map((expert, index) => (
								<Fragment key={index}>
									<UIView style={{marginVertical: 20}}>
										<UIText size={FONTS.sizeLarge}>{expert.name}</UIText>
										<TouchableOpacity
											activeOpacity={.7}
											onPress={() => Linking.openURL(`tel:${expert.phone}`)}
										>
											<UIText size={13}>{expert.phone}</UIText>
										</TouchableOpacity>
									</UIView>
									{(params.experts?.length !== index + 1) && <View style={MENU_FLOAT.styleOptionDivider} />}
								</Fragment>
							))
						}

					</View>
				</UIScrollView>
				<UIModal
					ref={el => this.modal = el}
					title="Agendar alerta"
					buttons={[
						{
							title  : "CANCELAR",
							onPress: () => this.modal.hide(),
							theme  : "secondary",
							type   : "block"
						},
						{
							title  : "SALVAR",
							onPress: () => this.modal.hide(),
							type   : "block"
						},
					]}
				>
					<UIInputDate
						mode="date"
						iconColor="#000"
						value={new Date()} />
					<UIInputDate
						mode="time"
						value={new Date()}
						iconColor="#000"
						showDateFormat="HH:mm" />
				</UIModal>
			</UIViewScreen>
		)
	}
}

export default Reminder