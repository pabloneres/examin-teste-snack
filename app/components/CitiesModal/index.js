import React, { Component } from "react";
import PropTypes from "prop-types";
import Toast from "react-native-root-toast";
import axios from "axios";
import {
	FlatList,
	Keyboard,
	Modal,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import styles from "./styles";

import UIHeader from "./../Header";
import UIIcon from "./../Icon";
import UIListEmpty from "./../ListEmpty";
import UILoading from "./../Loading";
import UIText from "./../Text";
import UIViewScreen from "./../ViewScreen";

import { API_ERRO_TYPE_CANCEL } from "./../../config/general";

import { TOAST } from "./../../config/styles";

import Item from "./item";

import { webserviceService } from "./../../redux/services";

class UICitiesModal extends Component {
	static propTypes = {
		placeholder   : PropTypes.string,
		onShow        : PropTypes.func,
		onValueChange : PropTypes.func,
		onSelectItem  : PropTypes.func,
		onRequestClose: PropTypes.func,
	};

	static defaultProps = {
		placeholder: "Pesquisar cidade",
	};

	constructor(props) {
		super(props);

		this.state = {
			modalVisible    : false,
			isLoading       : false,
			searchInputValue: "",
			data            : [],
			item            : {},
		};

		this._cancelToken = null;
	}

	fetchItems = () => {
		if( this._cancelToken )
		{
			this._cancelToken.cancel("Only one request allowed at a time.");
		}

		this._cancelToken = axios.CancelToken.source();

		const {searchInputValue} = this.state;

		this.setState({
			isLoading: true,
		});

		let data = {
			search     : searchInputValue,
			cancelToken: this._cancelToken.token,
		};

		webserviceService.getCities(data)
		.then((response) => {
			this.setState({
				isLoading: false,
				data     : response.data.data,
			});
		})
		.catch((data) => {
			if( data.error_type === API_ERRO_TYPE_CANCEL ) return null;

			this.setState({
				isLoading: false,
			});

			Toast.show(data.error_message, {
				duration      : 3000,
				position      : -20,
				containerStyle: TOAST.styleContainer,
				textStyle     : TOAST.styleText,
			});
		});
	};

	/**
	 * Focus field
	 */
	focus = () => {
		this.show();
	};

	/**
	 * Show modal
	 */
	show = () => {
		if( !this.state.modalVisible )
		{
			// Dismiss keyboard
			Keyboard.dismiss();

			this.setState({
				modalVisible: true,
			}, () => {
				// Focus
				setTimeout(() => {
					this.inputSearch && this.inputSearch.focus();
				}, 300);
			});

			if( this.props.onShow )
			{
				this.props.onShow();
			}
		}
	};

	/**
	 * Hide modal
	 */
	hide = (action = null) => {
		if( this.state.modalVisible )
		{
			if( action === "cancel" )
			{
				if( this._cancelToken )
				{
					this._cancelToken.cancel("Only one request allowed at a time.");
				}
			}

			this.setState({
				modalVisible    : false,
				isLoading       : false,
				searchInputValue: "",
				data            : [],
			}, () => {
				if( action === "cancel" && this.props.onRequestClose )
				{
					this.props.onRequestClose();
				}
				else if( action === "selected" && this.props.onSelectItem )
				{
					this.props.onSelectItem(this.state.item);
				}
			});
		}
	};

	/**
	 * Set value
	 *
	 * @param {object} item
	 */
	setValue = (item) => {
		this.setState({
			item: {
				id  : item.id,
				name: item.name,
			},
		}, () => {
			if( this.props.onValueChange )
			{
				this.props.onValueChange(this.state.item);
			}

			this.hide("selected");
		});
	};

	/**
	 * Get value
	 */
	getValue = () => this.state.item;

	_onPressItem = (item) => {
		this.setValue({
			id  : item.uuid,
			name: item.full_name,
		});
	};

	onInputChangeText = (value) => {
		this.setState({
			searchInputValue: value,
		}, () => {
			if( !this.state.searchInputValue.length )
			{
				if( this._cancelToken )
				{
					this._cancelToken.cancel("Only one request allowed at a time.");
				}

				this.setState({
					isLoading: false,
					data     : [],
				});
			}
			else
			{
				this.fetchItems();
			}
		});
	};

	onClear = () => {
		this.inputSearch.focus();

		this.onInputChangeText("");
	};

	_renderSearch = () => {
		const {searchInputValue} = this.state;

		return (
			<View style={styles.inputWrap}>
				<TextInput
					ref={el => this.inputSearch = el}
					style={styles.inputSearch}
					underlineColorAndroid="transparent"
					placeholder={this.props.placeholder}
					placeholderTextColor="rgba(255,255,255,0.7)"
					returnKeyType="done"
					blurOnSubmit={true}
					value={searchInputValue}
					onChangeText={this.onInputChangeText}
				/>
				{searchInputValue.length > 0 && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={this.onClear}
						style={styles.clearBtn}>
						<View style={styles.clearBtnInner}>
							<UIIcon name="input-clear" size={16} color="#fff" />
						</View>
					</TouchableOpacity>
				)}
			</View>
		);
	};

	_renderSeparator = () => (
		<View style={styles.listSeparator} />
	);

	_renderEmpty = () => {
		if( !this.state.searchInputValue.length ) return null;

		return (
			<UIListEmpty />
		)
	};

	_renderItem = ({item}) => (
		<Item
			item={item}
			onPressItem={this._onPressItem}
		/>
	);

	_renderHeader = () => {
		if( !this.state.data.length ) return null;

		return (
			<UIText weight="bold" size={12} style={{marginBottom: 10}}>RESULTADOS</UIText>
		);
	};

	_renderList = () => {
		if( this.state.isLoading )
		{
			return (
				<View style={styles.loading}>
					<UILoading />
				</View>
			);
		}

		return (
			<FlatList
				keyExtractor={(item) => String(item.uuid)}
				data={this.state.data}
				renderItem={this._renderItem}
				ListEmptyComponent={this._renderEmpty}
				ListHeaderComponent={this._renderHeader}
				ItemSeparatorComponent={this._renderSeparator}
				contentContainerStyle={styles.scrollContentStyle}
				keyboardShouldPersistTaps="handled"
			/>
		)
	};

	render() {
		return (
			<Modal
				transparent={true}
				animationType="slide"
				onRequestClose={() => this.hide("cancel")}
				visible={this.state.modalVisible}>
				<UIViewScreen theme="primary" enableStatusBar statusBarTheme="primary" enableStatusBarHeight={false} hasForm>
					<UIHeader
						theme="primary"
						left={{
							icon   : "select-back",
							onPress: () => this.hide("cancel")
						}}
						center={this._renderSearch}
						styleTitle={{textAlign: "left"}}
					/>
					<View style={styles.contentWrap}>
						{this._renderList()}
					</View>
				</UIViewScreen>
			</Modal>
		);
	}
}

export default UICitiesModal;
