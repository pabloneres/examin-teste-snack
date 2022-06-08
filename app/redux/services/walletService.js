import { api } from "./../../config/api";

const basePath = "wallet";

/**
 * Get balance
 *
 * @returns {Promise<T>}
 */
export const getBalance = () => {
	return api.get(`${basePath}/balance`);
};