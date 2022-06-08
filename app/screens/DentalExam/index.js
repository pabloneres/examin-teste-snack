import React, { Component, Fragment } from "react";
import { FlatList, View } from "react-native";
import { UIHeader, UIIcon, UIInput, UIListEmpty, UILoading, UIMenuFloat, UIModal, UIScrollView, UIText, UIViewScreen } from "~/components";

import Item from './item'
import styles from './styles'
import { FONTS } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";

class DentalExam extends Component {
	constructor(props) {
		super(props);

		this.state       = {
			isLoading         : true,
			isSearching       : false,
			doneTypingInterval: 1200,
			data              : [],
			filter            : {
				title: "MAIS RECENTES",
				key  : "recente"
			},
			filters           : [
				{
					title: "MAIS RECENTES",
					key  : "recentes"
				},
				{
					title: "MAIS ANTIGOS",
					key  : "antigos"
				},
				{
					title: "De A a Z",
					key  : "az",
				},
				{
					title: "De Z a A",
					key  : "az",
				}
			]
		}
		this.typingTimer = null
	}

	componentDidMount() {
		this.loadExames()
	}

	loadExames = () => { //TODO
		this.setState({
			isLoading: true
		})
		fakeRequest(true, "dental").then((response) => {
			this.setState({
				data       : response.data.data,
				isLoading  : false,
				isSearching: false
			})
		})
	}

	onSelectExam = (item) => {
		return this.props.navigation.navigate("ExamImage", {
			header: {
				title: item.title
			},
			images: [ //TODO apenas trocar pelas imagens da requisição
				{
					uri : "https://img.wallpapic-br.com/i1142-415-49/medium/raio-x-criativos-arte-digital-radiologia-imagem-de-fundo.jpg",
					date: "18, Out de 2021, às 15:03",
					id  : "1"
				},
				{
					uri : "https://img.wallpapic-br.com/i1142-415-49/medium/raio-x-criativos-arte-digital-radiologia-imagem-de-fundo.jpg",
					date: "18, Out de 2021, às 15:03",
					id  : "2"
				},
				{
					uri : "https://img.wallpapic-br.com/i1142-415-49/medium/raio-x-criativos-arte-digital-radiologia-imagem-de-fundo.jpg",
					date: "18, Out de 2021, às 15:03",
					id  : "3"
				},
				{
					uri : "https://img.wallpapic-br.com/i1142-415-49/medium/raio-x-criativos-arte-digital-radiologia-imagem-de-fundo.jpg",
					date: "18, Out de 2021, às 15:03",
					id  : "4"
				},
			]
		})
	}

	onChangeSearch = (e) => {
		if( e.length === 0 )
		{
			clearTimeout(this.typingTimer)
			this.loadExames()
			return
		}

		this.setState({
			isSearching: true
		})
		clearTimeout(this.typingTimer)
		this.typingTimer = setTimeout(() => this.onSearch(e), this.state.doneTypingInterval)
	}

	onSearch = (e) => { //TODO
		fakeRequest(true).then((response) => {
			this.setState({
				isSearching: false,
				data       : []
			})
		})
	}

	onChangeFilter = (index) => {
		this.setState(state => ({
			filter: state.filters[index]
		}))
	}

	renderList = () => {
		const {data} = this.state

		return (
			<View style={{flex: 1}}>
				{
					!data.length ? (
						<UIListEmpty />
					) : data.map((item) => this.renderItem(item))
				}
			</View>
		)
	}

	renderItem = (item) => {
		return (
			<Item key={item.title} title={item.title} subTitle={item.subTitle} onPress={() => this.onSelectExam(item)} />
		)
	}

	render() {
		const {data, isSearching, isLoading, filter, filters} = this.state
		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{
						title: "Exames odontológicos"
					}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<View style={styles.searchContainer}>
					<UIInput
						isSearch={true}
						placeholder="Buscar exame"
						allowClear
						onClear={this.loadExames}
						containerStyle={{marginBottom: -5}}
						onChangeText={this.onChangeSearch}
						isLoading={isSearching}
					/>
					<View style={styles.filterContainer}>
						<UIMenuFloat
							textAlign="center"
							trigger={
								<View style={{flexDirection: "row", marginTop: 20}}>
									<UIText weight="bold" size={FONTS.sizeMiddle}>{filter.title}</UIText>
									<UIIcon name="select-arrow" size={FONTS.sizeSmall} style={{marginTop: 5, marginLeft: 5, marginRight: -5}} />
								</View>
							}
							options={filters.map((item, index) => ({
								...item,
								onPress: () => this.onChangeFilter(index)
							}))}
						/>
					</View>
				</View>
				<UIScrollView>
					{
						isLoading ? (
							<View style={styles.loading}>
								<UILoading />
							</View>
						) : this.renderList()
					}
				</UIScrollView>
			</UIViewScreen>
		)
	}
}

export default DentalExam