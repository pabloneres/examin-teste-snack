import { REHYDRATE } from "redux-persist";
import { authConstants, generalConstants } from "./../constants";

const reducerKey = "general";

const defaultState = {
	notifiable: true,
	types     : [],
	enableWhatsapp: false,
	whatsapp: null,
	whatsappText: null,
	whatsappUrl: null
};

export default function reducer(state = defaultState, action) {
	switch( action.type )
	{
		case REHYDRATE:
			let persistUpdate = {};

			if( action.payload && action.payload[reducerKey] )
			{
				const persistCache = action.payload[reducerKey];

				persistUpdate = {
					notifiable: persistCache.notifiable === false ? false : defaultState.notifiable,
				};
			}

			return Object.assign({}, state, persistUpdate);

		case authConstants.LOGOUT:
			return Object.assign({}, state, {
				notifiable: true,
			});

		case generalConstants.NOTIFICATION_ON:
			return Object.assign({}, state, {
				notifiable: true,
			});

		case generalConstants.NOTIFICATION_OFF:
			return Object.assign({}, state, {
				notifiable: false,
			});

		case generalConstants.TYPES:
			return Object.assign({}, state, {
				types: action.data.types,
			});

		case generalConstants.SETTING_WHATSAPP:
			return Object.assign({}, state, {
				enableWhatsapp: action.payload.enable_whatsapp,
				whatsapp: action.payload.whatsapp,
				whatsappUrl: action.payload.whatsapp_url,
			});
		default:
			return state;
	}
}
