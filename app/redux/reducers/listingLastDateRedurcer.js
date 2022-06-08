import { listingLastDateConstants } from "./../constants";

const reducerKey = "listingLastDate";

const defaultState = {
	addresses     : 0,
	creditCards   : 0,
	productReviews: 0,
};

export default function reducer(state = defaultState, action) {
	switch( action.type )
	{
		case listingLastDateConstants.ADDRESSES:
			return Object.assign({}, state, {
				addresses: Math.round((new Date()).getTime() / 100),
			});

		case listingLastDateConstants.CREDIT_CARDS:
			return Object.assign({}, state, {
				creditCards: Math.round((new Date()).getTime() / 100),
			});

		case listingLastDateConstants.PRODUCT_REVIEWS:
			return Object.assign({}, state, {
				productReviews: Math.round((new Date()).getTime() / 100),
			});

		default:
			return state;
	}
}
