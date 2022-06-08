import React, { Component, Fragment } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { UIButton, UIHeader, UIIcon, UIScrollView, UIText, UIView, UIViewScreen } from '~/components'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import styles from './styles';
import Item from './item'
import { CONTENT } from "~/config/styles";

class Reminders extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list: [
				{
					id         : "1",
					title      : "Não esqueça de fazer seu exame periódico!",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent est libero, dignissim sit amet risus a, accumsan molestie massa. ",
					date       : "Hoje ás 15:00",
					experts    : [
						{
							name : "Dra. Lorem ipsum",
							phone: "(43) 9876-9876"
						},
						{
							name : "Dra. Sit Amet",
							phone: "(43) 9876-9876"
						}
					],
				},
				{
					id         : "2",
					title      : "Você tem um novo exame de imagem disponível",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent est libero, dignissim sit amet risus a, accumsan molestie massa. ",
					date       : "Ontem ás 15:30",
					experts    : [
						{
							name : "Dra. Lorem ipsum",
							phone: "(43) 9876-9876"
						},
						{
							name : "Dra. Sit Amet",
							phone: "(43) 9876-9876"
						}
					],
				},
				{
					id         : "3",
					title      : "Complete sua Anamnese",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent est libero, dignissim sit amet risus a, accumsan molestie massa. ",
					date       : "18 de Janeiro ás 10:30",
					experts    : [
						{
							name : "Dra. Lorem ipsum",
							phone: "(43) 9876-9876"
						},
						{
							name : "Dra. Sit Amet",
							phone: "(43) 9876-9876"
						}
					],
				},
				{
					id         : "4",
					title      : "Você tem um novo exame de imagem disponível",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent est libero, dignissim sit amet risus a, accumsan molestie massa. ",
					date       : "05 de Janeiro ás 10:30",
					experts    : [
						{
							name : "Dra. Lorem ipsum",
							phone: "(43) 9876-9876"
						},
						{
							name : "Dra. Sit Amet",
							phone: "(43) 9876-9876"
						}
					],
				},
				{
					id         : "5",
					title      : "Finalize seu cadastro",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent est libero, dignissim sit amet risus a, accumsan molestie massa. ",
					date       : "17 de Maio ás 14:00",
					experts    : [
						{
							name : "Dra. Lorem ipsum",
							phone: "(43) 9876-9876"
						},
						{
							name : "Dra. Sit Amet",
							phone: "(43) 9876-9876"
						}
					],
					inactive   : true
				}
			]
		}
	}

	renderList = () => {
		const {list} = this.state

		return (
			<View>
				{
					list.map((item, index) => (
						<Fragment key={index}>
							<Item
								title={item.title}
								date={item.date}
								onDetails={() => this.onDetails(item)} //TODO
								onDelete={() => this.onDelete(index)} //TODO
								inactive={item.inactive}
							/>
							{(list.length !== index + 1) && <View style={styles.dividerRow} />}
						</Fragment>
					))
				}
			</View>
		)
	}

	onDetails = (item) => { //TODO
		this.props.navigation.navigate("Reminder", item)
	}

	onDelete = (id) => { //TODO
		let list = this.state.list
		list.splice(id, 1)

		this.setState(state => ({
			list,
		}))
	}

	render() {
		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{title: "Lembretes"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIViewScreen>
					<UIScrollView>
						{this.renderList()}
					</UIScrollView>
				</UIViewScreen>
			</UIViewScreen>
		)
	}
}

export default Reminders