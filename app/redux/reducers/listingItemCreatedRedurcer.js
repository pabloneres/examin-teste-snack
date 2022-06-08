import { authConstants, listingItemCreatedConstants } from "./../constants";

const reducerKey = "listingItemCreated";

const defaultState = {
	addresses  : {
		lastDate: 0,
		item    : null,
	},
	creditCards: {
		lastDate: 0,
		item    : null,
	},
};

export default function reducer(state = defaultState, action) {
	switch( action.type )
	{
		case authConstants.LOGOUT:
			return Object.assign({}, state, defaultState);

		/**
		 * Addresses
		 */
		case listingItemCreatedConstants.ADDRESSES:
			return Object.assign({}, state, {
				addresses: {
					lastDate: Math.round((new Date()).getTime() / 100),
					item    : action.data,
				},
			});

		/**
		 * Credit cards
		 */
		case listingItemCreatedConstants.CREDIT_CARDS:
			return Object.assign({}, state, {
				creditCards: {
					lastDate: Math.round((new Date()).getTime() / 100),
					item    : action.data,
				},
			});

		default:
			return state;
	}
}
