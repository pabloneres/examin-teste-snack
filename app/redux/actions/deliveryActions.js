import { deliveryConstants } from "./../constants";
import { deliveryService } from "./../services";

/**
 * Re-load cart data from server
 *
 * @param options
 *
 * @returns {function(*)}
 */
export const refreshCart = (options) => {
	return (dispatch) => {
		dispatch({
			type: deliveryConstants.CART_REQUEST,
		});

		// Get cart
		deliveryService.cart(options).then((response) => {
			dispatch({
				type: deliveryConstants.CART_SUCCESS,
				data: response.data,
			});
		})
		.catch((data) => {
			dispatch({
				type: deliveryConstants.CART_ERROR,
				data: {
					error_http_code: data.error.response ? data.error.response.status : null,
					error_type     : data.error_type,
					error_message  : data.error_message,
					error_errors   : data.error_errors,
				}
			});
		});
	};
};

/**
 * Reset cart
 *
 * @returns {{data: *, type: string}}
 */
export const resetCart = () => {
	return {
		type: deliveryConstants.CART_RESET,
	}
};

/**
 * Select address
 *
 * @param data
 *
 * @returns {{type: string, data: *}}
 */
export const selectAddress = (data) => {
	return {
		type: deliveryConstants.SELECT_ADDRESS,
		data: data,
	}
};

/**
 * Save number address
 *
 * @param address_id
 * @param address_number
 * @param address_complement
 *
 * @returns {{type: string, data: *}}
 */
export const saveNumberAddress = (address_id, address_number, address_complement) => {
	return {
		type: deliveryConstants.SAVE_NUMBER_ADDRESS,
		data: {
			address_id,
			address_number,
			address_complement,
		},
	}
};

/**
 * Read QRCODE to enter a HONEST PAY Store
 *
 * @param data
 *
 * @returns {{type: string, data: *}}
 */
export const enterStore = (data) => {
	return {
		type: deliveryConstants.ENTER_STORE,
		data: data,
	}
};

/**
 * Reset address
 *
 * @returns {{type: string}}
 */
export const resetAddress = () => {
	return {
		type: deliveryConstants.RESET_ADDRESS,
	}
};
