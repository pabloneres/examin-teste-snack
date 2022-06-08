import React, { Component, Fragment } from "react";
import { FlatList, View } from "react-native";
import { UIHeader, UIIcon, UIInput, UIListEmpty, UILoading, UIMenuFloat, UIButton, UIScrollView, UIText, UIViewScreen } from "~/components";

import Item from './item'
import styles from './styles'
import { FONTS } from "~/config/styles";
import fakeRequest from "~/helpers/fakeRequest";

class VaccinationCard extends Component {
	constructor(props) {
		super(props);

		this.state       = {
			isLoading         : true,
			isSearching       : false,
			doneTypingInterval: 500,
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
		this.loadAll()
	}

	loadAll = () => { //TODO
		this.setState({
			isLoading: true
		})
		fakeRequest(true, "vaccine").then((response) => {
			this.setState({
				data       : response.data.data,
				isLoading  : false,
				isSearching: false
			})
		})
	}

	onSelectVaccine = (item) => {
		return this.props.navigation.navigate("VaccineShow", item)
	}

	onChangeSearch = (e) => {
		if( e.length === 0 )
		{
			clearTimeout(this.typingTimer)
			this.loadAll()
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
			<Item key={item.title} title={item.title} subTitle={item.subTitle} onPress={() => this.onSelectVaccine(item)} />
		)
	}

	render() {
		const {data, isSearching, isLoading, filter, filters} = this.state
		return (
			<UIViewScreen enableStatusBar>
				<UIHeader
					left="backButton"
					center={{
						title: "Carteira de vacinação"
					}}
					right="empty"
					navigation={this.props.navigation}
				/>
				<View style={styles.searchContainer}>
					<UIInput
						isSearch={true}
						allowClear
						onClear={this.loadAll}
						placeholder="Buscar vacina"
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
					<View style={{flex: 1}}>
						{
							isLoading ? (
								<View style={styles.loading}>
									<UILoading />
								</View>
							) : this.renderList()
						}
					</View>
					<UIButton
						type="block"
						title="NOVA VACINA"
						onPress={() => this.props.navigation.navigate("VaccineNew")}
					/>
				</UIScrollView>
			</UIViewScreen>
		)
	}
}

export default VaccinationCard