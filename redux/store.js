import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import updateCartReducer from './updateCart/updateCartSlice';
import updateFavoriteReducer from './updateFavorite/updateFavoriteSlice';


// ✅ Check if we are in the browser before importing `storage`
const isClient = typeof window !== 'undefined';
const storage = isClient ? require('redux-persist/lib/storage').default : null;

// Persist configuration
const persistConfig = {
  key: 'root',
  storage, // ✅ Use storage only on client-side
  whitelist: ['updateCart', 'updateFavorite'], // Specify reducers to persist
};

// Combine all reducers
const rootReducer = combineReducers({
  updateCart: updateCartReducer,
  updateFavorite: updateFavoriteReducer,
});

// Conditionally wrap reducer with persistReducer (only in browser)
const persistedReducer = isClient ? persistReducer(persistConfig, rootReducer) : rootReducer;

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check to prevent warnings
    }),
});

// Conditionally create persistor (only in browser)
export const persistor = isClient ? persistStore(store) : null;

export default store;
