import { authConstants, listingItemUpdatedConstants } from "./../constants";

const reducerKey = "listingItemUpdated";

const defaultState = {
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
		 * Credit cards
		 */
		case listingItemUpdatedConstants.CREDIT_CARDS:
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
