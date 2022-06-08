import * as Application from 'expo-application';
import * as Updates from 'expo-updates';

import {
	Platform,
} from "react-native";

import { getStatusBarHeight, isIPhoneWithMonobrow } from "./../helpers/statusBarHeight";

// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------
export const APP_NAME               = Application.applicationName;
export const APP_VERSION            = Application.nativeApplicationVersion;
export const APP_BUILD              = Application.nativeBuildVersion;
export const APP_RELEASE_CHANNEL    = Updates.releaseChannel;
export const IS_DEBUG               = false; //TESTE
export const STATUS_BAR_HEIGHT      = getStatusBarHeight();
export const BOTTOM_BAR_HEIGHT      = isIPhoneWithMonobrow() ? 18 : 0;
export const TIMEOUT_TRANSITION_FIX = Platform.OS === 'ios' ? 400 : 200;

// -----------------------------------------------------------------------------
// API's
// -----------------------------------------------------------------------------
export const SENTRY_DNS       = "https://7a29c762eda646fca0916ff051e947dc@o517317.ingest.sentry.io/5907983";
export const ONESIGNAL_ID     = "1d3ae663-3123-4932-ab99-73ac4bdbd1b7";
export const SMARTLOOK_KEY    = "";
export const FACEBOOK_APP_ID  = "1231898873908431";
export const FACEBOOK_VERSION = "v11.0";

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------
const URLS = {
	default  : {
		api : IS_DEBUG ? 'http://192.168.1.7/eletrica-dz-api/api/v1/customer/' : 'https://api.grupodz.net/api/v1/customer/',
		site: IS_DEBUG ? 'http://192.168.1.7/eletrica-dz-api/api/' : 'https://www.grupodz.net/',
	},
	'prod-v1': {
		api : 'https://api.grupodz.net/api/v1/customer/',
		site: 'https://www.grupodz.net/',
	},
};

export const API_URL = URLS[APP_RELEASE_CHANNEL].api;

export const SITE_URL                = URLS[APP_RELEASE_CHANNEL].site;
export const EXCHANGE_AND_RETURN_URL = `${SITE_URL}app/institucional/trocas-e-devolucoes`;
export const PRIVACY_POLICY_URL      = `${SITE_URL}app/institucional/politica-de-privacidade`;
export const TERMS_OF_USE_URL        = `${SITE_URL}app/institucional/termos-de-uso`;

// -----------------------------------------------------------------------------
// Third data
// -----------------------------------------------------------------------------
export const APP_ANDROID_ID = 'br.com.westfarm';
export const APP_IOS_ID     = '1581346533';

// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------
export const API_ERRO_TYPE_VALIDATION   = "validation";
export const API_ERRO_TYPE_API          = "api";
export const API_ERRO_TYPE_SERVER       = "server";
export const API_ERRO_TYPE_CONNECTION   = "connection";
export const API_ERRO_TYPE_OTHER        = "other";
export const API_ERRO_TYPE_ACCESS_TOKEN = "access_token";
export const API_ERRO_TYPE_CANCEL       = "cancel";

// -----------------------------------------------------------------------------
// Texts
// -----------------------------------------------------------------------------
export const TEXTS = {
	listEmpty      : "Não há itens disponíveis",
	listError      : "Ocorreu um erro",
	listErrorButton: "Tentar novamente",
}
