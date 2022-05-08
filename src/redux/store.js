import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'reduxjs-toolkit-persist';
import sessionStorage from 'reduxjs-toolkit-persist/es/storage/session';
import thunk from 'redux-thunk';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import AuthReducer from './auth/AuthReducer';
import { emptySplitApi } from './services/BaseUrl';

const sessionStorageTransform = createTransform(
  // it is usefull to hide the value from session storage.
  (state) => {},
  (state) => {
    // console.log('state', state);
    // Object.assign({}, state, {
    //     session: { ...state.session, timestamp: Date.now() },
    //   }),
    // {}
  }
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage,
  stateReconciler: autoMergeLevel1,
  transforms: [sessionStorageTransform],
};

const reducers = combineReducers({
  auth: AuthReducer,
  api: emptySplitApi.reducer,
});
const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk, emptySplitApi.middleware),
  // preloadedState: ,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
