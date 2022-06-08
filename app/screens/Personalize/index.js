import React, { Component, Fragment } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { UIButton, UIDialogLoading, UIHeader, UIIcon, UILoading, UIScrollView, UIText, UIView, UIViewScreen } from '~/components'
import styles from './styles'
import { CHECKBOX } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";

class Personalize extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: false,
			isSending: false,
			list     : [
				{
					title  : "Mamografia",
					checked: false
				},
				{
					title  : "Desintometria Óssea",
					checked: false
				},
				{
					title  : "Tomografia Computadorizada",
					checked: false
				},
				{
					title  : "Ultra-sonografia",
					checked: false
				},
				{
					title  : "Ecografia Tridimensional",
					checked: false
				},
				{
					title  : "Audiometria",
					checked: false
				},
				{
					title  : "Eletrocardiograma",
					checked: false
				},
			]
		}
	}

	onCheckOption = (index, indexList) => {
		const list = this.state.list

		list[index].checked = !list[index].checked

		this.setState({
			list
		})
	}

	renderList = () => {
		const {list} = this.state
		return (
			<Fragment>
				{
					list.map((item, index) => {
						return (
							<View key={index} style={styles.optionContainer}>
								<TouchableOpacity onPress={() => this.onCheckOption(index)} style={CHECKBOX.acceptOptionCheck}>
									{item.checked && <View style={CHECKBOX.checkedOption} />}
								</TouchableOpacity>
								<UIText color="#696969">{item.title}</UIText>
							</View>
						)
					})
				}
			</Fragment>
		)
	}

	onSubmit = () => { //TODO
		this.setState({
			isSending: true
		})

		fakeRequest(true).then((data) => {
			this.setState({
				isSending: false
			})

			this.props.navigation.goBack()
		})
	}

	render() {
		const {isLoading} = this.state

		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{title: "Personalizar"}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<UIScrollView>
					{
						isLoading ? (
							<UILoading />
						) : (
							<Fragment>
								<View style={{flex: 1, marginTop: 20}}>
									{this.renderList()}
								</View>

								<UIButton
									style={{marginTop: 20}}
									type="block"
									title="SALVAR"
									theme="secondary"
									onPress={this.onSubmit}
								/>
							</Fragment>
						)
					}
				</UIScrollView>
				<UIDialogLoading
					visible={this.state.isSending}
					message="Aguarde..."
				/>
			</UIViewScreen>
		)
	}
}

export default Personalize