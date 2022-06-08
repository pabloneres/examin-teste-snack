import { REHYDRATE } from "redux-persist";
import { authConstants } from "./../constants";

const reducerKey = "auth";

const defaultState = {
	isAuthenticated  : false,
	isLoadingUserData: false,
	isLoadingBalance : false,
	accessToken      : "",
	sendSmsVerifiedAt: null,
	addresses        : [],
	userData         : {
		uuid         : "",
		name         : "",
		email        : "",
		avatar       : null,
		avatar_sizes : {},
		document_type: "",
		document     : "",
		gender       : null,
		birth        : null,
		phone        : "",
		city         : null,
		balance      : 0,
		is_completed : 0,
		custom_data  : null,
		plan         : ""
	},
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
					isAuthenticated: persistCache.isAuthenticated,
					accessToken    : persistCache.accessToken,
				};

				if( persistCache.userData )
				{
					persistUpdate.userData = {
						uuid         : persistCache.userData.uuid ?? defaultState.userData.uuid,
						name         : persistCache.userData.name ?? defaultState.userData.name,
						email        : persistCache.userData.email ?? defaultState.userData.email,
						avatar       : persistCache.userData.avatar ?? defaultState.userData.avatar,
						avatar_sizes : persistCache.userData.avatar_sizes ?? defaultState.userData.avatar_sizes,
						document_type: persistCache.userData.document_type ?? defaultState.userData.document_type,
						document     : persistCache.userData.document ?? defaultState.userData.document,
						gender       : persistCache.userData.gender ?? defaultState.userData.gender,
						birth        : persistCache.userData.birth ?? defaultState.userData.birth,
						phone        : persistCache.userData.phone ?? defaultState.userData.phone,
						city         : persistCache.userData.city ?? defaultState.userData.city,
						balance      : persistCache.userData.balance ?? defaultState.userData.balance,
						is_completed : persistCache.userData.is_completed ?? defaultState.userData.is_completed,
						custom_data  : persistCache.userData.custom_data ?? defaultState.userData.custom_data,
						plan         : persistCache.userData.plan ?? defaultState.userData.plan,
					}
				}
			}

			return Object.assign({}, state, persistUpdate);

		case authConstants.LOGOUT:
			return Object.assign({}, state, defaultState);

		case authConstants.LOGIN:
			return Object.assign({}, state, {
				isAuthenticated: true,
				accessToken    : `Bearer ${action.data.accessToken}`,
				userData       : {
					...state.userData,
					uuid         : action.data.uuid,
					name         : action.data.name,
					email        : action.data.email,
					avatar       : action.data.avatar,
					avatar_sizes : action.data.avatar_sizes,
					document_type: action.data.document_type,
					document     : action.data.document,
					gender       : action.data.gender,
					birth        : action.data.birth,
					city         : action.data.city,
					phone        : action.data.phone,
					balance      : action.data.balance,
					is_completed : action.data.is_completed,
					custom_data  : action.data.custom_data,
					plan         : action.data.plan,
				}
			});

		case authConstants.REGISTER:
			return Object.assign({}, state, {
				isAuthenticated: true,
				accessToken    : `Bearer ${action.data.accessToken}`,
				userData       : {
					...state.userData,
					uuid         : action.data.uuid,
					name         : action.data.name,
					email        : action.data.email,
					avatar       : action.data.avatar,
					avatar_sizes : action.data.avatar_sizes,
					document_type: action.data.document_type,
					document     : action.data.document,
					gender       : action.data.gender,
					birth        : action.data.birth,
					phone        : action.data.phone,
					city         : action.data.city,
					balance      : action.data.balance,
					is_completed : action.data.is_completed,
					custom_data  : action.data.custom_data,
					plan         : action.data.plan,
				},
			});

		case authConstants.REGISTER_COMPLETED:
			return Object.assign({}, state, {
				userData: {
					...state.userData,
					name         : action.data.name,
					email        : action.data.email,
					avatar       : action.data.avatar,
					avatar_sizes : action.data.avatar_sizes,
					document_type: action.data.document_type,
					document     : action.data.document,
					gender       : action.data.gender,
					birth        : action.data.birth,
					city         : action.data.city,
					phone        : action.data.phone,
					balance      : action.data.balance,
					is_completed : action.data.is_completed,
					custom_data  : action.data.custom_data,
					plan         : action.data.plan,
				},
			});

		case authConstants.EDIT_USER_DATA:
			return Object.assign({}, state, {
				userData: {
					...state.userData,
					name         : action.data.name,
					email        : action.data.email,
					avatar       : action.data.avatar,
					avatar_sizes : action.data.avatar_sizes,
					document_type: action.data.document_type,
					document     : action.data.document,
					gender       : action.data.gender,
					birth        : action.data.birth,
					phone        : action.data.phone,
					city         : action.data.city,
					balance      : action.data.balance,
					is_completed : action.data.is_completed,
					custom_data  : action.data.custom_data,
					plan         : action.data.plan,
				},
			});

		case authConstants.USERDATA_REQUEST:
			return Object.assign({}, state, {
				isLoadingUserData: true,
			});

		case authConstants.USERDATA_SUCCESS:
			return Object.assign({}, state, {
				isLoadingUserData: false,
				userData         : {
					...state.userData,
					name         : action.data.name,
					email        : action.data.email,
					avatar       : action.data.avatar,
					avatar_sizes : action.data.avatar_sizes,
					document_type: action.data.document_type,
					document     : action.data.document,
					gender       : action.data.gender,
					birth        : action.data.birth,
					phone        : action.data.phone,
					city         : action.data.city,
					balance      : action.data.balance,
					is_completed : action.data.is_completed,
					custom_data  : action.data.custom_data,
					plan         : action.data.plan,
				}
			});

		case authConstants.USERDATA_ERROR:
			return Object.assign({}, state, {
				isLoadingUserData: false,
			});

		case authConstants.EDIT_USER_AVATAR:
			return Object.assign({}, state, {
				userData: {
					...state.userData,
					avatar: action.data.avatar,
				},
			});

		case authConstants.BALANCE_REQUEST:
			return Object.assign({}, state, {
				isLoadingBalance: true,
			});

		case authConstants.BALANCE_SUCCESS:
			return Object.assign({}, state, {
				isLoadingBalance: false,
				userData        : {
					...state.userData,
					balance: action.data.total,
				}
			});

		case authConstants.BALANCE_ERROR:
			return Object.assign({}, state, {
				isLoadingBalance: false,
			});

		default:
			return state;
	}
}
