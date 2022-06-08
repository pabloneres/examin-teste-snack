import { listingItemUpdatedConstants } from "./../constants";

/**
 * Credit cards
 *
 * @param item
 * @returns {{data: *, type: string}}
 */
export const creditCards = (item) => {
	return {
		type: listingItemUpdatedConstants.CREDIT_CARDS,
		data: item,
	};
};
