import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./auth/slice";
import type { AuthState } from "./auth/types";
import filtersReducer from "./filters/slice";
import dictionaryReducer from "./dictionary/slice";
import userDictionaryReducer from "./userDictionary/slice";
import tasksReduser from "./tasks/slice";
import modalReduser from "./modal/slice";
import { errorMiddlware } from "../components/midlware/errorMiddlware";
import { authErrorMiddleware } from "../components/midlware/authErrorMiddleware";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistAuthReducer = persistReducer<AuthState>(
  persistConfig,
  authReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    filters: filtersReducer,
    dictionary: dictionaryReducer,
    userDictionary: userDictionaryReducer,
    tasks: tasksReduser,
    modal: modalReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(errorMiddlware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
