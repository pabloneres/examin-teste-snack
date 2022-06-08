import { generalConstants } from "./../constants";

/**
 * Enable notifications
 *
 * @returns {{type: string}}
 */
export const enableNotifications = () => {
	return {
		type: generalConstants.NOTIFICATION_ON,
	}
};

/**
 * Disable notifications
 *
 * @returns {{type: string}}
 */
export const disableNotifications = () => {
	return {
		type: generalConstants.NOTIFICATION_OFF,
	}
};

/**
 * Set types
 *
 * @param types
 *
 * @returns {{data: {types}, type: string}}
 */
export const setTypes = (types) => {
	return {
		type: generalConstants.TYPES,
		data: {
			types
		}
	}
};

/**
 * RedirectTo
 *
 * @returns {{type: string}}
 */
 export const redirectTo = (screen) => {
	return {
		type: generalConstants.REDIRECT_TO,
		data: {
			screen
		}
	}
};
