import { listingLastDateConstants } from "./../constants";

/**
 * Addresses
 *
 * @returns {{type: string}}
 */
export const addresses = () => {
	return {
		type: listingLastDateConstants.ADDRESSES,
	};
};

/**
 * Credit cards
 *
 * @returns {{type: string}}
 */
export const creditCards = () => {
	return {
		type: listingLastDateConstants.CREDIT_CARDS,
	};
};

/**
 * Product reviews
 *
 * @returns {{type: string}}
 */
export const productReviews = () => {
	return {
		type: listingLastDateConstants.PRODUCT_REVIEWS,
	};
};
