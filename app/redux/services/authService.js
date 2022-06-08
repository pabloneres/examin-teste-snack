import { api } from "./../../config/api";
import { appendToFormData } from "./../../helpers/form";

const basePath = "auth";

/**
 * Login user
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const login = (options) => {
	return api.post(`${basePath}/login`, options);
};

/**
 * Facebook register/login
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const facebook = (options) => {
	return api.post(`${basePath}/facebook`, options);
};

/**
 * Apple register/login
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const apple = (options) => {
	return api.post(`${basePath}/apple`, options);
};

/**
 * Register user
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const register = (options) => {
	const formData = new FormData();

	for( let key in options )
	{
		if( options.hasOwnProperty(key) )
		{
			appendToFormData(formData, key, options[key]);
		}
	}

	return api.post(`${basePath}/register`, formData);
};

/**
 * Complete register user
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const registerComplete = (options) => {
	const formData = new FormData();

	for( let key in options )
	{
		if( options.hasOwnProperty(key) )
		{
			appendToFormData(formData, key, options[key]);
		}
	}

	return api.post(`${basePath}/register-complete`, formData);
};

/**
 * Logout logged user
 *
 * @returns {Promise<T>}
 */
export const logout = () => {
	return api.delete(`${basePath}/logout`);
};

/**
 * Password recovery
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const passwordRecovery = (options) => {
	return api.post(`${basePath}/password/recovery`, options);
};

/**
 * Get logged user
 *
 * @returns {Promise<T>}
 */
export const getUserData = () => {
	return api.get(`${basePath}/user`);
};

/**
 * Edit user
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const edit = (options) => {
	return api.post(`${basePath}/edit`, options);
};

/**
 * Change user password
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const changePassword = (options) => {
	return api.post(`${basePath}/change-password`, options);
};

/**
 * Change user avatar
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const changeAvatar = (options) => {
	const form = new FormData();
	form.append("avatar", options.avatar, options.avatar.name);

	return api.post(`${basePath}/change-avatar`, form);
};

/**
 * Remove account
 *
 * @returns {Promise<T>}
 */
export const removeAccount = () => {
	return api.delete(`${basePath}/remove-account`);
};

/**
 * Send phone code
 *
 * @returns {Promise<T>}
 */
 export const sendPhoneCode = () => {
	return api.post(`${basePath}/send-phone-code`);
};

/**
 * Validate sms code
 *
 * @returns {Promise<T>}
 */
export const validateSmsCode = (options) => {
	return api.post(`sms/${options.code}`);
};

/**
 * Change cellphone
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */

export const changeCellphone = (options) => {
	const formData = new FormData();

	for( let key in options )
	{
		if( options.hasOwnProperty(key) )
		{
			appendToFormData(formData, key, options[key]);
		}
	}

	return api.post("usuario/alterar-celular", formData);
};

/**
 * Confirm phone code
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
 export const confirmPhoneCode = (options) => {
	return api.post(`${basePath}/confirm-phone-code`, options);
};
