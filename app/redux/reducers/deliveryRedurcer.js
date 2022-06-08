import { REHYDRATE } from "redux-persist";
import { authConstants, deliveryConstants } from "./../constants";
import isEmpty from "lodash/isEmpty";

const reducerKey = "delivery";

const defaultState = {
	isLoadingCart   : false,
	cartError       : "",
	cart            : null,
	store_type      : null,
	store_id        : null,
	percentage_stock: null,
	store_name      : null,
	address_id      : null,
	address         : null,
	fast_delivery   : null,
	payment_delivery: null,
};

export default function reducer(state = defaultState, action) {
	switch( action.type )
	{
		case REHYDRATE:
			let persistUpdate = {};

			if( action.payload && action.payload[reducerKey] )
			{
				const persistCache = action.payload[reducerKey];

				persistUpdate = {};
			}

			return Object.assign({}, state, persistUpdate);

		case authConstants.LOGOUT:
			return Object.assign({}, state, defaultState);

		case deliveryConstants.CART_REQUEST:
			return Object.assign({}, state, {
				isLoadingCart: true,
				cartError    : "",
			});

		case deliveryConstants.CART_SUCCESS:
			return Object.assign({}, state, {
				isLoadingCart: false,
				cart         : isEmpty(action.data) ? null : action.data,
			});

		case deliveryConstants.CART_ERROR:
			let stateNew = {
				isLoadingCart: false,
				cartError    : action.data.error_message,
			};

			if( action.data.error_http_code === 404 )
			{
				stateNew.cart = null;
			}

			return Object.assign({}, state, stateNew);

		case deliveryConstants.CART_RESET:
			return Object.assign({}, state, {
				cart: null,
			});

		case deliveryConstants.SELECT_ADDRESS:
			return Object.assign({}, state, {
				store_type   : action.data.tipo_loja,
				store_id     : action.data.idloja,
				store_name   : action.data.nome_endereco,
				address_id   : action.data?.idcliente_endereco ?? null,
				address      : action.data,
				fast_delivery: action.data?.entrega_rapida ?? false,
				payment_delivery: action.data.pagamento_entrega ?? false,
			});

		case deliveryConstants.SAVE_NUMBER_ADDRESS:
			return Object.assign({}, state, {
				address: {
					...state.address,
					numero     : action.data.address_number,
					complemento: action.data.address_complement,
				},
			});

		case deliveryConstants.ENTER_STORE:
			return Object.assign({}, state, {
				store_type      : action.data.DadosLoja.tipo_loja,
				percentage_stock: parseInt(action.data.DadosLoja.porcentagem_estoque),
				store_id        : parseInt(action.data.DadosLoja.idloja),
				store_name      : action.data.DadosLoja.nome_loja,
				address_id      : null,
				address         : null,
			});

		case deliveryConstants.RESET_ADDRESS:
			return Object.assign({}, state, {
				store_type   : null,
				store_id     : null,
				store_name   : null,
				address_id   : null,
				address      : null,
				fast_delivery: null,
				payment_delivery: null,
			});

		default:
			return state;
	}
}
