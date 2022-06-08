import { listingItemCreatedConstants } from "./../constants";

/**
 * Addresses
 *
 * @param item
 * @returns {{data: *, type: string}}
 */
export const addresses = (item) => {
	return {
		type: listingItemCreatedConstants.ADDRESSES,
		data: item,
	};
};

/**
 * Credit cards
 *
 * @param item
 * @returns {{data: *, type: string}}
 */
export const createCreditCards = (item) => {
	return {
		type: listingItemCreatedConstants.CREDIT_CARDS,
		data: item,
	};
};
