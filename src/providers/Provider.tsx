"use client";

import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Toaster />
        {children}
      </PersistGate>
    </Provider>
  );
};
