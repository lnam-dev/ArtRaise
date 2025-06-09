"use client"
import {Provider} from "react-redux";
import {setupStore} from "~/store/client/store";
const store = setupStore();


export const StoreProvider = ({ children} : { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
}

