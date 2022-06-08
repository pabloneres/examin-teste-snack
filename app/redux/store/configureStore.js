import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
//import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";

import {
	authRedurcer,
	cartRedurcer,
	generalRedurcer,
	listingItemCreatedRedurcer,
	listingItemUpdatedRedurcer,
	listingLastDateRedurcer,
	deliveryRedurcer
} from "./../reducers";

const persistConfig = {
	key      : "root",
	storage  : AsyncStorage,
	timeout  : null,
	blacklist: [
		"listingItemCreated",
		"listingItemUpdated",
		"listingLastDate",
	],
};

const rootReducer = combineReducers({
	auth              : authRedurcer,
	cart              : cartRedurcer,
	general           : generalRedurcer,
	listingItemCreated: listingItemCreatedRedurcer,
	listingItemUpdated: listingItemUpdatedRedurcer,
	listingLastDate   : listingLastDateRedurcer,
	delivery  		  : deliveryRedurcer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if( __DEV__ )
{
	//middleware.push(logger);
}

export const store     = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));
export const persistor = persistStore(store);
