import { api } from "./../../config/api";

const basePath = "general";

/**
 * Get initial data
 *
 * @returns {Promise<T>}
 */
export const initialData = () => {
	return api.get(`${basePath}/initial-data`);
};
