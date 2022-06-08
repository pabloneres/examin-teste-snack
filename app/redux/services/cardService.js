import { api } from "./../../config/api";

const basePath = "cards";

/**
 * Get all
 *
 *
 * @returns {Promise<T>}
 */
export const getAll = () => {
	return api.get(basePath);
};

/**
 * Show
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const show = (options) => {
	return api.get(`${basePath}/${options.id}`);
};

/**
 * Create
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const create = (options) => {
	return api.post(basePath, options);
};

/**
 * Delete
 *
 * @param {Object} options
 *
 * @returns {Promise<T>}
 */
export const destroy = (options) => {
	return api.delete(`${basePath}/${options.id}`);
};
